import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  rutaImg:string = 'url("../../assets/img/background-slider.jpg")';

  constructor() { }

  ngOnInit(): void {
  }

}
