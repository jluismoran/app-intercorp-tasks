import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareaEdicionComponent } from './tarea-edicion.component';

describe('TareaEdicionComponent', () => {
  let component: TareaEdicionComponent;
  let fixture: ComponentFixture<TareaEdicionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TareaEdicionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TareaEdicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
