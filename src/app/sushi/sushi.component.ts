import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemService } from '../model/service/item.service';
import { Iitem } from '../model/service/iitem';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { CarrinhoService } from '../model/service/carrinho.service';
import { Icarrinho } from '../model/service/icarrinho';

@Component({
  selector: 'app-sushi',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [ItemService, CarrinhoService],
  templateUrl: './sushi.component.html',
  styleUrl: './sushi.component.scss'
})
export class SushiComponent implements OnInit{
  
  cartItemCount: number = 0;
  cartAdd = [];
  items: Iitem[] = [];

  constructor( 
    private itemService : ItemService,
    private carrinhoService:CarrinhoService
  ) {}

  ngOnInit(): void {
    this.itemService.getItems().subscribe((item) => {
      this.items = item;
    });
  }
  
  addToCart(item: Icarrinho) {
    const carrinhoItem: Icarrinho = {
      id: 0, // O ID será gerado automaticamente pelo serviço
      nome: item.nome,
      preco: item.preco,
      imageUrl: item.imageUrl,
      descricao: item.descricao
    };

    // Chama o serviço para adicionar o item ao carrinho
    this.carrinhoService.addCarrinhoItem(carrinhoItem).subscribe((itemAdicionado) => {
      Swal.fire({
        title: 'Item adicionado ao carrinho!',
        text: "Você adicionou um item no carrinho!",
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Continuar comprando',
      });
    });
  }
}
