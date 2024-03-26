import { Component } from '@angular/core';
import { Lecturer, SearchLecturer } from '../../../interface/lecturer';
import { Sort } from '@angular/material/sort';
import { SortService } from '../../../utilities/sort.service';
import { LoadingService } from '../../../service/loading.service';
import { AutocompleteService } from '../../../service/autocomplete.service';
import { Observable, Observer, Subject, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { LecturerService } from '../../../service/lecturer.service';
import { DatetimeService } from '../../../utilities/datetime.service';
import { PaginationTemplate } from '../../../interface/common';
import { PaginationService } from '../../../utilities/pagination.service';

@Component({
  selector: 'app-lecturers-list',
  templateUrl: './lecturers-list.component.html',
  styleUrl: './lecturers-list.component.css'
})
export class LecturersListComponent {

  searchLecturer: SearchLecturer = {
    career: '',
    nickname: ''
  }

  lecturers!: Lecturer[];
  sortedData!: Lecturer[];
  paginationData!: Lecturer[];
  suggestion$?: Observable<string[]>;

  paginationTemplate: PaginationTemplate = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0,
    startIndex: 0
  }

  constructor(
    private loadingService: LoadingService,
    private sortService: SortService,
    private autocompleteService: AutocompleteService,
    private lecturerService: LecturerService,
    private datetimeService: DatetimeService,
    public paginationService: PaginationService
  ) {}

  ngOnInit(): void {
    this.suggestion$ = new Observable((observable: Observer<string | undefined>) => {
      observable.next(this.searchLecturer.career)
    }).pipe(
      debounceTime(300),
      switchMap((query: string) => {
        if (query) {
          return this.autocompleteService.getCareersAutocompleteSuggestions(query)
            .pipe(
              switchMap(response => of(response.data.suggestions))
            );
        }
        return of([]);
      })
    )
  }

  onSubmitSearch() {
    this.loadingService.show();
    this.lecturerService.findAllLecturers(this.searchLecturer).subscribe((res) => {
      this.lecturers = res.data
      this.paginationTemplate.totalItems = this.lecturers.length;
      this.lecturers.forEach(lecturer => {
        lecturer.timestamp = this.datetimeService.formatDateTime(lecturer.timestamp);
      });
      this.sortedData = this.lecturers.slice();
      this.updateSortedData();
      this.loadingService.hide();
    })
  }

  sortData(sort: Sort) {
    const data = this.lecturers.slice();
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

  typeAheadOnSelect(event: any) {
    this.searchLecturer.career = event.item;
  }

  private updateSortedData() {
    const endIndex = this.paginationTemplate.startIndex + this.paginationTemplate.itemsPerPage;
    if (this.sortedData) {
      this.paginationData = this.sortedData.slice(this.paginationTemplate.startIndex, endIndex);
    } else {
      this.paginationData = this.lecturers.slice(this.paginationTemplate.startIndex, endIndex);
    }
  }

  pageChanged(page: number): void {
    this.paginationTemplate.currentPage = page
    this.paginationTemplate.startIndex = (this.paginationTemplate.currentPage - 1) * this.paginationTemplate.itemsPerPage;
    this.updateSortedData();
  }
}
