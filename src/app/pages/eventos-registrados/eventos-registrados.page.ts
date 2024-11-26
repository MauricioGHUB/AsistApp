import { Component, OnInit } from '@angular/core';
import { EventosService } from '../../services/eventos.service';
import { AlertController } from '@ionic/angular';
import { IEvent } from 'src/interfaces/ItEvent';

@Component({
  selector: 'app-eventos-registrados',
  templateUrl: './eventos-registrados.page.html',
  styleUrls: ['./eventos-registrados.page.scss']
})
export class EventosRegistradosPage implements OnInit {
  eventosRegistrados: IEvent[] = [];

  constructor(
    private eventosService: EventosService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.eventosRegistrados = this.eventosService.getEventosRegistrados();
  }

  async confirmarEliminar(evento: IEvent) {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: `¿Estás seguro de que deseas eliminar tu participación en este evento?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.eliminarEvento(+evento.id);
          }
        }
      ]
    });

    await alert.present();
  }

  eliminarEvento(eventoId: number) {
    this.eventosService.eliminarEvento(eventoId);
    this.eventosRegistrados = this.eventosService.getEventosRegistrados();
  }
}

