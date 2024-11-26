import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { register } from 'swiper/element/bundle';

register();

interface Menu {
  icon: string;
  name: string;
  redirecTo: string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  menu: Menu[] = [
    { icon: 'person-outline', name: 'Mi perfil', redirecTo: '/perfil' },
    { icon: 'calendar-number-outline', name: 'Eventos registrados', redirecTo: '/eventos-registrados' },
  ];

  constructor(private router: Router, private menuCtrl: MenuController) {}

  exitSess() {
    this.menuCtrl.close('first'); 
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('nombre');
    sessionStorage.removeItem('password');
    sessionStorage.removeItem('ingresado');

    this.router.navigate(['login']);
  }
}
