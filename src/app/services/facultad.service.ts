import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Facultad } from '../models/facultad.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class FacultadService {
  private url = `${environment.apiUrl}/facultades`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Facultad[]> {
    return this.http.get<Facultad[]>(this.url);
  }

  create(facultad: Omit<Facultad, 'id'>): Observable<Facultad> {
    return this.http.post<Facultad>(this.url, facultad);
  }
}