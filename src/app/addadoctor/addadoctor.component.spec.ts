import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddadoctorComponent } from './addadoctor.component';

describe('AddadoctorComponent', () => {
  let component: AddadoctorComponent;
  let fixture: ComponentFixture<AddadoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddadoctorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddadoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
