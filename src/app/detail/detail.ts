import { Component } from '@angular/core';
import { IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-detail',
  imports: [
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle
  ],
  templateUrl: './detail.html',
  styleUrl: './detail.scss'
})
export class Detail {

}
