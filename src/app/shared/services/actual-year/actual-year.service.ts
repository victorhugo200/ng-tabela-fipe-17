import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActualYearService {

constructor() { }

  getYear() {
    return new Date().getFullYear();
  }

}
