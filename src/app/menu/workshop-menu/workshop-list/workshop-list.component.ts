import { Component } from '@angular/core';
import { SearchWorkshop, Workshop } from '../../../interface/workshop';
import { LoadingService } from '../../../service/loading.service';
import { WorkshopService } from '../../../service/workshop.service';
import { PaginationTemplate } from '../../../interface/common';
import { SortService } from '../../../utilities/sort.service';
import { Sort } from '@angular/material/sort';
import { DatetimeService } from '../../../utilities/datetime.service';
import { PaginationService } from '../../../utilities/pagination.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-workshop-list',
  templateUrl: './workshop-list.component.html',
  styleUrl: './workshop-list.component.css'
})
export class WorkshopListComponent {
  searchWorkshop: SearchWorkshop = {
    workshop: ''
  }
  workshops!: Workshop[];
  sortedData!: Workshop[];
  paginationData!: Workshop[];
  paginationTemplate: PaginationTemplate = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0,
    startIndex: 0
  }
  role!: string | null;

  constructor(
    private loadingService: LoadingService,
    private workshopService: WorkshopService,
    private sortService: SortService,
    private datetimeService: DatetimeService,
    public paginationService: PaginationService
  ) {}

  ngOnInit(): void {
    this.role = localStorage.getItem('role');
  }

  onSubmitSearch() {
    this.loadingService.show();
    this.workshopService.findWorkshops(this.searchWorkshop).subscribe((res) => {
      this.workshops = res.data;
      this.paginationTemplate.totalItems = this.workshops.length;
      this.workshops.forEach(workshop => {
        workshop.latest_workshop_date_format = this.datetimeService.formatDateInfo(workshop.latest_workshop_date);
      });
      this.sortedData = this.workshops.slice();
      this.updateSortedData();
      this.loadingService.hide();
    })
  }

  sortData(sort: Sort) {
    const data = this.workshops.slice();
    if (!sort.active || sort.direction === '') {
      return;
    }
    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'latestWorkshopDate':
          return this.sortService.compareTimestamp(a.latest_workshop_date, b.latest_workshop_date, isAsc);
        default:
          return 0;
      }
    });

    this.paginationTemplate.startIndex = 0;
    this.paginationTemplate.currentPage = 1;
    this.updateSortedData();
  }

  private updateSortedData() {
    const endIndex = this.paginationTemplate.startIndex + this.paginationTemplate.itemsPerPage;
    if (this.sortedData) {
      this.paginationData = this.sortedData.slice(this.paginationTemplate.startIndex, endIndex);
    } else {
      this.paginationData = this.workshops.slice(this.paginationTemplate.startIndex, endIndex);
    }
  }

  pageChanged(page: number): void {
    this.paginationTemplate.currentPage = page
    this.paginationTemplate.startIndex = (this.paginationTemplate.currentPage - 1) * this.paginationTemplate.itemsPerPage;
    this.updateSortedData();
  }

  onClickDeleteWorkshop(workshopId: string) {
    Swal.fire({
      icon: 'warning',
      title: 'Confirm delete',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      confirmButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteWorkshop(workshopId)
      }
    });
  }

  deleteWorkshop(workshopId: string) {
    this.loadingService.show();
    this.workshopService.deleteWorkshop(workshopId).subscribe((res) => {
      if (res && res.status === 200) {
        this.loadingService.hide();
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Delete success'
        }).then((result) => {
          if (result.isConfirmed || result.isDismissed) {
            this.onSubmitSearch();
          }
        });
      }
    })
  }
}
