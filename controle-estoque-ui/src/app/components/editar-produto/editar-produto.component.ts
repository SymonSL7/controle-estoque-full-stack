import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { Produto } from '../../models/produto.model';
import { ProdutoServiceService } from '../../service/produto-service.service';

@Component({
  selector: 'app-editar-produto',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './editar-produto.component.html',
  styleUrl: './editar-produto.component.css'
})
export class EditarProdutoComponent {
  produto: Produto;
  skuAntigo: number;

  constructor(
    public dialogRef: MatDialogRef<EditarProdutoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Produto,
    private produtoService: ProdutoServiceService
  ) {
    this.produto = { ...data };
    this.skuAntigo = data.sku;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {

    const produtoEditado = {
      sku: this.produto.sku,
      nome: this.produto.nome,
      precoCompra: this.produto.precoCompra,
      precoVenda: this.produto.precoVenda
    };

    if (this.validarFormulario()) {

      this.produtoService.editarProduto(this.skuAntigo, produtoEditado.sku, produtoEditado.nome, produtoEditado.precoCompra, produtoEditado.precoVenda).subscribe({

        next:() => {
          alert('Produto editado com sucesso!');
          this.dialogRef.close(produtoEditado);

        },
        error: (err) => {

          alert('Erro ao registrar entrada: ' + (err.error || err.message));

        }

      })


    }
  }

  private validarFormulario(): boolean {
    if (!this.produto.sku || !this.produto.nome ||
        !this.produto.precoCompra || !this.produto.precoVenda) {
      alert('Todos os campos são obrigatórios!');
      return false;
    }

    if (this.produto.precoCompra <= 0 || this.produto.precoVenda <= 0) {
      alert('Os preços devem ser maiores que zero!');
      return false;
    }

    if (this.produto.precoVenda <= this.produto.precoCompra) {
      alert('O preço de venda deve ser maior que o preço de compra!');
      return false;
    }

    return true;
  }
}
