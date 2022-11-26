import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tab2Page } from './tab2.page';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ClienteService } from '../services/cliente.service';
import { ModalClientDetailsModule } from '../modal-client-details/modal-client-details.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    Tab2PageRoutingModule,
    HttpClientModule,
    ModalClientDetailsModule
  ],
  declarations: [Tab2Page],
  providers: [ClienteService]
})
export class Tab2PageModule {}
