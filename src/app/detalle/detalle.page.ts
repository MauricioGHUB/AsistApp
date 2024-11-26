import { Component, OnInit } from '@angular/core';  
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {

  post: any = {};
  id: any;
  evento: any = { 
    id: 0,
    nombre: "",
    fecha: "",
    lugar: "",
    imagen: ""
  };

  constructor(private router: Router, private ruta : ActivatedRoute) {
    this.ruta.queryParams.subscribe(params => {
      if (params['post']) {
        this.post = JSON.parse(params['post']);
      }
    });
  }

  ngOnInit() {}

  ionViewWillEnter() {
    if (this.post) {
      this.evento = this.post; 
      this.id = this.evento.id;
      console.log('ID del evento:', this.id);
    }
  }

  actualizarEvento() {
    this.router.navigate(
      ['pages/actualizar', this.evento.id],
      { queryParams: { eventos: JSON.stringify(this.evento) } }
    );
  }

  regresar() {
    this.router.navigate(['/tabs/tab2']);
  }
}
