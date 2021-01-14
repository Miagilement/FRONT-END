import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionProfilComponent } from './inscription-profil.component';

describe('InscriptionProfilComponent', () => {
  let component: InscriptionProfilComponent;
  let fixture: ComponentFixture<InscriptionProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InscriptionProfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InscriptionProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
