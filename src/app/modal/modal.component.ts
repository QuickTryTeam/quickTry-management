import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { UpdateWorkshop, UpdateWorkshopDetail, WorkshopManagement } from '../interface/workshop';
import { LoadingService } from '../service/loading.service';
import { WorkshopService } from '../service/workshop.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  workshop?: WorkshopManagement;
  updateWorkshop: UpdateWorkshop = {
    workshopId: '',
    workshopName: '',
    workshopType: '',
    workshopDetail: []
  }
  updateWorkshopDetail: UpdateWorkshopDetail = {
    workshopDetailId: '',
    workshopId: '',
    action: 'update',
    googleDriveUrl: '',
    remark: ''
  }
  
  constructor(
    public modalRef: MdbModalRef<ModalComponent>,
    private loadingService: LoadingService,
    private workshopService: WorkshopService
  ) {}

  ngOnInit(): void {
    const workshop = this.modalRef.component.workshop;
    if (workshop) {
      this.updateWorkshop.workshopId = workshop.workshop_id;
      if (workshop.workshop_name !== undefined) {
        this.updateWorkshop.workshopName = workshop.workshop_name;
      }
      if (workshop.workshop_type !== undefined) {
        this.updateWorkshop.workshopType = workshop.workshop_type;
      }

      this.updateWorkshopDetail.workshopDetailId = workshop.workshop_detail_id;
      this.updateWorkshopDetail.workshopId = workshop.workshop_id;
      this.updateWorkshopDetail.googleDriveUrl = workshop.google_drive_url;
      this.updateWorkshopDetail.remark = workshop.remark;
    }
}

  close(): void {
    const closeMessage = 'Modal closed';
    this.modalRef.close(closeMessage)
  }

  save(): void {
    this.updateWorkshop.workshopDetail.push(this.updateWorkshopDetail)
      this.loadingService.show();
      this.workshopService.updateWorkshop(this.updateWorkshop).subscribe((res) => {
        this.loadingService.hide();
        if (res && res.status === 200) {
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Save success'
            }).then((result) => {
              if (result.isConfirmed || result.isDismissed) {
                this.close()
              }
            });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Failed',
            text: 'Save failed'
          }).then((result) => {
            if (result.isConfirmed || result.isDismissed) {
              this.close();
            }
          });
        }
      })
  }
}
