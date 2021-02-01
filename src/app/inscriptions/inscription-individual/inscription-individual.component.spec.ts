import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionIndividualComponent } from './inscription-individual.component';

describe('InscriptionUserNormalComponent', () => {
  let component: InscriptionIndividualComponent;
  let fixture: ComponentFixture<InscriptionIndividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InscriptionIndividualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InscriptionIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
