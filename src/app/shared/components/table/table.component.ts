import { Component, inject, input } from '@angular/core';
import { Vehicle } from '../../../model/vehicle.model';
import { ActualYearService } from '../../services/actual-year/actual-year.service';

@Component({
  selector: 'fipe-table',
  standalone: true,
  templateUrl: './table.component.html',
})
export class TableComponent {
  vehicles = input<Vehicle[]>([]);
  actualYearService = inject(ActualYearService);
  actualYear = this.actualYearService.getYear();
}
