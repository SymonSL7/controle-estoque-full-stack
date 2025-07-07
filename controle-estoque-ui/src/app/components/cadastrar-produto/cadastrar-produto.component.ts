import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Produto } from '../../models/produto.model';

interface CadastroData {
  sku: number;
  nome: string;
  precoCompra: number;
  precoVenda: number;
}

@Component({
  selector: 'app-cadastrar-produto',
  imports: [MatDialogModule, MatButtonModule, FormsModule],
  templateUrl: './cadastrar-produto.component.html',
  styleUrls: ['./cadastrar-produto.component.css']
})
export class CadastrarProdutoComponent {

  constructor(
    public dialogRef: MatDialogRef<CadastrarProdutoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CadastroData
  ) {
    // Inicializar data se não fornecida
    if (!this.data) {
      this.data = {
        sku: 0,
        nome: '',
        precoCompra: 0,
        precoVenda: 0
      };
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSalvar(): void {
    // Validação básica
    if (!this.data.sku || !this.data.nome || this.data.precoCompra <= 0 || this.data.precoVenda <= 0) {
      alert('Por favor, preencha todos os campos corretamente.');
      return;
    }

    // Verificar se o preço de venda é maior que o de compra
    if (this.data.precoVenda <= this.data.precoCompra) {
      alert('O preço de venda deve ser maior que o preço de compra.');
      return;
    }

    // Criar objeto produto completo
    const produto: Produto = {
      sku: this.data.sku,
      nome: this.data.nome,
      quantidade: 0, // Produto novo começa com 0
      precoCompra: this.data.precoCompra,
      precoVenda: this.data.precoVenda
    };

    this.dialogRef.close(produto);
  }
}
