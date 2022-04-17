import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctoreditdialogComponent } from './doctoreditdialog.component';

describe('DoctoreditdialogComponent', () => {
  let component: DoctoreditdialogComponent;
  let fixture: ComponentFixture<DoctoreditdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctoreditdialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctoreditdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
