import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { ProfissionalModel } from '../../models/profissional.model';
import { ProfissionalService } from '../../services/domain/profissional.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { AvaliacaoService } from '../../services/domain/avaliacao.service';
import { ClienteService } from '../../services/domain/cliente.service';
import { StorageService } from '../../services/storage.service';
import { ClienteModel } from '../../models/cliente.model';
import { AvaliacaoModel } from '../../models/avaliacao.model';

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
  cliente: ClienteModel;
  avaliacao: AvaliacaoModel;
  rating: string;
  method: string;
  nota: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public profissionalService: ProfissionalService,
    public events: Events,
    public alertCtrl: AlertController,
    public avaliacaoService: AvaliacaoService, 
    public clienteService: ClienteService,
    public storage: StorageService) {
    
  }

  /*ionViewDidLoad() {
    console.log('ionViewDidLoad ProfissionalDetalhePage');
    let profissionalId = this.navParams.get('id');
    this.profissionalService.findById(profissionalId)
      .subscribe(response => {
        this.item = response;
      },
      error => {});
  }*/

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfissionalDetalhePage');

    let profissional = this.navParams.get('prof');
    this.item = profissional;

    this.avaliacaoService.findByClienteAndProfissional(this.item.id )
      .subscribe(response => {
        console.log('response');
        console.log(response);
        this.avaliacao = response;
        console.log('avaliacao buscada no banco');
        if(this.avaliacao){
          this.rating = this.avaliacao.nota;
          this.method = 'put';
        }
        else{
          this.rating = '0';
          this.method = 'post';
        }
        console.log(this.avaliacao);
        console.log(this.rating);
        console.log(this.method);
      });
    
    this.events.subscribe('star-rating:changed', (starRating) => {
      console.log(starRating);
      this.rating = starRating;
      this.nota = this.rating;

      if(this.method == 'post'){
        this.avaliacaoService.insert(this.nota, this.item.id)
        .subscribe(response => {
          let alert = this.alertCtrl.create({
            title: 'Avaliação',
            message: 'Você avaliou este profissional com nota ' + this.rating,
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Ok'
                }
            ]
          });
          alert.present();
        },
        error => {});
      }
      //this.avaliacaoService.insert();

      
    });

    //this.profissionalService.findById(profissionalId)
      //.subscribe(response => {
        //this.item = response;
      //},
      //error => {});
  }

}
