import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfissionalDetalhePage } from './profissional-detalhe';

@NgModule({
  declarations: [
    ProfissionalDetalhePage,
  ],
  imports: [
    IonicPageModule.forChild(ProfissionalDetalhePage),
  ],
})
export class ProfissionalDetalhePageModule {}
