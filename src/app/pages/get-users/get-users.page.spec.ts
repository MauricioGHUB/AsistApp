import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GetUsersPage } from './get-users.page';

describe('GetUsersPage', () => {
  let component: GetUsersPage;
  let fixture: ComponentFixture<GetUsersPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GetUsersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
