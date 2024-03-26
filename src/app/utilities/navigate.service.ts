import { Injectable } from '@angular/core';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class NavigateService {

  constructor(
    private location: Location
  ) {}

  navBack() {
    this.location.back();
  }

}
