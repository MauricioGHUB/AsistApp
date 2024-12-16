import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { IUser } from 'src/interfaces/usuarios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  userForm: FormGroup;
  usuario: IUser | undefined;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.userForm = this.formBuilder.group({
      id: [{ value: '', disabled: true }],
      nombre: [{ value: '', disabled: true }, Validators.required],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      rut: [{ value: '', disabled: true }, Validators.required],
      isactive: [{ value: false, disabled: true }]
    });
  }

  ngOnInit() {
    this.obtenerUsuario();
  }

  obtenerUsuario() {
    this.authService.obtenerUsuarioActual().subscribe(
      (data: IUser) => {
        this.userForm.patchValue(data);
        this.usuario = data;
      },
      (error) => {
        console.error('Error al obtener los datos del usuario:', error);
      }
    );
  }

  redirigirUpdate() {
    this.router.navigate(['/modificar-perfil']);
  }
}
