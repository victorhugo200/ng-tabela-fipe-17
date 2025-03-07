import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VEHICLES_MOCKS } from '../../tests/mocks/vehicle-mocks';
import { TableComponent } from './table.component';

describe('TableComponent', () => {
  let fixure: ComponentFixture<TableComponent>;
  let component: TableComponent;
  let componentRef: ComponentRef<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixure = TestBed.createComponent(TableComponent);
    component = fixure.componentInstance;
    componentRef = fixure.componentRef;
  });

  it('should set vehicles', () => {
    componentRef.setInput('vehicles', VEHICLES_MOCKS);
    expect(component.vehicles()[0].codigoFipe).toBe(VEHICLES_MOCKS[0].codigoFipe);
  });

  it('should get actual year', () => {
    expect(component.actualYear).toBe(new Date().getFullYear());
  })
});
