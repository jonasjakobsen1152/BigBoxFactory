import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MyService} from "../../MyService";
import {Box} from "../../Interface";
import {firstValueFrom} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-boxdetails',
  template: `
    <div class="center-box" *ngIf="box">
      <p>Box Id: {{ box.id }}</p>
      <p>Content: {{ box.content }}</p>
      <p>Size: {{ box.size }}</p>
      <ion-button id="left-button" (click)="navigateToBoxUpdate(box)">Edit this box</ion-button>
      <ion-button id="right-button" (click)="deleteThisBox()" >Delete this box</ion-button>

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

  async navigateToBoxUpdate(box: Box) {
    // Use Angular's router to navigate to the box details route
    this.router.navigate(['/updatebox', box.id]);
  }

  async deleteThisBox(){
    const call = this.http.delete('http://localhost:5000/boxes/' + this.box?.id);
    const result = await firstValueFrom(call);

    this.service.boxes = this.service.boxes.filter(a => a.id != this.box?.id)
    this.navigateToBoxWindow()
  }

  async navigateToBoxWindow() {
    this.router.navigate(['box-window']); // Navigate to 'box-window'
  }


}
