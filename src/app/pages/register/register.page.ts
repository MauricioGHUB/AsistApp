import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ICrearUser } from 'src/interfaces/usuarios';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registroForm: FormGroup;

  nuevoUsuario: ICrearUser = {
    nombre: "",
    email: "",
    rut: "",
    password: "",
    isactive: true
  };

  constructor(
    private authservice: AuthService,
    private alertcontroller: AlertController,
    private router: Router,
    private fBuilder: FormBuilder
  ) {
    this.registroForm = this.fBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      rut: ['', [Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[^\w\s]).{8,}$/),
        ],
      ],
    });
  }

  ngOnInit() {}

  crearUsuario() {
    if (this.registroForm.valid) {
      const { nombre, email, rut, password } = this.registroForm.value;

      this.authservice.getUserByUsername(nombre).subscribe(
        (resp) => {
          if (Array.isArray(resp) && resp.length > 0) {
            this.mostrarErrorDuplicidad(nombre);
            this.registroForm.reset();
          } else {
            this.nuevoUsuario = { nombre, email, rut, password, isactive: true };

            this.authservice.registrarUsuario(this.nuevoUsuario).subscribe(
              () => {
                this.mostrarMensaje(`Bienvenid@ ${this.nuevoUsuario.nombre}`);
                this.router.navigateByUrl('/login');
              },
              (error) => {
                console.error('Error al crear el usuario:', error);
                this.mostrarError('No se pudo crear el usuario. Intente nuevamente.');
              }
            );
          }
        },
        (error) => {
          console.error('Error al verificar el nombre de usuario:', error);
          this.mostrarError('Ocurrió un error al verificar el nombre de usuario.');
        }
      );
    } else {
      this.mostrarError('Por favor, complete todos los campos correctamente.');
    }
  }

  async mostrarMensaje(mensaje: string) {
    const alerta = await this.alertcontroller.create({
      header: 'Usuario Creado',
      message: mensaje,
      buttons: ['OK'],
    });
    await alerta.present();
  }

  async mostrarErrorDuplicidad(nombre: string) {
    const alerta = await this.alertcontroller.create({
      header: 'Error',
      message: `El usuario "${nombre}" ya está registrado.`,
      buttons: ['OK'],
    });
    await alerta.present();
  }

  async mostrarError(mensaje: string) {
    const alerta = await this.alertcontroller.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK'],
    });
    await alerta.present();
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
