import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  template: `
    <body>
    <ion-title class="header">Welcome to the box factory</ion-title>
    </body>
  `,
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor() {}
}
