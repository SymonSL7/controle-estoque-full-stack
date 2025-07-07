import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


import { CadastrarProdutoComponent } from '../cadastrar-produto/cadastrar-produto.component';
import { EntradaComponent } from '../entrada/entrada.component';
import { SaidaComponent } from '../saida/saida.component';
import { EditarProdutoComponent } from '../editar-produto/editar-produto.component';

import { CommonModule } from '@angular/common';

import { Produto } from '../../models/produto.model';


@Component({
  selector: 'app-lista-produtos',
  imports: [MatDialogModule, MatButtonModule, CommonModule],
  templateUrl: './lista-produtos.component.html',
  styleUrl: './lista-produtos.component.css'
})
export class ListaProdutosComponent {



  @Input() produtos: Produto[] = [];



  constructor(private dialog: MatDialog){}

  // Método para ordenar produtos por SKU (menor para maior)
  ordenarProdutosPorSku(): void {
    this.produtos.sort((a, b) => a.sku - b.sku);
  }

  abrirCadastroProduto(): void {

    const dialogRef = this.dialog.open(CadastrarProdutoComponent, {
      width: '400px',
      position: { right: '0' },
      data: { sku: '', nome: '', precoCompra: '', precoVenda: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Adicionar o novo produto à lista
        this.produtos.push(result);
        // Ordenar a lista após adicionar o produto
        this.ordenarProdutosPorSku();
        console.log('Produto cadastrado:', result);
        alert(`Produto "${result.nome}" foi cadastrado com sucesso!`);
      }
    });

  }



  abrirEntrada(): void {
    const dialogRef = this.dialog.open(EntradaComponent, {
      width: '400px',
      position: { right: '0' },
      data: {
        sku: '',
        nome: '',
        quantidade: '',
        produtos: this.produtos
      },
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      // Ordenar a lista quando o diálogo for fechado
      this.ordenarProdutosPorSku();
    });
  }



  abrirSaida(): void {
    const dialogRef = this.dialog.open(SaidaComponent, {
      width: '400px',
      position: { right: '0' },
      data: {
        sku: '',
        nome: '',
        quantidade: '',
        produtos: this.produtos
      },
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      // Ordenar a lista quando o diálogo for fechado
      this.ordenarProdutosPorSku();
    });
  }

  editarProduto(produto: Produto): void {
    const dialogRef = this.dialog.open(EditarProdutoComponent, {
      width: '400px',
      position: { right: '0' },
      data: produto
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Atualizar o produto na lista
        const index = this.produtos.findIndex(p => p.sku === produto.sku);
        if (index !== -1) {
          this.produtos[index] = result;
          // Ordenar a lista após editar o produto
          this.ordenarProdutosPorSku();
        }
        console.log('Produto editado:', result);
      }
    });
  }

  excluirProduto(produto: Produto): void {
    const confirmacao = confirm(`Tem certeza que deseja excluir o produto "${produto.nome}"?\n\nEsta ação não pode ser desfeita.`);

    if (confirmacao) {
      const index = this.produtos.findIndex(p => p.sku === produto.sku);
      if (index !== -1) {
        this.produtos.splice(index, 1);
        // Ordenar a lista após excluir o produto
        this.ordenarProdutosPorSku();
        console.log('Produto excluído:', produto);
        alert(`Produto "${produto.nome}" foi excluído com sucesso!`);
      }
    }
  }

}
