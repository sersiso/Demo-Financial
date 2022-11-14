import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { empresaModel } from 'src/app/models/empresa.models';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  datosEmpresa:empresaModel;
  currentRoute: string;
  imgLogo:string = '../../assets/img/logo-financial-demo.svg';
  empezar:boolean = false;
  screenSize:string = '710';

  constructor( public auth: LoginService, 
              private router: Router,
              public breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {

    this.datosEmpresa = this.auth.getEmpresa();
    this.sizeScreen();

  }

  sizeScreen(){
    this.breakpointObserver
    .observe( [`(max-width: ${ this.screenSize }px)`] )
    .subscribe( ( state:BreakpointState )=>{
      if ( state.matches ){
        this.empezar = false;
      } else {
        setTimeout( ()=> this.empezar = true, 5000 );
      }
    });
  }

  noDisponible(){
    Swal.fire({
      icon: 'info',
      text: '¡Ops! Esta opción todavía no está disponible',
      showConfirmButton: true
      })
  }

  salir(){

    Swal.fire({
      text: 'Saliendo, ¡Gracias por visitarla!',
      timer: 2000
      }).then ( () => {
        this.auth.logOut();
        this.router.navigateByUrl('/inicio');
      });
      Swal.showLoading();
        
  };

}
