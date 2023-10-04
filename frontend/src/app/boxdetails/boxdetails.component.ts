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
      <ion-title>Box Id: {{ box?.id }} </ion-title>
      <p>Content: {{ box?.content }}</p>
      <p>Size: {{ box?.size }}</p>
    </div>
  `,
  styleUrls: ['./boxdetails.component.scss'],
})
export class BoxdetailsComponent {
  box: Box | undefined;

  constructor(private http: HttpClient, public service: MyService, private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      const boxId = params['id']; // Get the 'id' parameter from the route
      this.http.get<Box>(`http://localhost:5000/boxes/${boxId}`).toPromise()
        .then(
          (response) => {
            this.box = response;
          },
          (error) => {
            console.error('Error fetching box details:', error);
          }
        );
    });
  }

  async getBoxData(boxid: number){
    const call = this.http.get<Box>('http://localhost:5000/boxes/box' + boxid);
    const result = await firstValueFrom<Box>(call);
    this.service.box = result;
  }


}
