import {Injectable} from "@angular/core";
import {Box} from "./Interface";

@Injectable({
  providedIn: 'root'
})
export class MyService{
  boxes: Box[] = [];
}
