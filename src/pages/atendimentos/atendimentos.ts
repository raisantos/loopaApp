import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AtendimentoModel } from '../../models/atendimento.model';
import { AtendimentoService } from '../../services/domain/atendimento.service';

/**
 * Generated class for the AtendimentosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-atendimentos',
  templateUrl: 'atendimentos.html',
})
export class AtendimentosPage {

  items: AtendimentoModel[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public atendimentoService: AtendimentoService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AtendimentosPage');
    this.atendimentoService.findByCliente()
      .subscribe(response => {
        console.log(response);
        this.items = response;
      },
      error => {});
  }

}
