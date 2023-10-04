import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  template: `
    <body>
    <div>
    <ion-title class="header">Welcome to the box factory</ion-title>

      <ion-tabs>
        <ion-tab-bar slot="bottom">
          <ion-tab-button (click)="openHomePage()"> <ion-icon icon="home"></ion-icon> </ion-tab-button>

        <ion-tab-button (click)="openBoxWindow()"><p style="font-size: 25px; font-family: 'Concert One', serif">Box Window</p></ion-tab-button>
      </ion-tab-bar>
      </ion-tabs>
    </div>
    </body>
  `,
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private router: Router) {}

  openBoxWindow() {
    this.router.navigate(['box-window']); // Navigate to 'box-window'
  }
  openHomePage(){
    this.router.navigate(['home'])
  }

}
