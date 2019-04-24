import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecomendacoesPage } from './recomendacoes';

@NgModule({
  declarations: [
    RecomendacoesPage,
  ],
  imports: [
    IonicPageModule.forChild(RecomendacoesPage),
  ],
})
export class RecomendacoesPageModule {}
