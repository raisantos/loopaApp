import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResultadosBuscaPage } from './resultados-busca';

@NgModule({
  declarations: [
    ResultadosBuscaPage,
  ],
  imports: [
    IonicPageModule.forChild(ResultadosBuscaPage),
  ],
})
export class ResultadosBuscaPageModule {}
