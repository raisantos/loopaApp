import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfissionalService } from '../../services/domain/profissional.service';
import { ProfissionalModel } from '../../models/profissional.model';

/**
 * Generated class for the ProfissionaisPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profissionais',
  templateUrl: 'profissionais.html',
})
export class ProfissionaisPage {

  items: ProfissionalModel[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public profissionalService: ProfissionalService) {
  }

  ionViewDidLoad() {
    this.profissionalService.findAll()
      .subscribe(response => {
        console.log(response);
        this.items = response;
      },
      error => {
        console.log(error)
      });
  }

}
