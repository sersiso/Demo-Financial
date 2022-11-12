import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  rutaImg:string = '../../assets/img/background-slider.jpg';
  rutaImgMovil:string = '../../assets/img/background-slider-m.jpg';
  movil:boolean = false;
  screenSize:string = '710';

  constructor( public breakpointObserver: BreakpointObserver ) {

    this.sizeScreen();

   }

  ngOnInit(): void {
  }


  sizeScreen(){
    this.breakpointObserver
    .observe( [`(max-width: ${ this.screenSize }px)`] )
    .subscribe( ( state:BreakpointState )=>{
      if ( state.matches ){
        this.movil = true;
      } else {
        this.movil = false;
      }
    });
  }

}
