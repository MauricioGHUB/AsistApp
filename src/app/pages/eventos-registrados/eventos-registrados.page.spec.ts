import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventosRegistradosPage } from './eventos-registrados.page';

describe('EventosRegistradosPage', () => {
  let component: EventosRegistradosPage;
  let fixture: ComponentFixture<EventosRegistradosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosRegistradosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
