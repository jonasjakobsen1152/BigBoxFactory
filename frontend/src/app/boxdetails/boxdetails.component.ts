import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MyService} from "../../MyService";
import {Box} from "../../Interface";
import {firstValueFrom} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-boxdetails',
  template: `
    <div class="center-box">
      <p>Box Id: {{ box?.id }}</p>
      <p>Content: {{ box?.content }}</p>
      <p>Size: {{ box?.size }}</p>
      <ion-button id="left-button" >Edit this box</ion-button>
      <ion-button id="right-button" (click)="openInputBox()">Delete this box</ion-button>

    </div>
  `,
  styleUrls: ['./boxdetails.component.scss'],
})
export class BoxdetailsComponent {
  box: Box | undefined;

  constructor(private http: HttpClient, public service: MyService, private route: ActivatedRoute, private router: Router) {
    this.getBoxData()
  }




  async getBoxData(){
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
  async updateBox(updatedBox: Box) {
    const url = `http://localhost:5000/boxes/${updatedBox.id}`;

    // Send the updatedBox as the request body
    await this.http.put(url, updatedBox).toPromise();
    // Handle success (e.g., show a success message or update UI)
    console.log('Box updated successfully');
  }


}
