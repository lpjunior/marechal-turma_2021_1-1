import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ModalClientDetailsComponent } from './modal-client-details.component';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [ModalClientDetailsComponent],
  exports: [ModalClientDetailsComponent]
})
export class ModalClientDetailsModule {}
