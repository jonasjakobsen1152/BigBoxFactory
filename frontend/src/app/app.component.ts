import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
    constructor(private router: Router) {}

  openBoxWindow() {
    this.router.navigate(['box-window']); // Navigate to 'box-window'
  }
  openHomePage(){
    this.router.navigate(['home'])
  }
}
