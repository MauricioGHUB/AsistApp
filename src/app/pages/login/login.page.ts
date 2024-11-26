import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { IUser } from 'src/interfaces/usuarios';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userdata: IUser[] = [];
  usuario: IUser = {
    id: "",
    nombre: "",
    email: "",
    rut: "",
    password: "",
    img: "",
    isactive: false
  };

  loginForm: FormGroup; 
  loginError: string | null = null;

  constructor(private alertcontroller: AlertController,
              private router: Router,
              private toast: ToastController,
              private authservice: AuthService,
              private fbuilder: FormBuilder) {
    this.loginForm = fbuilder.group({ 
      'email': new FormControl("", [Validators.required, Validators.email]),
      'password': new FormControl("", [Validators.required, Validators.minLength(8)])
    });
  }

  ngOnInit() {}

  login() {
    if (!this.loginForm.valid) {
      return;
    }
  
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.loginError = null;

    this.authservice.getUserByEmail(email).subscribe(
      resp => { 
        this.userdata = resp;

        if (this.userdata.length === 0) {
          this.loginForm.reset();
          this.UsuarioNoExiste();
          return;
        }
  
        const userFromApi = this.userdata[0];

        if (userFromApi) {
          this.usuario = {
            id: userFromApi.id,
            nombre: userFromApi.nombre,
            password: userFromApi.password,
            email: userFromApi.email,
            rut: userFromApi.rut,
            img: userFromApi.img,
            isactive: userFromApi.isactive
          };
  
          if (this.usuario.password !== password) {
            this.loginForm.reset();
            this.loginError = 'Credenciales incorrectas'; 
            return;
          }

          if (!this.usuario.isactive) {
            this.loginForm.reset();
            this.UsuarioInactivo();
            return;
          }

          this.IniciarSesion(this.usuario);
        }
      },
      error => {
        console.error('Error al obtener usuario:', error);
        this.loginError = 'Error en el servidor, por favor intente más tarde'; 
      }
    );
  }
  
  private IniciarSesion(usuario: IUser) {
    sessionStorage.setItem('id', usuario.id.toString());
    sessionStorage.setItem('nombre', usuario.nombre);
    sessionStorage.setItem('password', usuario.password);
    sessionStorage.setItem('ingresado', 'true');
    this.showToast('Sesión Iniciada ' + this.usuario.nombre);
    this.router.navigate(['/tabs/tab1']);
  }

  async showToast(msg: string) {
    const toast = await this.toast.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  async UsuarioInactivo() {
    const alerta = await this.alertcontroller.create({ 
      header: 'Usuario inactivo',
      message: 'Contactar a admin@admin.cl',
      buttons: ['OK']
    });
    alerta.present();
  }

  async UsuarioNoExiste() {
    const alerta = await this.alertcontroller.create({ 
      header: 'No existe...',
      message: 'Debe registrarse..',
      buttons: ['OK']
    });
    alerta.present();
  }

  navigateToRegister() {
    this.router.navigate(['/register']); 
  }
}
