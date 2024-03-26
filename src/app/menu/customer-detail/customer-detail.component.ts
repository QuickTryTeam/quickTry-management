import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApproveStatus, Customer, UpdateCustomer } from '../../interface/customer';
import { NavigateService } from '../../utilities/navigate.service';
import Swal from 'sweetalert2';
import { LoadingService } from '../../service/loading.service';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrl: './customer-detail.component.css'
})
export class CustomerDetailComponent {
  
  updateCustomer: UpdateCustomer = {
    registerId: ''
  }
  updateCustomers: UpdateCustomer[] = []
  customers!: Customer;
  approveStatus: ApproveStatus = {
    registerId: '',
    approval: localStorage.getItem('nickname') || '',
    status: 'cancel'
  }

  constructor(
    private route: ActivatedRoute,
    public navigateService: NavigateService,
    private loadingService: LoadingService,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.loadingService.show();
    this.route.params.subscribe(params => {
      this.customerService.findCustomer(params['id']).subscribe((res) => {
        this.customers = res.data;
        this.loadingService.hide();
      })
    });
  }

  onSubmitSave() {
    Swal.fire({
      icon: 'info',
      title: 'Confirm?',
      confirmButtonText: "confirm",
      showDenyButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.updateCustomer.registerId = this.customers.register_id
        this.updateCustomer.remark = this.customers.remark
        this.updateCustomers.push(this.updateCustomer)

        this.onConfirmSave()
      }
    });
  }

  onConfirmSave() {
    this.loadingService.show();
    this.customerService.updateCustomer(this.updateCustomers).subscribe((res) => {
      this.loadingService.hide();
      if (res && res.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Save success'
        }).then((result) => {
          if (result.isConfirmed || result.isDismissed) {
            this.ngOnInit();
          }
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed',
          text: 'Save failed'
        }).then((result) => {
          if (result.isConfirmed || result.isDismissed) {
            this.ngOnInit();
          }
        });
      }
    });
  }

  onSubmitCancel() {
    Swal.fire({
      icon: 'info',
      title: 'Confirm?',
      confirmButtonText: "confirm",
      showDenyButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.approveStatus.registerId = this.customers.register_id
        this.onConfirmCancel()
      }
    });
  }

  onConfirmCancel() {
    this.loadingService.show();
    this.customerService.updateStatus(this.approveStatus).subscribe((res) => {
      this.loadingService.hide();
      if (res && res.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Cancel success'
        }).then((result) => {
          if (result.isConfirmed || result.isDismissed) {
            this.ngOnInit();
          }
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed',
          text: 'Cancel failed'
        }).then((result) => {
          if (result.isConfirmed || result.isDismissed) {
            this.ngOnInit();
          }
        });
      }
    });
  }

  onInputChange<T extends keyof UpdateCustomer>(fieldName: T, value: UpdateCustomer[T]) {
    this.updateCustomer[fieldName] = value;
  }
}