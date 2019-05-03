import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfissionalModel } from '../../models/profissional.model';
import { ProfissionalService } from '../../services/domain/profissional.service';
import { ServicoService } from '../../services/domain/servico.service';
import { BuscaService } from '../../services/domain/busca.service';

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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public servicoService: ServicoService,
    public buscaService: BuscaService) {
  }

  ionViewDidLoad() {
    let id_servico = this.navParams.get('id');
    this.buscaService.search(id_servico)
      .subscribe(response => {
        console.log(response);
        this.items = response;
      },
      error => {});
  };

  //showDetail(profissionalId: string){
  //  this.navCtrl.push('ProfissionalDetalhePage', {id: profissionalId});
  //}

  showDetail(profissional: ProfissionalModel){
    this.navCtrl.push('ProfissionalDetalhePage', {id: profissional});
  }
}
