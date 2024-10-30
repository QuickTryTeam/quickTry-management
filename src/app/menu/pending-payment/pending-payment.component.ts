import { Component } from '@angular/core';
import { ApproveStatus, Customer, SearchCustomer } from '../../interface/customer';
import { CustomerService } from '../../service/customer.service';
import { DatetimeService } from '../../utilities/datetime.service';
import { LoadingService } from '../../service/loading.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pending-payment',
  templateUrl: './pending-payment.component.html',
  styleUrl: './pending-payment.component.css'
})
export class PendingPaymentComponent {
  
  customers: Customer[] = [];
  selectedRow: any;
  approveStatus: ApproveStatus = {
    registerId: '',
    approval: localStorage.getItem('nickname') || '',
    status: 'approved',
    type: ''
  }

  constructor(
    private customerService: CustomerService,
    private loadingService: LoadingService,
    private datetimeService: DatetimeService

  ) { }

  ngOnInit(): void {
    this.loadingService.show();
    this.customerService.findPendingCustomers().subscribe((res) => {
      if (res.status === 200) {
        if (Array.isArray(res.data) && res.data.length > 0) {
          this.customers = res.data;
          this.customers.forEach(customer => {
            customer.timestamp = this.datetimeService.formatDateTime(customer.timestamp);
          });
        } else {
          this.customers = [];
        }
      } else {
        console.error('Failed to fetch customers. Status:', res.status);
      }

      this.loadingService.hide();
    })
  }

  selectRow(row: any): void {
    this.selectedRow = row;
    this.approveStatus.registerId = this.selectedRow.register_id;
  }

  onSubmitApprove() {
    if (this.approveStatus.approval === "") {
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: 'Please select approval first'
      });
    } else if (!this.selectedRow) {
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: 'Please select row first'
      });
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Confirm?',
        confirmButtonText: "confirm",
        showDenyButton: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.onConfirmApprove()
        }
      });
    }
  }

  onConfirmApprove() {
    this.loadingService.show();
    this.approveStatus.type = this.selectedRow.type
    this.customerService.updateStatus(this.approveStatus).subscribe((res) => {
      this.loadingService.hide();
      if (res && res.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Approve success'
        }).then((result) => {
          if (result.isConfirmed || result.isDismissed) {
            this.ngOnInit();
          }
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed',
          text: 'Approve failed'
        }).then((result) => {
          if (result.isConfirmed || result.isDismissed) {
            this.ngOnInit();
          }
        });
      }
    });
  }
}
