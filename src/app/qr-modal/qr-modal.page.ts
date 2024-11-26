import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-qr-modal',
  templateUrl: './qr-modal.page.html',
  styleUrls: ['./qr-modal.page.scss'],
})
export class QrModalPage implements OnInit {
  evento: any;
  usuario: any;
  codigoQr: string = '';


  constructor(private modalController: ModalController, private navParams: NavParams) { }

  ngOnInit() {
    this.evento = this.navParams.get('evento');
    this.usuario = this.navParams.get('usuario');
    this.codigoQr = this.navParams.get('codigoQr');
  }

  cerrarModal() {
    this.modalController.dismiss();
  }
}
