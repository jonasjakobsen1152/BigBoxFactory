import { Component} from '@angular/core';
import {Box} from "../../Interface";
import {firstValueFrom} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {MyService} from "../../MyService";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {search} from "ionicons/icons";

@Component({
  selector: 'app-box-window',
  template:`

    <div id="headerMargins">
      <ion-header>
        <ion-item>
          <ion-searchbar [debounce]="1000" [formControl]="searchterm" (ionInput)="searchBoxes()"></ion-searchbar>
        </ion-item>
        <ion-item>
          <ion-input data-textid="txtContent" class="txtFieldSize" [formControl]="content"
                     placeholder="Content of box"></ion-input>
          <ion-select [formControl]="size" placeholder="Size of box">
            <ion-select-option value="Small">Small</ion-select-option>
            <ion-select-option value="Medium">Medium</ion-select-option>
            <ion-select-option value="Large">Large</ion-select-option>
          </ion-select>
          <ion-button data-textid="btnCreate" (click)="createBox()" [disabled]="!content.valid" >Create a box</ion-button>
        </ion-item>
        <div *ngIf="myFormGroup.get('content')?.hasError('minlength')">
          <p style="color: yellow">Content must be at least 3 characters long.</p>
        </div>
        <div *ngIf="myFormGroup.get('content')?.hasError('maxlength')">
          <p style="color: yellow">Content cannot exceed 20 characters.</p>
        </div>
      </ion-header>
    </div>


    <ion-content [fullscreen]="true" class="ion-padding">
      <div *ngFor="let box of service.boxes">
        <ion-card style="margin-right: 15%; margin-left: 15%">
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
  content = new FormControl('', [Validators.required,
    Validators.maxLength(20),
    Validators.minLength(3)]);
  size = new FormControl('')
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
    const searchTermLower = this.searchterm.value!;

    const call = this.http.get<Box[]>('http://localhost:5000/searchBoxes?searchTerm=' + searchTermLower);

    const result = await firstValueFrom<Box[]>(call);

    this.service.boxes = result;
  }



  async updateBox(updatedBox: Box) {
    const url = `http://localhost:5000/boxes/${updatedBox.id}`;

      // Send the updatedBox as the request body
      await this.http.put(url, updatedBox).toPromise();
      // Handle success (e.g., show a success message or update UI)
      console.log('Box updated successfully');
  }


  protected readonly search = search;
  searchterm = new  FormControl("");


}
