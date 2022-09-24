import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { empresaModel } from 'src/app/models/empresa.models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  datosEmpresa:empresaModel;
  currentRoute: string;

  constructor( public auth: LoginService, 
              private router: Router) { }

  ngOnInit(): void {

    this.datosEmpresa = this.auth.getEmpresa();
    
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
