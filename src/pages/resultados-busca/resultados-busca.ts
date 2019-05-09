import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfissionalModel } from '../../models/profissional.model';
import { ProfissionalService } from '../../services/domain/profissional.service';
import { ServicoService } from '../../services/domain/servico.service';
import { BuscaService } from '../../services/domain/busca.service';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the ResultadosBuscaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resultados-busca',
  templateUrl: 'resultados-busca.html',
})
export class ResultadosBuscaPage {

  items: ProfissionalModel[];
  latitude: number;
  longitude: number;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public servicoService: ServicoService,
    public buscaService: BuscaService,
    private geolocation: Geolocation) {
  }

  ionViewDidLoad() {
    let id_servico = this.navParams.get('id');
    
    this.geolocation.getCurrentPosition()
    .then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;

      console.log(this.latitude);
      console.log(this.longitude);

      this.buscaService.search(id_servico, this.latitude, this.longitude)
      .subscribe(response => {
        console.log(response);
        this.items = response;
      },
      error => {});
    }).catch((error) => {
      console.log('Erro ao recuperar sua posição', error);
    });
    
  };

  //showDetail(profissionalId: string){
  //  this.navCtrl.push('ProfissionalDetalhePage', {id: profissionalId});
  //}

  showDetail(profissional: ProfissionalModel){
    this.navCtrl.push('ProfissionalDetalhePage', {prof: profissional});
  }
}
