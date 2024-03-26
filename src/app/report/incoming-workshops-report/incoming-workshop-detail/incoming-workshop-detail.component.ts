import { Component } from '@angular/core';
import { Customer, SearchCustomer, UpdateCustomer } from '../../../interface/customer';
import { ActivatedRoute } from '@angular/router';
import { Sort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { SortService } from '../../../utilities/sort.service';
import { NavigateService } from '../../../utilities/navigate.service';
import { CustomerService } from '../../../service/customer.service';
import { LoadingService } from '../../../service/loading.service';

@Component({
  selector: 'app-incoming-workshop-detail',
  templateUrl: './incoming-workshop-detail.component.html',
  styleUrl: './incoming-workshop-detail.component.css'
})
export class IncomingWorkshopDetailComponent {
  searchCustomer: SearchCustomer = {
    status: 'approved',
    workshopDetailId: ''
  }
  customers!: Customer[];
  customersOriginal!: Customer[];
  updateCustomer: UpdateCustomer = {
    registerId: ''
  }
  updateCustomers: UpdateCustomer[] = [];
  resultStatus: number[] = [];
  sortedData!: Customer[];
  role!: string | null;

  constructor(
    private route: ActivatedRoute,
    private loadingService: LoadingService,
    private customerService: CustomerService,
    public navigateService: NavigateService,
    private sortService: SortService
  ) { }
  
  ngOnInit(): void {
    this.loadingService.show();
    this.role = localStorage.getItem('role');
    this.route.params.subscribe(params => {
      this.searchCustomer.workshopDetailId = params['workshopDetailId']
      this.customerService.findAllCustomers(this.searchCustomer).subscribe((res) => {
        this.customers = res.data;
        this.sortedData = this.customers.slice();
        this.loadingService.hide();
      })
    });
  }

  async onSubmitSave() {
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

  sortData(sort: Sort) {
    const data = this.customers.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return this.sortService.compareString(a.name_surname, b.name_surname, isAsc);
        case 'nickname':
          return this.sortService.compareString(a.nickname, b.nickname, isAsc);
        default:
          return 0;
      }
    });
  }

  onInputChange<T extends keyof UpdateCustomer>(fieldName: T, value: UpdateCustomer[T], registerId: string) {
    let existingCustomerIndex = this.updateCustomers.findIndex(customer => customer.registerId === registerId);

    if (existingCustomerIndex !== -1) {
      let existingCustomer = this.updateCustomers[existingCustomerIndex];
        existingCustomer[fieldName] = value;
    } else {
      let newCustomer: UpdateCustomer = {
            registerId: registerId,
            [fieldName]: value
        };
        this.updateCustomers.push(newCustomer);
    }
  }
}
