import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Vehicle } from '../../../model/vehicle.model';

@Injectable({
  providedIn: `root`,
})
export class VehiclesService {
  constructor(private http: HttpClient) {}

  getVehicles(codigoFipe: string) {
    return this.http.get<Vehicle[]>(
      `${environment.API_URL}${codigoFipe}`
    );
  }
}
