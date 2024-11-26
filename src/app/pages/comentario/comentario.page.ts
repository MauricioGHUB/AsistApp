import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ComentarioService } from 'src/app/services/comentario.service';
import { IEvent } from 'src/interfaces/ItEvent';
import { Comentario } from 'src/interfaces/comentario';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.page.html',
  styleUrls: ['./comentario.page.scss'],
})
export class ComentarioPage implements OnInit {
  eventoId: string = '';
  evento: IEvent | undefined;
  nuevoComentario: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private comentarioService: ComentarioService
  ) {}

  ngOnInit() {
    this.eventoId = this.route.snapshot.paramMap.get('id') || '';
    if (this.eventoId) {
      // Obtener el evento para mostrar en la vista de comentario
      // Supongamos que ya tienes la lista de eventos cargada
    }
  }

  
}
