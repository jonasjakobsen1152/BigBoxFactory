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
    <ion-item class="ion-margin">
    <ion-input data-textid="txtContent" class="txtFieldSize" [formControl]="content" placeholder="Content of the box"> </ion-input>
      <ion-input data-textid="txtSize" class="txtFieldSize" [formControl]="size" placeholder="The size of the box"></ion-input>
      <ion-button data-textid="btnCreate" (click)="createBox()">Create a box</ion-button>
    </ion-item>
  </div>

  <div *ngFor="let box of service.boxes">
    <ion-card (click)="deleteBox(box)"> </ion-card>
    <ion-title>Box Id: {{box.Id}}</ion-title>
    <br>
    <p style="text-align: center">Containing: {{box.BoxContent}}</p>
    <p style="text-align: center">Size: {{box.BoxSize}} </p>
  </div>
  `,
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  content = new FormControl('');
  size = new FormControl('');

  myFormGroup = new FormGroup({
    content: this.content,
    size: this.size,
  })

  constructor(private http: HttpClient, public service: MyService) {
    this.getBoxData();
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
    const call = this.http.delete('http://localhost:5000/boxes' + Boxes.Id);
    const result = await firstValueFrom(call);

    this.service.boxes = this.service.boxes.filter(a => a.Id != Boxes.Id)
  }
}
