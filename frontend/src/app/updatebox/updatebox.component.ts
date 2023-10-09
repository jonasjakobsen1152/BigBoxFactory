import { Component, OnInit } from '@angular/core';
import {Box} from "../../Interface";
import {HttpClient} from "@angular/common/http";
import {MyService} from "../../MyService";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {navigate} from "ionicons/icons";

@Component({
  selector: 'app-updatebox',
  template: `<div class="center-box" *ngIf="box">
    <p>Box Id: {{ box.id }}</p>
    <ion-input id = "content" class="txtFieldSize" [formControl]="content"  placeholder="{{box.content}}"> Content </ion-input>
    <ion-input id = "size" class="txtFieldSize" [formControl]="size"  placeholder="{{box.size}}">Size</ion-input>
    <ion-button id="save-button" (click)="updateBox()">Save</ion-button>
    <ion-button id="cancel-button" (click) = "navigateToBoxDetails()">Cancel</ion-button>

  </div>`,
  styleUrls: ['./updatebox.component.scss'],
})
export class UpdateboxComponent {
  box: Box | undefined;

  content = new FormControl('');
  size = new FormControl('');

  myFormGroup = new FormGroup({
    content: this.content,
    size: this.size,
  })

  constructor(private http: HttpClient, public service: MyService, private route: ActivatedRoute, private router: Router)
  {
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

  async updateBox() {
    if(this.myFormGroup.valid) {
      const newBox = this.myFormGroup.value as Box;
      const response = await this.http.put<Box>(`http://localhost:5000/boxes/${this.box?.id}`, newBox).toPromise();

      if (response){
        this.service.boxes.push(response);
        this.myFormGroup.reset();
        this.navigateToBoxDetails()
      }
    }
  }

  async navigateToBoxDetails() {
    // Use Angular's router to navigate to the box details route
    this.router.navigate(['/box', this.box?.id]);
  }


}
