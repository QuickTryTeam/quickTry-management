import { Component } from '@angular/core';
import { SearchWorkshopManagement, WorkshopManagement } from '../../interface/workshop';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalComponent } from '../../modal/modal.component';
import { LoadingService } from '../../service/loading.service';
import { WorkshopService } from '../../service/workshop.service';

@Component({
  selector: 'app-workshop-management',
  templateUrl: './workshop-management.component.html',
  styleUrl: './workshop-management.component.css'
})
export class WorkshopManagementComponent {

  modalRef: MdbModalRef<ModalComponent> | null = null;

  constructor(
    private modalService: MdbModalService,
    private loadingService: LoadingService,
    private workshopService: WorkshopService
  ) {}
  
  searchWorkshop: SearchWorkshopManagement = {
    workshopName: '',
    status: 'Active and upcoming'
  }

  workshopDetails?: WorkshopManagement[]

  onSubmitSearch() {
    this.loadingService.show();
    this.workshopService.findWorkshopManagement(this.searchWorkshop).subscribe((res) => {
      this.workshopDetails = res.data
      this.loadingService.hide();
    })
  }

  openModal(workshop: WorkshopManagement): void {
    this.modalRef = this.modalService.open(ModalComponent, {
      data: {
        workshop
      }
    });
  }
}
