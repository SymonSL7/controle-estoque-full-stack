import { Component, Inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Produto } from '../../models/produto.model';

interface SaidaData {
  sku: number;
  nome: string;
  quantidade: number;
  produtos?: Produto[];
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
    @Inject(MAT_DIALOG_DATA) public data: SaidaData
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

    // Verificar se há estoque suficiente
    const produto = this.produtos.find(p => p.sku === this.data.sku);
    if (produto && this.data.quantidade > produto.quantidade) {
      alert(`Estoque insuficiente. Disponível: ${produto.quantidade}`);
      return;
    }

    // Processar a saída sem fechar o diálogo
    if (produto) {
      produto.quantidade -= this.data.quantidade;
      alert(`Saída de ${this.data.quantidade} unidades do produto "${this.data.nome}" registrada com sucesso!`);

      // Limpar os campos para próxima saída
      this.data.sku = 0;
      this.data.nome = '';
      this.data.quantidade = 0;
    }
  }
}
