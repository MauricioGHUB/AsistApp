import { CUSTOM_ELEMENTS_SCHEMA,Component,Input } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule, IonicSlides, MenuController } from '@ionic/angular';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Tab1Page {

  @Input() slides: any[] = [];
  swiperModules = [IonicSlides];

  constructor(private router: Router,
              private menucontroller: MenuController
  ) {}
  
  ngOnInit(): void {
    this.slides = [
      { banner: 'assets/img/Event1.jpg' },
      { banner: 'assets/img/ciberseguridad.jpg' },
      { banner: 'assets/img/Event3.png' },
    ];
  }

  redirigirATab2() {
    this.router.navigate(['/tabs/tab2']);
  }

  mostrarMenu(){
    this.menucontroller.open('first');
  }
}