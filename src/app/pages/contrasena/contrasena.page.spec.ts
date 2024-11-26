import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContrasenaPage } from './contrasena.page';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Administrador } from 'src/interfaces/administradores';
import { AuthService } from 'src/app/services/auth.service';
describe('ContrasenaPage', () => {
  let component: ContrasenaPage;
  let fixture: ComponentFixture<ContrasenaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ContrasenaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
