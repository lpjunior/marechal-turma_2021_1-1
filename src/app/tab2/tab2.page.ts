import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalClientDetailsComponent } from '../modal-client-details/modal-client-details.component';
import { Cliente } from '../model/cliente.model';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  clientes!: Cliente[];

  constructor(
    private service: ClienteService,
    private modalCtrl: ModalController
  ) {}

  public ionViewWillEnter(): void {
    this.listaClientes();
  }

  listaClientes() {
    this.service.getClientes().subscribe({
      next: (result) => (this.clientes = result),
      error: (err) => console.error(err),
    });
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ModalClientDetailsComponent,
    });
    modal.present();
  }
}
