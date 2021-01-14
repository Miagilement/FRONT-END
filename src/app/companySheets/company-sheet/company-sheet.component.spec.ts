import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanySheetComponent } from './company-sheet.component';

describe('CompanySheetComponent', () => {
  let component: CompanySheetComponent;
  let fixture: ComponentFixture<CompanySheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanySheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanySheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
