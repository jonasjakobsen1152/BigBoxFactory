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
        <ion-tab-button (click)="openBoxWindow()"> Create a Box </ion-tab-button>
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

}
