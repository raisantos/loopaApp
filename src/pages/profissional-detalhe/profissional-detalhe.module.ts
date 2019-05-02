import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfissionalDetalhePage } from './profissional-detalhe';
import { StarRatingModule } from 'ionic3-star-rating';

@NgModule({
  declarations: [
    ProfissionalDetalhePage,
  ],
  imports: [
    StarRatingModule,
    IonicPageModule.forChild(ProfissionalDetalhePage),
  ],
})
export class ProfissionalDetalhePageModule {}
