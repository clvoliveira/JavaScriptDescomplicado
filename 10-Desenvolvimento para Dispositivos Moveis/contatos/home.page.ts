import { Component } from '@angular/core';
import { ContatosService } from '../services/contatos.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public contatos: any;
  constructor(public contatosService: ContatosService,
    public alertaTelefone: AlertController) {
    this.contatos = this.contatosService.buscartodosContatos();
  }
  async verTelefone(contato) {
    var alerta = await this.alertaTelefone.create({
      header: "Telefone",
      message: contato.telefone,
      buttons: ['OK']
    });
    await alerta.present();
  }
}