import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MyService} from "../../MyService";
import {Box} from "../../Interface";
import {firstValueFrom} from "rxjs";
import {ActivatedRoute} from "@angular/router";

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

  constructor(private http: HttpClient, public service: MyService, private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      const boxId = params['id'];
      this.getBoxData(boxId)
    });
  }

  async getBoxData(boxid: number){
    const call = this.http.get<Box[]>('http://localhost:5000/boxes/box' + boxid);
    const result = await firstValueFrom<Box[]>(call);
    this.service.boxes = result;
  }


}
