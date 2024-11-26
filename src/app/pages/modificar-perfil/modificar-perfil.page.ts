import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { IUser } from 'src/interfaces/usuarios'; // Asegúrate de tener esta interfaz creada

@Component({
  selector: 'app-modificar-perfil',
  templateUrl: './modificar-perfil.page.html',
  styleUrls: ['./modificar-perfil.page.scss'],
})
export class ModificarPerfilPage implements OnInit {
  usuario: IUser = {
    id: "",
    nombre: "",
    email: "",
    password: "",
    rut: "",
    isactive: false,
  };

  userForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.userForm = this.formBuilder.group({
      id: [0],
      nombre: [{ value: '', disabled: true }, Validators.required],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      rut: [{ value: '', disabled: true }, Validators.required],
      passwordActual: ['', Validators.required],
      nuevaPassword: ['', [Validators.required, Validators.minLength(8)]],
    });

    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['usuarios']) {
        this.usuario = JSON.parse(params['usuarios']);
        this.userForm.patchValue(this.usuario);
      }
    });
  }

  ngOnInit() {
    this.obtenerUsuario();
  }

  actualizarUsuario() {
    const passwordActual = this.userForm.value.passwordActual;
    const nuevaPassword = this.userForm.value.nuevaPassword;

    // Verificar si la contraseña actual coincide
    if (this.usuario.password !== passwordActual) {
      console.error('La contraseña actual es incorrecta.');
      return;
    }

    // Actualizar la contraseña
    this.usuario.password = nuevaPassword;

    this.auth.actualizarUsuario(this.usuario).subscribe(
      (response) => {
        console.log('Usuario actualizado:', response);
        this.regresar();
      },
      (error) => {
        console.error('Error al actualizar el usuario:', error);
      }
    );
  }

  obtenerUsuario() {
    this.auth.obtenerUsuarioActual().subscribe(
      (data: IUser) => {
        this.userForm.patchValue(data);
        this.usuario = data;
      },
      (error) => {
        console.error('Error al obtener los datos del usuario:', error);
      }
    );
  }

  regresar() {
    this.router.navigate(['/perfil']);
  }
}
