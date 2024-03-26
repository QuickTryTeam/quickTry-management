import { Component, OnInit } from '@angular/core';
import { ApproveStatus, Customer, SearchCustomer } from '../interface/customer';
import { CustomerService } from '../service/customer.service';
import { LoadingService } from '../service/loading.service';
import { DatetimeService } from '../utilities/datetime.service';
import { ListService } from '../service/list.service';
import { Sort } from '@angular/material/sort';
import { SortService } from '../utilities/sort.service';
import { PaginationTemplate } from '../interface/common';
import { PaginationService } from '../utilities/pagination.service';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrl: './customers-list.component.css'
})
export class CustomersListComponent implements OnInit {

  searchCustomer: SearchCustomer = {
    workshop: '',
    nickname: '',
    status: ''
  }
  customers!: Customer[];
  workshops!: string[];
  approveStatus: ApproveStatus = {
    registerId: '',
    approval: localStorage.getItem('nickname') || '',
    status: 'cancel'
  }

  sortedData!: Customer[];
  paginationData!: Customer[];
  paginationTemplate: PaginationTemplate = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0,
    startIndex: 0
  }

  constructor(
    private customerService: CustomerService,
    private loadingService: LoadingService,
    private datetimeService: DatetimeService,
    private listService: ListService,
    private sortService: SortService,
    public paginationService: PaginationService
  ) { }

  ngOnInit(): void {
    this.loadingService.show();
    this.listService.getWorkshopsForActive().subscribe((res) => {
      this.workshops = res.data.workshopList;
      this.loadingService.hide();
    });
  }

  onSubmitSearch() {
    this.loadingService.show();
    this.customerService.findAllCustomers(this.searchCustomer).subscribe((res) => {
      this.customers = res.data;
      this.paginationTemplate.totalItems = this.customers.length;
      this.customers.forEach(customer => {
        customer.timestamp = this.datetimeService.formatDateTime(customer.timestamp);
      });
      this.sortedData = this.customers.slice();
      this.updateSortedData();
      this.loadingService.hide();
    })
  }

  sortData(sort: Sort) {
    const data = this.customers.slice();
    if (!sort.active || sort.direction === '') {
      return;
    }
    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'timestamp':
          return this.sortService.compareTimestamp(a.timestamp, b.timestamp, isAsc);
        default:
          return 0;
      }
    });

    this.paginationTemplate.startIndex = 0;
    this.updateSortedData();
  }

  private updateSortedData() {
    const endIndex = this.paginationTemplate.startIndex + this.paginationTemplate.itemsPerPage;
    if (this.sortedData) {
      this.paginationData = this.sortedData.slice(this.paginationTemplate.startIndex, endIndex);
    } else {
      this.paginationData = this.customers.slice(this.paginationTemplate.startIndex, endIndex);
    }
  }

  pageChanged(page: number): void {
    this.paginationTemplate.currentPage = page
    this.paginationTemplate.startIndex = (this.paginationTemplate.currentPage - 1) * this.paginationTemplate.itemsPerPage;
    this.updateSortedData();
  }
}
