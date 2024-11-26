import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface Asistente {
  nombre: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class AsistentesService {
  private comentariosUrl = 'https://apinoc.onrender.com/asistencias';

  constructor(private http: HttpClient) {}

  obtenerAsistentes(): Observable<Asistente[]> {
    return this.http.get<any[]>(this.comentariosUrl).pipe(
      map((data) =>
        data.map((item) => ({
          nombre: item.nombreEvento,
          email: item.emailUsuario,
        }))
      )
    );
  }
}