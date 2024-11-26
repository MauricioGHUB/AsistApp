import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICrearUser,IUser } from 'src/interfaces/usuarios';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-contrasena',
  templateUrl: './contrasena.page.html',
  styleUrls: ['./contrasena.page.scss'],
})
export class ContrasenaPage implements OnInit {

  usuario: IUser = {
    id: "",
    nombre: "",
    email: "",
    password: "",
    rut: "",
    img: "",
    isactive: false 
  };
  adminForm: FormGroup;
  selectedFile: File | null = null;  // Para almacenar el archivo seleccionado

  constructor(
    private activated: ActivatedRoute, 
    private router: Router, 
    private auth: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.adminForm = this.formBuilder.group({
      id: [0],
      nombre: [{ value: '', disabled: true }, Validators.required],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      rut: [{ value: '', disabled: true }, Validators.required],
      passwordActual: ['', Validators.required],
      nuevaPassword: ['', [Validators.required, Validators.minLength(8)]]
    });

    this.activated.queryParams.subscribe(param => {
      if (param['usuarios']) {
        this.usuario = JSON.parse(param['usuarios']);
        this.adminForm.patchValue(this.usuario);
      }
    });
  }

  ngOnInit() {
    this.obtenerAdmin();
  }

  actualizarUsuario() {
    if (this.adminForm.invalid) {
      console.error('El formulario no es válido');
      return;
    }
  
    const passwordActual = this.adminForm.value.passwordActual;
    const nuevaPassword = this.adminForm.value.nuevaPassword;
  
    if (this.usuario.password !== passwordActual) {
      console.error('La contraseña actual es incorrecta.');
      return;
    }
  
    this.usuario.password = nuevaPassword;
  
    this.auth.actualizarUsuario(this.usuario).subscribe(response => {
      console.log('Usuario actualizado:', response);
      this.regresar(); 
    }, error => {
      console.error('Error al actualizar el usuario:', error);
    });
  }

  obtenerAdmin() {
    this.auth.obtenerUsuarioActual().subscribe(
      (data: IUser) => {
        this.adminForm.patchValue(data);
        this.usuario = data;
      },
      error => {
        console.error('Error al obtener los datos del usuario:', error);
      }
    );
  }
  

  regresar() {
    this.router.navigate(['/perfil']);
  }

}
