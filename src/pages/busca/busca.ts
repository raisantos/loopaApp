import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfissionalModel } from '../../models/profissional.model';
import { ProfissionalService } from '../../services/domain/profissional.service';
import { ServicoModel } from '../../models/servico.model';
import { ServicoService } from '../../services/domain/servico.service';

/**
 * Generated class for the BuscaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-busca',
  templateUrl: 'busca.html',
})
export class BuscaPage {

  items: ProfissionalModel[];
  servicos: ServicoModel[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public profissionalService: ProfissionalService,
    public servicoService: ServicoService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuscaPage');
    this.servicoService.findAll()
      .subscribe(response => {
        this.servicos = response;
      },
      error => {});
  }

  showProfissionais(idServico: string, descricaoServico: string){
    this.navCtrl.push('ResultadosBuscaPage', {id: idServico, descricao: descricaoServico});
  }
}
