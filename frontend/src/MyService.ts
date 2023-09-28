import {Injectable} from "@angular/core";
import {box} from "./Interface";

@Injectable({
  providedIn: 'root'
})
export class MyService{
  boxes: box[] = [];
}
