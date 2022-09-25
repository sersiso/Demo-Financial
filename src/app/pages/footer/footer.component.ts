import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  rutaImg:string = '../../assets/img/logo-sergio-sierra.svg';
  urlMiWeb:string = 'http://www.sergiossoto.com';

  constructor( public _SERVICE: LoginService ) { }

  ngOnInit(): void {
  }

}
