import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private service: ClienteService,
    private router: Router
  ) {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  ngOnInit() {}

  edit(id: number) {
    this.router.navigate(['/tabs/editar', id]);
    this.modalCtrl.dismiss(null, 'cancel');
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
