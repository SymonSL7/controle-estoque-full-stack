import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { ListaProdutosComponent } from './components/lista-produtos/lista-produtos.component';
import { dataFake } from './data/dataFake'

import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatDialogModule, MatButtonModule, ListaProdutosComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'controle-estoque-ui';
  produtos = dataFake;
}
