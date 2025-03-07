import { HttpErrorResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { VEHICLES_MOCKS } from '../../tests/mocks/vehicle-mocks';
import { VehiclesService } from './vehicles.service';

describe('VehiclesService', () => {
  let service: VehiclesService;
  let httpTestingController: HttpTestingController;
  const { API_URL } = environment;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VehiclesService]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(VehiclesService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  it('should load vehicles with success', () => {
    const codeFipe = '1234567';
    service.getVehicles(codeFipe)
    .subscribe({
      next: (response) => {
        expect(response[0].codigoFipe).toBe(VEHICLES_MOCKS[0].codigoFipe);
      }
    });

    const testRequest: TestRequest = httpTestingController.expectOne(API_URL + codeFipe);
    testRequest.flush(of(VEHICLES_MOCKS));
  });

  it('should not load vehicles with success', () => {
    const codeFipe = '1234567';
    service.getVehicles(codeFipe)
    .subscribe({
      next: (response) => {
        expect(response).toBe(undefined);
      },
      error: (error: HttpErrorResponse) => {
        expect(error.status).toBe(422);
      }
    });

    const testRequest: TestRequest = httpTestingController.expectOne(API_URL + codeFipe);
    testRequest.flush(throwError(() => new HttpErrorResponse({status: 422})));
  });
});
