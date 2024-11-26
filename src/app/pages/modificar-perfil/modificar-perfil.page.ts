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
    img: "",
    isactive: false,
  };

  userForm: FormGroup;
  selectedFile: File | null = null;  // Para almacenar el archivo seleccionado

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
    

    this.auth.actualizarUsuario(this.usuario).subscribe(response => {
      console.log('Usuario actualizado:', response);
      this.regresar(); 
    }, error => {
      console.error('Error al actualizar el usuario:', error);
    });
  }


  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement; // Accede al archivo seleccionado
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
  
      reader.onload = () => {
        // Convierte la imagen a Base64 y la almacena en el administrador
        if (this.usuario) {
          this.usuario.img = reader.result as string;
          this.selectedFile = file; // Almacena el archivo seleccionado (físico)
          console.log("Imagen convertida a Base64:", this.usuario.img); // Esto es para que puedas ver el base64 en consola
        }
      };
  
      reader.readAsDataURL(file); // Lee el archivo como Data URL (Base64)
    }
  }
  navigateToLogin() {
    this.router.navigate(['/contrasena']);
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
