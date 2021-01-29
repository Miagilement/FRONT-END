import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionUserNormalComponent } from './inscription-user-normal.component';

describe('InscriptionUserNormalComponent', () => {
  let component: InscriptionUserNormalComponent;
  let fixture: ComponentFixture<InscriptionUserNormalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InscriptionUserNormalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InscriptionUserNormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
