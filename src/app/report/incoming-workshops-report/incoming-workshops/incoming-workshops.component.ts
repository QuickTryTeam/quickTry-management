import { Component } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { LoadingService } from '../../../service/loading.service';
import { WorkshopDetail } from '../../../interface/workshop';
import { SortService } from '../../../utilities/sort.service';
import { WorkshopService } from '../../../service/workshop.service';

@Component({
  selector: 'app-incoming-workshops',
  templateUrl: './incoming-workshops.component.html',
  styleUrl: './incoming-workshops.component.css'
})
export class IncomingWorkshopsComponent {
  workshops!: WorkshopDetail[];
  sortedData!: WorkshopDetail[];

  constructor(
    private loadingService: LoadingService,
    private workshopService: WorkshopService,
    private sortService: SortService
  ) {}

  ngOnInit(): void {
    this.loadingService.show();
    this.workshopService.getIncomingWorkshops().subscribe((res) => {
      this.workshops = res.data
      this.sortedData = this.workshops.slice()
      this.loadingService.hide();
    })
  }

  sortData(sort: Sort) {
    const data = this.workshops.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'date':
          return this.sortService.compareDate(a.workshop_date, b.workshop_date, isAsc);
        default:
          return 0;
      }
    });
  }
}
