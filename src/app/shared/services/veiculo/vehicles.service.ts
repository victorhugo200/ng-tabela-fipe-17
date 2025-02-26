import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vehicle } from '../../../model/vehicle.model';

@Injectable({
  providedIn: `root`,
})
export class VehiclesService {
  constructor(private http: HttpClient) {}

  getVehicles(codigoFipe: string) {
    return this.http.get<Vehicle[]>(
      `https://brasilapi.com.br/api/fipe/preco/v1/${codigoFipe}`
    );
  }
}
