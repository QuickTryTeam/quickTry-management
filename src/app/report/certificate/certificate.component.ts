import { Component } from '@angular/core';
import { Customer, SearchCustomer } from '../../interface/customer';
import { LoadingService } from '../../service/loading.service';
import { ListService } from '../../service/list.service';
import { WorkshopsListSearch } from '../../interface/common';
import { CustomerService } from '../../service/customer.service';
import Swal from 'sweetalert2';
import { ZipService } from '../../utilities/zip.service';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrl: './certificate.component.css'
})
export class CertificateComponent {
  customers!: Customer[];
  workshops!: string[];
  searchCustomer: SearchCustomer = {
    status: 'approved'
  }

  workshopsListSearch: WorkshopsListSearch = {
    workshop_status: '',
    certificate_flag: true
  }

  fileName: string | null = null;
  fileUploaded: boolean = false;
  selectedImageFile: File = null as any;

  constructor(
    private loadingService: LoadingService,
    private listService: ListService,
    private customerService: CustomerService,
    private zipService: ZipService
  ) { }

  ngOnInit(): void {
    this.loadingService.show();
    this.listService.getWorkshopsForCertificate().subscribe((res) => {
      this.workshops = res.data.workshopList;
      this.loadingService.hide();
    });
  }

  onSubmitSearch() {
    if (this.searchCustomer.workshop === undefined) {
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: 'Select workshop first!'
      })
    } else {
      this.loadingService.show();
      this.customerService.findAllCustomers(this.searchCustomer).subscribe((res) => {
        this.customers = res.data;
        this.loadingService.hide();
      })
    }
  }

  uploadFile(event: any) {
    let input = event.target;
    let label = input.nextElementSibling as HTMLLabelElement;

    if (input.files && input.files.length > 0) {
      let file = input.files[0];
      
      if (!file.type.startsWith('image/')) {
        this.resetFileInput(input, label);
        Swal.fire({
          icon: 'error',
          title: 'Failed',
          text: 'File type wrong!'
        })
      }

      let targetWidth = 2000
      let targetHeight = 1414
      this.getImageDimensions(file).then(dimensions => {
        if (dimensions.width !== targetWidth || dimensions.height !== targetHeight) {
          this.resetFileInput(input, label);
          Swal.fire({
            icon: 'error',
            title: 'Failed',
            text: `Image dimensions must be exactly ${targetWidth}x${targetHeight}. Please choose a different image.`
          })
        } else {
          this.fileUploaded = true;
          this.fileName = file.name;
          this.selectedImageFile = file;
        }
      });

    } else {
      this.resetFileInput(input, label);
    }
  }

  exportCertificate() {
    this.loadingService.show();
    if (this.fileUploaded && this.selectedImageFile !== null) {
      let content: string[] = this.customers.map(customer => customer.name_surname);
      this.zipService.zipCertificateFile(content, this.selectedImageFile);
    }
  }

  private resetFileInput(input: any, label: HTMLLabelElement) {
    input.value = '';
    this.fileName = null;
    label.textContent = 'Choose file';
  }

  private getImageDimensions(file: File): Promise<{ width: number, height: number }> {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const img = new Image();
        img.onload = () => {
          resolve({ width: img.width, height: img.height });
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  }
}
