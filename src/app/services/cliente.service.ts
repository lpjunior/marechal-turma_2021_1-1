import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../model/cliente.model';

const API_URL = 'http://localhost:3000';
const HTTP_OPTIONS = {
  headers: new HttpHeaders (
    {'Content-Type': 'application/json;charset=utf-8'}
  )
};

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) {}

  /* CRUD */

  insertCliente(cliente: Cliente): Observable<any> {
    return this.http.post(`${API_URL}/cliente`, cliente, HTTP_OPTIONS);
  }

  findCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${API_URL}/cliente/${id}`);
  }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${API_URL}/cliente`);
  }

  updateCliente(cliente: Cliente): Observable<any> {
    return this.http.put(`${API_URL}/cliente/${cliente.id}`, cliente, HTTP_OPTIONS);
  }

  deleteCliente(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/cliente/${id}`);
  }
}
