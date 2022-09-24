import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { usuarioModel } from 'src/app/models/user.models';
import { HeaderComponent } from '../header/header.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: FormGroup;
  usuarioRecibido: usuarioModel;
  token:string;

  constructor( private fb:FormBuilder, 
                private router: Router, 
                private _LOGIN: LoginService ) { 

      this.crearFormulario();
      this.leerToken();
   }

  ngOnInit(): void {
  }

  crearFormulario(){
    this.login = this.fb.group({
      login: [{ value: 'admin', disabled: false }, [Validators.required, Validators.maxLength(15)] ],
      password: [{value: 'contabilidad', disabled: false}, Validators.required]
    })
  }

  get usuarioValido(){
    return this.login.get('login').invalid && this.login.get('login').touched;
  }

  get passwordValido(){
    return this.login.get('password').invalid && this.login.get('password').touched;
  }


  entrar(){

    if ( this.login.invalid ){
      return Object.values( this.login.controls ).forEach( control => {
        control.markAsTouched();
      })
    }

    if ( this.login.value.login === this._LOGIN.recogerUsuario().user &&
        this.login.value.password === this._LOGIN.recogerUsuario().password ) {

        this.token = this._LOGIN.recogerUsuario().token;

        Swal.fire({
        text: 'Iniciando sesión, espere...',
        timer: 2000
        }).then ( resp => {
          this.guardarToken(this.token);
          this.router.navigateByUrl('mi-espacio');
        });
        Swal.showLoading();
      
    } else {

      Swal.fire({
        text: 'El usuario o la contraseña son incorrectos',
        icon: 'error'
      });

    }

  }

  guardarToken( idToken: string ){
    localStorage.setItem('tokenPrueba[AplicacionContabilidad]', idToken);
  }

  leerToken(){
    if ( localStorage.getItem('tokenPrueba[AplicacionContabilidad]') ){
      this.token = localStorage.getItem('tokenPrueba[AplicacionContabilidad]');
      this.router.navigateByUrl('inicio');
    } else {
      this.token = '';
    }
  }



}
