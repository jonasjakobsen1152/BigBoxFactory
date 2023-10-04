import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MyService} from "../../MyService";
import {Box} from "../../Interface";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-boxdetails',
  template: `
    <div>
      <ion-title>Box Id: </ion-title>

    </div>
  `,
  styleUrls: ['./boxdetails.component.scss'],
})
export class BoxdetailsComponent {

  constructor(private http: HttpClient, public service: MyService) {
    //this.getBoxData();
  }

  async getBoxData(Box: Box){
    const call = this.http.get<Box[]>('http://localhost:5000/boxes/boxdetails' + Box.id)
    const result = await firstValueFrom<Box[]>(call);
    this.service.boxes = result;
  }


}
