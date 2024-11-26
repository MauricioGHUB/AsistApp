import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QrModalPage } from './qr-modal.page';

describe('QrModalPage', () => {
  let component: QrModalPage;
  let fixture: ComponentFixture<QrModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(QrModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
