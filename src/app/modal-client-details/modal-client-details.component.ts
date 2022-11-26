import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-client-details',
  templateUrl: './modal-client-details.component.html',
  styleUrls: ['./modal-client-details.component.scss'],
})
export class ModalClientDetailsComponent implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  ngOnInit() {}
}
