import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfissionalModel } from '../../models/profissional.model';
import { ProfissionalService } from '../../services/domain/profissional.service';
import { RecomendacaoService } from '../../services/domain/recomendacao.service';

/**
 * Generated class for the RecomendacoesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recomendacoes',
  templateUrl: 'recomendacoes.html',
})
export class RecomendacoesPage {

  items: ProfissionalModel[];
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public profissionalService: ProfissionalService,
    public recomendacaoService: RecomendacaoService) {
  }

  ionViewDidLoad() {
    this.recomendacaoService.recomendacoes()
      .subscribe(response => {
        this.items = response;
      },
      error => {});
  };

}
