import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AllCompanySheetComponent} from './all-company-sheet.component';

describe('AllCompanySheetComponent', () => {
  let component: AllCompanySheetComponent;
  let fixture: ComponentFixture<AllCompanySheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllCompanySheetComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCompanySheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
