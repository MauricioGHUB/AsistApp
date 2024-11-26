import { Component, OnInit } from '@angular/core';
import { AsistentesService, Asistente } from '../services/asistentes.service';

@Component({
  selector: 'app-asistentes',
  templateUrl: './asistentes.page.html',
  styleUrls: ['./asistentes.page.scss'],
})
export class AsistentesPage implements OnInit {
  asistentes: Asistente[] = [];

  constructor(private asistentesService: AsistentesService) {}

  ngOnInit() {
    this.cargarAsistentes();
  }

  cargarAsistentes() {
    this.asistentesService.obtenerAsistentes().subscribe(
      (data) => {
        this.asistentes = data;
      },
      (error) => {
        console.error('Error al cargar los asistentes:', error);
      }
    );
  }

  verDetalles(asistente: Asistente) {
    console.log('Detalles del asistente:', asistente);
  }
}
