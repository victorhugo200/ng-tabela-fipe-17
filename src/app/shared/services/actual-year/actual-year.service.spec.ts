/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { ActualYearService } from './actual-year.service';

describe('Service: ActualYear', () => {
  let service: ActualYearService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActualYearService]
    });
  });

  beforeEach(() => {
    service = TestBed.inject(ActualYearService);
  });

  it('should create instance of service', () => {
    expect(service).toBeTruthy();
  });

  it('should get actual year', () => {
    expect(service.getYear()).toBe(new Date().getFullYear());
  });
});
