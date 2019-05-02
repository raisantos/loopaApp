import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfissionalModel } from '../../models/profissional.model';
import { ProfissionalService } from '../../services/domain/profissional.service';

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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public profissionalService: ProfissionalService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfissionalDetalhePage');
    let profissionalId = this.navParams.get('id');
    this.profissionalService.findById(profissionalId)
      .subscribe(response => {
        this.item = response;
      },
      error => {});
  }

}
