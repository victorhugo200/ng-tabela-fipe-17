import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { catchError, debounceTime, distinctUntilChanged, filter, finalize, map, of, switchMap, tap } from 'rxjs';
import { FooterComponent } from './core/footer/footer.component';
import { HeaderComponent } from './core/header/header.component';
import { Vehicle } from './model/vehicle.model';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { MessageErrorComponent } from './shared/components/message-error/message-error.component';
import { TableComponent } from './shared/components/table/table.component';
import { VehiclesService } from './shared/services/veiculo/vehicles.service';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [VehiclesService, provideNgxMask()],
  imports: [
    TableComponent,
    ReactiveFormsModule,
    FormsModule,
    MessageErrorComponent,
    NgIf,
    FooterComponent,
    NgxMaskDirective,
    HeaderComponent,
    LoaderComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  fieldFipe = new FormControl('', [
    Validators.required,
    Validators.pattern(/^[0-9-]+$/),
    Validators.minLength(7),
    Validators.maxLength(8),

  ]);
  vehicleService = inject(VehiclesService);
  vehicles: Vehicle[] = [];
  loading = false;
  hasError = false;
  field = '';

  ngOnInit(): void {
    this.searchVehicles();
  }

  private searchVehicles() {
    this.fieldFipe.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(500),
        filter((value) => this.fieldFipe.valid && typeof value === 'string'),
        map((res) => res as string),
        tap(() => {
          this.loading = true;
          this.hasError = false;
          this.fieldFipe.disable();
        }),
        switchMap((codigoFipe) => {
          return this.vehicleService.getVehicles(codigoFipe.trim()).pipe(
            catchError(() => {
              this.hasError = true;
              return of([]);
            }),
            finalize(() => {
              this.loading = false;
              this.fieldFipe.enable();
            })
          );
        })
      )
      .subscribe({
        next: (response) => {
          this.vehicles = response;
        }
      });
  }

}
