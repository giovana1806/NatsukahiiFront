import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Iitem } from '../model/service/iitem';
import { Router } from '@angular/router';
import { ItemService } from '../model/service/item.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-blog',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [ItemService],
  templateUrl: './form-sushi.component.html',
  styleUrl: './form-sushi.component.scss'
})
export class FormSushiComponent {
    item: Iitem = {
    nome: '',
    preco: 0,
    descricao: '',
    imageUrl: ''
  };
  constructor(private itemService: ItemService, private router: Router)
{}
  onSubmit(): void {
    this.itemService.addItem(this.item).subscribe(
      (response) => {
        Swal.fire({
          title: "Prato Cadastrado!",
          text: "",
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed){
            this.router.navigate(['/']);
          }
        });
      },
      (error) => {
        console.error('Erro ao adicionar o prato:', error);
      }
    )
  }
}
