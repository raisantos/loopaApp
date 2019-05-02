import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfissionalModel } from '../../models/profissional.model';

/**
 * Generated class for the ProfissionalDetalhePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profissional-detalhe',
  templateUrl: 'profissional-detalhe.html',
})
export class ProfissionalDetalhePage {

  item: ProfissionalModel;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfissionalDetalhePage');
    this.item = {
      id: "1",
      nome: "Jose"
    }
  }

}
