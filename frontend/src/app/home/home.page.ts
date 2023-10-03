import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MyService} from "../../MyService";
import {Box} from "../../Interface";
import {firstValueFrom} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-home',
  template:`
  <div>
    <ion-title> Welcome to the Monkeys beloved Box Factory </ion-title>

  </div>
  `,
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  constructor(private http: HttpClient, public service: MyService) {

  }


}
