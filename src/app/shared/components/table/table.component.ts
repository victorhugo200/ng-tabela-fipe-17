import { NgFor } from '@angular/common';
import { Component, input } from '@angular/core';
import { Vehicle } from '../../../model/vehicle.model';

@Component({
  selector: 'fipe-table',
  standalone: true,
  imports: [NgFor],
  templateUrl: './table.component.html',
})
export class TableComponent {
  vehicles = input<Vehicle[]>([]);
  actualYear = new Date().getFullYear();
}
