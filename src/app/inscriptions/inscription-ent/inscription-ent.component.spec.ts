import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InscriptionEntComponent} from './inscription-ent.component';

describe('InscriptionEntComponent', () => {
  let component: InscriptionEntComponent;
  let fixture: ComponentFixture<InscriptionEntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InscriptionEntComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InscriptionEntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
