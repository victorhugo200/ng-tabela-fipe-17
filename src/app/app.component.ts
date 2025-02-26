import { NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  finalize,
  of,
  switchMap,
  tap
} from 'rxjs';
import { FooterComponent } from './core/footer/footer.component';
import { Vehicle } from './model/vehicle.model';
import { MessageErrorComponent } from './shared/components/message-error/message-error.component';
import { TableComponent } from './shared/components/table/table.component';
import { FormatFipePipe } from './shared/pipes/format-fipe.pipe';
import { VehiclesService } from './shared/services/veiculo/vehicles.service';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [VehiclesService],
  imports: [
    TableComponent,
    ReactiveFormsModule,
    MessageErrorComponent,
    NgIf,
    FooterComponent,
    FormatFipePipe
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  fieldFipe = new FormControl('', [
    Validators.required,
    Validators.pattern(/^[0-9-]+$/),
    Validators.minLength(7),
  ]);
  vehicleService = inject(VehiclesService);
  vehicles: Vehicle[] = [];
  loading = false;
  hasError = false;

  ngOnInit(): void {
    this.searchVehicles();
  }

  searchVehicles() {
    this.fieldFipe.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(500),
        filter(
          (value) => this.fieldFipe.valid && typeof value === 'string'
        ),
        tap(() => {
          this.loading = true;
          this.hasError = false;
          this.fieldFipe.disable();
        }),
        switchMap((codigoFipe) =>
          this.vehicleService.getVehicles(codigoFipe?.trim() as string).pipe(
            catchError((error: HttpErrorResponse) => {
              console.error('Erro ao buscar veículos:', error);
              this.hasError = true;
              return of([]);
            }),
            finalize(() => {
              this.loading = false;
              this.fieldFipe.enable();
            })
          )
        )
      )
      .subscribe({
        next: (response) => {
          this.vehicles = response;
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error inesperado', error);
          this.hasError = true;
        },
      });
  }

}
