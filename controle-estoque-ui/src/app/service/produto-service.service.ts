import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoServiceService {

  //private apiUrl = 'http://192.168.0.10:8000/api/v1';
  private apiUrl: string;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const host = window.location.hostname;
    if (host === 'localhost' || host === '127.0.0.1') {
      this.apiUrl = 'http://localhost:8000/api/v1';
    } else if (host.endsWith('.devtunnels.ms')) {
      this.apiUrl = 'https://00tr1trn-8000.brs.devtunnels.ms/api/v1';
    } else {
      this.apiUrl = 'http://192.168.0.10:8000/api/v1'; // Substitua pelo IP do backend
    }
    } else {
      // SSR: defina um valor padrão ou trate de outra forma
      this.apiUrl = 'http://localhost:8000/api/v1';
    }
  }

  listarProduto(): Observable<Produto[]> {

    return this.http.get<Produto[]>(`${this.apiUrl}/listar`);

  }

  cadastrarProduto(sku: number, nome: string, precoCompra: number, precoVenda: number){

    return this.http.post(
      `${this.apiUrl}/cadastrar`,
      {sku, nome, precoCompra, precoVenda},
      {headers: {'Content-Type': 'application/json'}}

    )

  }

  editarProduto(skuAntigo: number, sku: number, nome: string, precoCompra: number, precoVenda: number){

    return this.http.put(
      `${this.apiUrl}/editar/${skuAntigo}`,
      {sku, nome, precoCompra, precoVenda},
      {headers: {'Content-Type': 'application/json'}}

    )

  }

  entradaProduto(sku: number, quantidade: number) {

    return this.http.put(
      `${this.apiUrl}/entrada/${sku}`,
      {quantidade},
      {headers: {'Content-Type': 'application/json'}}

    )

  }

  saidaProduto(sku: number, quantidade: number) {

    return this.http.put(
      `${this.apiUrl}/saida/${sku}`,
      {quantidade},
      {headers: {'Content-Type': 'applicantion/json'}}

    )

  }

  excluirProduto(sku: number){

    return this.http.delete(

      `${this.apiUrl}/deletar/${sku}`

    )

  }


}
