import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Cliente } from '../model/cliente.model';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-modal-client-details',
  templateUrl: './modal-client-details.component.html',
  styleUrls: ['./modal-client-details.component.scss'],
})
export class ModalClientDetailsComponent implements OnInit {
  @Input() cliente!: Cliente;

  constructor(
    private modalCtrl: ModalController,
    private service: ClienteService
  ) {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  ngOnInit() {}

  edit(id: number) {
    // redirecionar para a página de cadastro informando o ID do nosso cliente
  }

  delete(id: number) {
    this.service.deleteCliente(id).subscribe({
      next: () => {
        this.modalCtrl.dismiss(null, 'cancel');
      },
      error: () => {
        console.error(console.error);
      },
    });
  }
}
