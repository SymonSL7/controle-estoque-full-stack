import { Component, Inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Produto } from '../../models/produto.model';
import { ProdutoServiceService } from '../../service/produto-service.service';

interface EntradaData {
  sku: number;
  nome: string;
  quantidade: number;
  produtos?: Produto[];
  atualizarLista?: () => void;
}

@Component({
  selector: 'app-entrada',
  imports: [MatDialogModule, MatButtonModule, FormsModule],
  templateUrl: './entrada.component.html',
  styleUrl: './entrada.component.css'
})
export class EntradaComponent {

  @Input() produtos: Produto[] = [];

  constructor(
    public dialogRef: MatDialogRef<EntradaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EntradaData,
    private produtoService: ProdutoServiceService
  ) {
    // Inicializar data se não fornecida
    if (!this.data) {
      this.data = {
        sku: 0,
        nome: '',
        quantidade: 0
      };
    }

    // Receber produtos dos dados se fornecidos
    if (this.data.produtos) {
      this.produtos = this.data.produtos;
    }
  }

  buscarProdutoPorSku(): void {
    if (!this.data.sku) {
      this.data.nome = '';
      return;
    }

    const produto = this.produtos.find(p => p.sku === this.data.sku);

    if (produto) {
      this.data.nome = produto.nome;
    } else {
      this.data.nome = '';
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSalvar(): void {
    // Validação básica
    if (!this.data.sku || !this.data.nome || !this.data.quantidade || this.data.quantidade <= 0) {
      alert('Por favor, preencha todos os campos corretamente.');
      return;
    }


    this.produtoService.entradaProduto(this.data.sku, this.data.quantidade).subscribe({

      next: () => {

        if (this.data.atualizarLista) {
        this.data.atualizarLista();
        }

        this.data.sku = 0;
        this.data.nome = '';
        this.data.quantidade = 0;

      },
      error: (err) => {

        alert('Erro ao registrar entrada: ' + (err.error || err.message));

      }

    });

    // Processar a entrada sem fechar o diálogo
    // const produto = this.produtos.find(p => p.sku === this.data.sku);
    // if (produto) {
    //   produto.quantidade += this.data.quantidade;
    //   alert(`Entrada de ${this.data.quantidade} unidades do produto "${this.data.nome}" registrada com sucesso!`);

    //   // Limpar os campos para próxima entrada
    //   this.data.sku = 0;
    //   this.data.nome = '';
    //   this.data.quantidade = 0;
    // }
  }
}
