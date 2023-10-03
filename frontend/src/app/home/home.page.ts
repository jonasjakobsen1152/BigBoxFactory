import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  template: `
    <div>
      <ion-title> Welcome to the Monkeys beloved Box Factory </ion-title>
      <ion-button (click)="openBoxWindow()"> Create a Box </ion-button>
    </div>
  `,
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private router: Router) {}

  openBoxWindow() {
    this.router.navigate(['box-window']); // Navigate to 'box-window'
  }
}
