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
  private jsonURL = `${environment.apiUrl}/asistencias`;

  constructor(private http: HttpClient) {}

  obtenerAsistentes(): Observable<Asistente[]> {
    return this.http.get<any[]>(this.jsonURL).pipe(
      map((data) =>
        data.map((item) => ({
          nombre: item.nombreEvento,
          email: item.emailUsuario,
        }))
      )
    );
  }
}