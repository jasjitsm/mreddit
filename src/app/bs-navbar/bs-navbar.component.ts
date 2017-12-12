import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss']
})

export class BsNavbarComponent{
  
  // isMobile: boolean;

  constructor() {
    // this.isMobile=this.fnIsMobile();
  }

  // fnIsMobile(): boolean{
  //   if(window.innerWidth<768) return true;
  // }

  //Show full logo or smaller icon in navbar based on screen width
  // @HostListener('window:resize')
  // onResize(event) {
  //   this.isMobile=this.fnIsMobile();
  //   console.log("Resized");
  // }
}
