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
import { AtendimentoService } from '../../services/domain/atendimento.service';
 
declare var google;

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
  existe: string;
  map: any;
  mediaProfissional: number;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public profissionalService: ProfissionalService,
    public events: Events,
    public alertCtrl: AlertController,
    public avaliacaoService: AvaliacaoService, 
    public clienteService: ClienteService,
    public storage: StorageService,
    public atendimentoService: AtendimentoService) {
    
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

  ionViewWillEnter() {
    console.log('ionViewWillEnter ProfissionalDetalhePage');

    this.events.unsubscribe('star-rating:changed');
    
    let profissional = this.navParams.get('prof');
    this.item = profissional;
    //this.existe = "false";

    this.avaliacaoService.findByClienteAndProfissional(this.item.id )
      .subscribe(response => {
        console.log('response');
        console.log(response);
        this.avaliacao = response;
        console.log('avaliacao buscada no banco');
        if(this.avaliacao){
          this.rating = this.avaliacao.nota;
          this.existe = "true";
        }
        else{
          this.rating = '0';
          this.existe = "false";
        }
        console.log(this.avaliacao);
        console.log(this.rating);
        console.log(this.method);
      });

      console.log('average');
      this.avaliacaoService.getAverageProfissional(this.item.id)
      .subscribe(response => {
        console.log(response);
        this.mediaProfissional = response;
      }, error => {});

      this.events.subscribe('star-rating:changed', (starRating) => {
        this.existe = "true";
        console.log("star rating = " + starRating);
        this.rating = starRating;
        this.nota = this.rating;
  
        //if(this.method == 'post'){
          this.avaliacaoService.insert(this.nota, this.item.id)
          .subscribe(response => {
            //this.existe = "true";
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
        //}
      });
  }

  ionViewDidEnter(){
    console.log('ionViewDidEnter ProfissionalDetalhePage');
    let profissional = this.navParams.get('prof');
    this.item = profissional;
    console.log(this.item);
    console.log(this.item.location.lat, this.item.location.lon);
    const position = new google.maps.LatLng(this.item.location.lat, this.item.location.lon);

    const mapOptions = {
      zoom: 18,
      center: position
    }

    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    const marker = new google.maps.Marker({
      position: position,
      map: this.map
    });
  }

  gerarAtendimento(){
    this.atendimentoService.insert(this.item.id)
    .subscribe(response => {
      let alert = this.alertCtrl.create({
        title: 'Atendimento',
        message: 'Atendimento Solicitado com Sucesso. Apresente o Código Gerado ao Profissional. ' + 
        'Você pode conferir os códigos gerados na aba de Atendimentos.',
        enableBackdropDismiss: false,
        buttons: [
            {
                text: 'Ok'
            }
        ]
      });
      alert.present();
    });
  }
}
