import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { CarrinhoService } from '../model/service/carrinho.service';
import { Icarrinho } from '../model/service/icarrinho';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  providers: [CarrinhoService],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  
  constructor(private carrinhoService: CarrinhoService) {}

  // Exibir mensagem de confirmação para finalizar a compra
  private finalizePurchase(): void {
    Swal.fire({
      title: 'Confirmação de Compra',
      text: "Você tem certeza que deseja finalizar a compra? Todos os itens serão removidos.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, finalizar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.carrinhoService.getCarrinhoItem().subscribe((items: Icarrinho[]) => {
          Swal.fire(
            'Compra Finalizada!',
            'Você finalizou sua compra. Seu pedido será entregue em breve!',
            'success'
          );
        });
      }
    });
  }

  // Método principal para exibir o carrinho e opções
  showCarrinhoAlert(): void {
    this.carrinhoService.getCarrinhoItem().subscribe((carrinhoItems: Icarrinho[]) => {
      if (carrinhoItems.length === 0) {
        Swal.fire({
          icon: 'info',
          title: 'Carrinho Vazio',
          text: 'Seu carrinho está vazio. Adicione itens para prosseguir.',
          confirmButtonText: 'Ok'
        });
        return;
      }

      // Gerar o HTML dos itens com botões de remoção
      const itemsHtml = carrinhoItems.map(item => `
        <div class="itemTeste" style="width: 400px;">
          <img src="${item.imageUrl}" class="imagem" style="width: 200px; height: 200px;"/>
          <div>
            <h5>${item.nome}</h5>
            <p>${item.descricao}</p>
            <p>Preço: R$ ${item.preco}</p>
          </div>
        </div>
      `).join('');

      //const totalValue = carrinhoItems.reduce((total, item) => total + item.totalValue, 0);

      // Exibir o SweetAlert2 com a função de remoção e botão para finalizar a compra
      Swal.fire({
        title: 'Itens no Carrinho',
        html: `<div class="teste">
          ${itemsHtml}
        </div>`,
        showCancelButton: true,
        cancelButtonText: 'Fechar',
        confirmButtonText: 'Finalizar Compra',
        didOpen: () => {
          carrinhoItems.forEach(item => {
            const removeButton = document.getElementById(`remove-btn-${item.id}`);
            if (removeButton) {
            // removeButton.addEventListener('click', () => this.confirmRemoveItem(item.id));
            }
          });

          const finalizeButton = Swal.getConfirmButton();
          if (finalizeButton) {
            finalizeButton.addEventListener('click', () => this.finalizePurchase());
          }
        }
      });
    });
  }
}
