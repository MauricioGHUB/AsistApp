import { Injectable } from '@angular/core';
import { Comentario } from 'src/interfaces/comentario';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { EventosService } from './eventos.service';
import { switchMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {
  private comentariosUrl = 'http://localhost:3000/comentarios';

  constructor(private http: HttpClient, private authService: AuthService,
              private eventosService: EventosService) { }

  obtenerComentarios(): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(this.comentariosUrl).pipe(
      catchError(error => {
        console.error('Error al obtener comentarios:', error);
        return of([]);
      })
    );
  }

  agregarComentario(eventoId: string, comentario: Comentario): Observable<Comentario> {
    const usuarioId = this.authService.getUserId();
    
    if (!usuarioId) {
      return throwError('No se encontró el ID del usuario logueado.');
    }

    return this.eventosService.verificarInscripcion(usuarioId, eventoId).pipe(
      switchMap(inscrito => {
        if (inscrito) {
          return this.http.post<Comentario>(this.comentariosUrl, { ...comentario, usuarioId }).pipe(
            catchError(error => {
              console.error('Error al agregar el comentario:', error);
              return throwError('Error al agregar el comentario, por favor intenta más tarde.');
            })
          );
        } else {
          return throwError('No puede comentar porque no ha asistido al evento.');
        }
      }),
      catchError(error => {
        console.error('Error en el flujo de agregar comentario:', error);
        return throwError(error);
      })
    );
  }
}

