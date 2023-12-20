import { Injectable } from '@angular/core';

// importaciones

import {HttpClient} from '@angular/common/http';
import {environment} from 'src/config';
import {Observable} from 'rxjs';

import { Libro } from '../Interfaces/libro';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  private endpoint: string = environment.endPoint;
  private apiUrl: string = this.endpoint+"Libro/";

  constructor(private http:HttpClient) { }

  getList(): Observable<Libro[]>{
    return this.http.get<Libro[]>(`${this.apiUrl}Lista`);
  }

  add(request: Libro): Observable<Libro>{
    return this.http.post<Libro>(`${this.apiUrl}Agregar`,request);
  }

  delete(idLibro: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}Eliminar/${idLibro}`);
  }
}
