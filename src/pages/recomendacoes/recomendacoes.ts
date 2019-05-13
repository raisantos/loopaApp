import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfissionalModel } from '../../models/profissional.model';
import { ProfissionalService } from '../../services/domain/profissional.service';
import { RecomendacaoService } from '../../services/domain/recomendacao.service';
import { Geolocation } from '@ionic-native/geolocation';

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
  latitude: number;
  longitude: number;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public profissionalService: ProfissionalService,
    public recomendacaoService: RecomendacaoService,
    private geolocation: Geolocation) {
  }

  ionViewDidLoad() {
    this.geolocation.getCurrentPosition()
    .then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;

      console.log(this.latitude);
      console.log(this.longitude);

      this.recomendacaoService.recomendations(this.latitude, this.longitude)
      .subscribe(response => {
        console.log(response);
        this.items = response;
      },
      error => {});
    }).catch((error) => {
      console.log('Erro ao recuperar sua posição', error);
    });
  };

  showDetail(profissional: ProfissionalModel){
    this.navCtrl.push('ProfissionalDetalhePage', {prof: profissional});
  }
}
