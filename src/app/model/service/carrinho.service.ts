import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Icarrinho } from './icarrinho';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private storageKey = 'carrinhoItems'; // Chave para armazenar no localStorage

  constructor() {}

  // Obtém os itens do carrinho do localStorage
  private getLocalCarrinhoItems(): Icarrinho[] {
    const items = localStorage.getItem(this.storageKey);
    return items ? JSON.parse(items) : [];
  }

  // Salva os itens do carrinho no localStorage
  private saveLocalCarrinhoItems(items: Icarrinho[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  // Simula o método GET para obter todos os itens do carrinho
  getCarrinhoItem(): Observable<Icarrinho[]> {
    const carrinhoItems = this.getLocalCarrinhoItems();
    return of(carrinhoItems); // Retorna o array local
  }

  // Simula o método POST para adicionar um novo item ao carrinho
  addCarrinhoItem(item: Icarrinho): Observable<Icarrinho> {
    const carrinhoItems = this.getLocalCarrinhoItems();
    item.id = carrinhoItems.length + 1; // Gera um novo ID
    //item.totalValue = item.value * item.quantity; // Calcula o valor total
    carrinhoItems.push(item); // Adiciona o item ao array local
    this.saveLocalCarrinhoItems(carrinhoItems); // Salva no localStorage
    return of(item); // Retorna o item adicionado
  }

  // Simula o método PUT para atualizar um item do carrinho
  updateCarrinhoItem(id: number, updatedItem: Partial<Icarrinho>): Observable<Icarrinho | null> {
    const carrinhoItems = this.getLocalCarrinhoItems();
    const index = carrinhoItems.findIndex((item) => item.id === id);
    if (index !== -1) {
      carrinhoItems[index] = { ...carrinhoItems[index], ...updatedItem };
      this.saveLocalCarrinhoItems(carrinhoItems); // Salva no localStorage
      return of(carrinhoItems[index]); // Retorna o item atualizado
    }
    return of(null); // Retorna null se o item não for encontrado
  }

  // Simula o método DELETE para remover um item do carrinho
  deleteCarrinhoItem(id: number): Observable<{ success: boolean }> {
    const carrinhoItems = this.getLocalCarrinhoItems();
    const newCarrinhoItems = carrinhoItems.filter((item) => item.id !== id); // Remove o item
    this.saveLocalCarrinhoItems(newCarrinhoItems); // Salva no localStorage
    return of({ success: true }); // Retorna uma resitema de sucesso
  }
}