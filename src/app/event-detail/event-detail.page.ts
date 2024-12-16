import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventosService } from '../services/eventos.service';
import { ComentarioService } from '../services/comentario.service';
import { AuthService } from '../services/auth.service';
import { IEvent } from 'src/interfaces/ItEvent';
import { Comentario } from 'src/interfaces/comentario';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.page.html',
  styleUrls: ['./event-detail.page.scss'],
})
export class EventDetailPage implements OnInit {
  evento: IEvent | undefined;
  comentarios: Comentario[] = [];
  puedeComentar: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private eventosService: EventosService,
    private comentarioService: ComentarioService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    const eventoId = this.route.snapshot.paramMap.get('id');
    if (eventoId) {
      this.eventosService.getEventos().subscribe((data: IEvent[]) => {
        this.evento = data.find((e) => e.id.toString() === eventoId);
        if (this.evento) {
          this.verificarAsistencia(eventoId);
          this.cargarComentarios();
        } else {
          console.error('Evento no encontrado');
        }
      });
    }
  }

  verificarAsistencia(eventoId: string) {
    const usuarioId = this.authService.getUserId();
    if (usuarioId) {
      this.eventosService.verificarInscripcion(usuarioId, eventoId).subscribe((inscrito) => {
        this.puedeComentar = inscrito;
      });
    }
  }
  cargarComentarios() {
    this.comentarioService.obtenerComentarios().subscribe((data) => {
      this.comentarios = data.filter(comentario => comentario.eventoId === this.evento?.id);
    });
  }

  irAComentarios() {
    const eventoId = this.evento?.id || '';
    this.router.navigate(['/comentario', eventoId]);
  }

  isBase64(str: string): boolean {
    const pattern = /^(data:image\/[a-zA-Z]*;base64,)/;
    return pattern.test(str);
  }
}
