import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ICrearUser, IUser } from 'src/interfaces/usuarios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpclient: HttpClient) {}

  getAllUsers(): Observable<IUser[]> {
    return this.httpclient.get<IUser[]>(`${environment.apiUrl}/usuarios`).pipe(
      catchError((error) => {
        console.error('Error al obtener todos los usuarios:', error);
        return of([]);
      })
    );
  }

  getUserByUsername(nombre: string): Observable<IUser> {
    return this.httpclient
      .get<IUser[]>(`${environment.apiUrl}/usuarios?nombre=${nombre}`)
      .pipe(
        map((users) => users[0]),
        catchError((error) => {
          console.error('Error al buscar usuario por nombre:', error);
          return of(null as unknown as IUser);
        })
      );
  }

  getUserByEmail(email: string): Observable<IUser[]> {
    return this.httpclient.get<IUser[]>(`${environment.apiUrl}/usuarios?email=${email}`).pipe(
      catchError((error) => {
        console.error('Error al buscar usuario por email:', error);
        return of([]);
      })
    );
  }

  obtenerUsuarioActual(): Observable<IUser> {
    const usuarioId = sessionStorage.getItem('id');
    if (!usuarioId) {
      console.error('ID del usuario no encontrado en sessionStorage');
      return of(null as unknown as IUser);
    }
    return this.httpclient.get<IUser>(`${environment.apiUrl}/usuarios/${usuarioId}`).pipe(
      catchError((error) => {
        console.error('Error al obtener el usuario actual:', error);
        return of(null as unknown as IUser);
      })
    );
  }

  registrarUsuario(newUsuario: ICrearUser): Observable<IUser> {
    return this.httpclient.post<IUser>(`${environment.apiUrl}/usuarios`, newUsuario).pipe(
      catchError((error) => {
        console.error('Error al registrar usuario:', error);
        throw error;
      })
    );
  }

  actualizarUsuario(usuario: IUser): Observable<IUser> {
    return this.httpclient.put<IUser>(`${environment.apiUrl}/usuarios/${usuario.id}`, usuario).pipe(
      catchError((error) => {
        console.error('Error al actualizar usuario:', error);
        throw error;
      })
    );
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem('id') != null;
  }

  getUserId(): string | null {
    return sessionStorage.getItem('id');
  }
}
