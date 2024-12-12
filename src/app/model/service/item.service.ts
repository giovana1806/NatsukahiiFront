import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Iitem } from './iitem';
import { items } from '../data/mock-dados';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = 'http://localhost:8080/comida';

  constructor(private http: HttpClient) { }
  getItems(): Observable<Iitem[]> {
    return this.http.get<Iitem[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Erro ao buscar items da API, usando items locais:', error);
        return of (items);
      })
    );
  }

  getItemById(id: number): Observable<Iitem> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Iitem>(url).pipe(
      catchError(error => {
        console.error(`Erro ao buscar o item com ID ${id}:`, error);
        return of (null as any);
      })
    );
  }

  addItem(newItem: Iitem): Observable<Iitem> {
    return this.http.post<Iitem>(this.apiUrl, newItem).pipe(
      catchError(error => {
        console.error('Erro ao adicionar um novo item:', error);
        return of (null as any);
      })
    );
  }

  updateItem(updatedItem: Iitem): Observable<Iitem> {
    const url = `${this.apiUrl}/${updatedItem.id}`;
    return this.http.put<Iitem>(url, updatedItem).pipe(
      catchError(error => {
        console.error(`Erro ao atualizar o item com ID ${updatedItem.id}:`, error);
        return of (null as any);
      })
    );
  }

  deleteItem(id: number): Observable<void>{
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url).pipe(
      catchError(error => {
        console.error(`Erro ao deletar o item com ID ${id}:`, error);
        return of ();
      })
    );
  }
}
