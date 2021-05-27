import { Injectable } from '@angular/core';
import { CONTATOS } from "../dados/dadoscontatos";
@Injectable({
  providedIn: 'root'
})
export class ContatosService {
  private contatos: any;
  constructor() {
    this.contatos = CONTATOS;
  }
  buscarTodosContatos() {
    return this.contatos;
  }
  buscarContato(id) {
    for (var i = 0; i < this.contatos.length; i++) {
      if (this.contatos[i].id === parseInt(id)) {
        return this.contatos[i];
      }
    }
    return null;
  }
}