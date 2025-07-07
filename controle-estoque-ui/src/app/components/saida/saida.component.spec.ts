import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaidaComponent } from './saida.component';

describe('SaidaComponent', () => {
  let component: SaidaComponent;
  let fixture: ComponentFixture<SaidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaidaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
