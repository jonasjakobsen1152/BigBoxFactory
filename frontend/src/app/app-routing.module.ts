import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './home/home.page'; // Adjust the import path as per your file structure
import { BoxWindowComponent } from './box-window/box-window.component';
import {BoxdetailsComponent} from "./boxdetails/boxdetails.component"; // Adjust the import path as per your file structure

const routes: Routes = [
  {
    path: 'home',
    component: HomePage, // Directly reference the component
  },
  {
    path: 'box-window',
    component: BoxWindowComponent, // Directly reference the component
  },
  {
    path: 'box/:id',
    component: BoxdetailsComponent },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
