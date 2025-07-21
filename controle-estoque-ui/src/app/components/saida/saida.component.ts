import { Component, Inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Produto } from '../../models/produto.model';
import { ProdutoServiceService } from '../../service/produto-service.service';

interface SaidaData {
  sku: number | null;
  nome: string;
  quantidadeAtual: number;
  quantidade: number | null;
  produtos?: Produto[];
  atualizarLista?: () => void;
}

@Component({
  selector: 'app-saida',
  imports: [MatDialogModule, MatButtonModule, FormsModule],
  templateUrl: './saida.component.html',
  styleUrl: './saida.component.css'
})
export class SaidaComponent {

  @Input() produtos: Produto[] = [];

  constructor(
    public dialogRef: MatDialogRef<SaidaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SaidaData,
    private produtoService: ProdutoServiceService
  ) {
    // Inicializar data se não fornecida
    if (!this.data) {
      this.data = {
        sku: 0,
        nome: '',
        quantidadeAtual: 0,
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
      this.data.quantidadeAtual = produto.quantidade ?? 0;
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

    // Verificar se há estoque suficiente
    const produto = this.produtos.find(p => p.sku === this.data.sku);
    if (produto && this.data.quantidade > (produto.quantidade ?? 0)) {
      alert(`Estoque insuficiente. Disponível: ${produto.quantidade}`);
      return;
    }

    const skuAnterior = this.data.sku;

    this.produtoService.saidaProduto(this.data.sku, this.data.quantidade).subscribe({

        next: () => {

          if(this.data.atualizarLista) {
            this.data.atualizarLista();
          }

          this.produtoService.listarProduto().subscribe(produtosAtualizados => {
            this.produtos = produtosAtualizados;

            const produtoAtualizado = this.produtos.find(p => p.sku === skuAnterior);
            if (produtoAtualizado) {
              this.data.quantidadeAtual = produtoAtualizado.quantidade ?? 0;
            } else {
              this.data.quantidadeAtual = 0;
            }

          });

          this.data.sku = null;
          this.data.quantidade = null;

        },
        error: (err) => {

          alert('Erro ao registrar entrada: ' + (err.error || err.message));

        }

    });

    // // Processar a saída sem fechar o diálogo
    // if (produto) {
    //   produto.quantidade -= this.data.quantidade;
    //   alert(`Saída de ${this.data.quantidade} unidades do produto "${this.data.nome}" registrada com sucesso!`);

    //   // Limpar os campos para próxima saída
    //   this.data.sku = 0;
    //   this.data.nome = '';
    //   this.data.quantidade = 0;
    // }
  }
}
