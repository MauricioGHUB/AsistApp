import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-users',
  templateUrl: './get-users.page.html',
  styleUrls: ['./get-users.page.scss'],
})
export class GetUsersPage implements OnInit {
  usuarios: any[] = [];

  constructor(private http: HttpClient,
              private router:Router
  ) {}

  ngOnInit() {
    this.getUsuarios();
  }

  getUsuarios() {
    this.http.get<any[]>('http://localhost:3000/usuarios')
      .subscribe(response => {
        this.usuarios = response;
      }, error => {
        console.error('Error al obtener usuarios', error);
      });
  }
  regresar(){
    this.router.navigate(['/tabs/tab2'])
  }

  verDetalleUsuario(usuario: any) {
    this.router.navigate(['/deta-usuarios', usuario.nombre]); 
  }
}