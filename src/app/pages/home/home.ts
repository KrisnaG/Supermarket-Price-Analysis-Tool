import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  logoIonic,
  pricetagOutline,
  addCircleOutline,
  createOutline,
  trendingUpOutline,
  refreshOutline,
  downloadOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-home',
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonIcon,
    IonLabel,
    RouterLink
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  constructor() {
    addIcons({
      logoIonic,
      pricetagOutline,
      addCircleOutline,
      createOutline,
      trendingUpOutline,
      refreshOutline,
      downloadOutline
    });
  }
}
