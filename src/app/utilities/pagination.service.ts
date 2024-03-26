import { Injectable } from '@angular/core';
import { PaginationTemplate } from '../interface/common';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  
  constructor() { }

  getPages(totalItems: number, itemsPerPage: number, currentPage: number): number[] {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const visiblePages = 3;
    const pages: number[] = [];
  
    if (totalPages <= visiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const start = Math.max(1, currentPage - Math.floor(visiblePages / 2));
      const end = Math.min(totalPages, start + visiblePages - 1);
  
      if (start > 1) {
        pages.push(1);
        if (start > 2) {
          pages.push(-1);
        }
      }
  
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
  
      if (end < totalPages) {
        pages.push(-1);
        pages.push(totalPages);
      }
    }
  
    return pages;
  }
}
