import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

  correo:String="";

  constructor(private alertcontroller:AlertController,
              private router:Router) { }

  ngOnInit() {
  }

  async codeEnv(){
    const alert = await this.alertcontroller.create({
      header: 'Enviado!',
      mode:'ios',
      message:'Código enviado exitosamente a '+this.correo,
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.router.navigate(['/comienzo']);
          },
        },
      ],
    });

    await alert.present();
  }

  irAComienzo(){
    this.router.navigate(['/comienzo']);
  }
}
