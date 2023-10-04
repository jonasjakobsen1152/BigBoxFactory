import { Component} from '@angular/core';
import {Box} from "../../Interface";
import {firstValueFrom} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {MyService} from "../../MyService";
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-box-window',
  template:`
<ion-header> <ion-item>
  <ion-input data-textid="txtContent" class="txtFieldSize" [formControl]="content" placeholder="Content of the box"> </ion-input>
  <ion-input data-textid="txtSize" class="txtFieldSize" [formControl]="size" placeholder="The size of the box"></ion-input>
  <ion-button data-textid="btnCreate" (click)="createBox()">Create a box</ion-button>
</ion-item></ion-header>




  <ion-content [fullscreen]="true" class="ion-padding">
  <div *ngFor="let box of service.boxes">
    <ion-card>
    <ion-title>Box Id: {{box.id}}</ion-title>
    <br>
    <p style="text-align: center">Containing: {{box.content}}</p>
    <p style="text-align: center">Size: {{box.size}} </p>
      <ion-button data-textid="btnDelete" (click)="deleteBox(box)">Delete box</ion-button>
      <ion-button data-textid="btnOpenBoxWindow" (click)="navigateToBoxDetails(box)">Open box window</ion-button>
    </ion-card>
  </div>
  </ion-content>
  `,
  styleUrls: ['./box-window.component.scss'],
})
export class BoxWindowComponent {
  content = new FormControl('');
  size = new FormControl('');

  myFormGroup = new FormGroup({
    content: this.content,
    size: this.size,
  })

  constructor(private http: HttpClient, public service: MyService, private router: Router) {
    this.getBoxData();
  }

  async navigateToBoxDetails(box: Box) {
    // Use Angular's router to navigate to the box details route
    this.router.navigate(['/box', box.id]);
  }


  async getBoxData(){
    const call = this.http.get<Box[]>('http://localhost:5000/boxes')
    const result = await firstValueFrom<Box[]>(call);
    this.service.boxes = result;
  }

  async createBox(){
    if(this.myFormGroup.valid){
      const newBox = this.myFormGroup.value as Box;
      const response = await this.http.post<Box>('http://localhost:5000/boxes', newBox).toPromise();

      if (response){
        this.service.boxes.push(response);
        this.myFormGroup.reset();
      }
    }
  }

  async deleteBox(Boxes: Box){
    const call = this.http.delete('http://localhost:5000/boxes/' + Boxes.id);
    const result = await firstValueFrom(call);

    this.service.boxes = this.service.boxes.filter(a => a.id != Boxes.id)
  }

  protected readonly console = console;

  async searchBoxes() {
    const call = this.http.get('http://localhost:5000/searchBoxes/')
  }

  async updateBox(updatedBox: Box) {
    const url = `http://localhost:5000/boxes/${updatedBox.id}`;

      // Send the updatedBox as the request body
      await this.http.put(url, updatedBox).toPromise();
      // Handle success (e.g., show a success message or update UI)
      console.log('Box updated successfully');
  }


}
