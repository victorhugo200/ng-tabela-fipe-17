import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { of, throwError } from 'rxjs';
import { AppComponent } from './app.component';
import { VehiclesService } from './shared/services/veiculo/vehicles.service';
import { VEHICLES_MOCKS } from './shared/tests/mocks/vehicle-mocks';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  const mockVehiclesService = {
    getVehicles: jest.fn().mockReturnValue(of(VEHICLES_MOCKS))
  };

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [AppComponent,ReactiveFormsModule, NgxMaskDirective ],
    }).overrideComponent(AppComponent, {
      set: {
        providers: [
          { provide: VehiclesService, useValue: mockVehiclesService },
          provideNgxMask()
        ]
      }
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    jest.clearAllMocks();
  });

  it('should create the component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should initialize with an empty vehicle list', () => {
    component.ngOnInit();
    expect(component.vehicles).toEqual([]);
  });

  it('should call VehiclesService on valid fieldFipe value change', fakeAsync(() => {
    component.ngOnInit();
    component.fieldFipe.setValue('1234567');
    tick(500);

    expect(mockVehiclesService.getVehicles).toHaveBeenCalledWith('1234567');
    expect(component.vehicles.length).toBe(VEHICLES_MOCKS.length);
  }));

  it('should handle error when VehiclesService fails', fakeAsync(() => {
    mockVehiclesService.getVehicles.mockReturnValue(throwError(() => new HttpErrorResponse({ error: 'Error', status: 500 })));

    component.ngOnInit();
    component.fieldFipe.setValue('1234567');
    tick(500);

    expect(component.hasError).toBe(true);
  }));

});
