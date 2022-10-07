import { Component, OnInit } from '@angular/core';
import { InfoService } from 'src/app/services/info.service';

@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.css']
})
export class CuentasComponent implements OnInit {
  
  infoCuentas:any = [];
  cuentaBuscador:any = [];
  buscadorActivo:boolean = false;
  moneda:any;
  estado:string = '';
  colores = this._datos.colores;
  negativo = false;
  colorPositivo:string = this.colores.verde;

  constructor( private _datos: InfoService ) { }

  ngOnInit(): void {

    this.cuentas();
    this.monedaUsada();
    this.recibirMovimientos();

  }

  buscar( texto:string ){
    this.buscadorActivo = true;
    this.cuentaBuscador = this._datos.buscarCuenta( texto );
  }

  cuentas(){
    this.infoCuentas = this._datos.getInfoCuentas();
  }

  monedaUsada(){
    this.moneda = this._datos.getMoneda();
  }

  recibirMovimientos(){
    if ( this.infoCuentas.length >=4 ){
      this.estado = 'none';
    } else {
      this.estado = 'block';
    }

    if ( this.cuentaBuscador.length <=4 ){
      this.estado = 'block';
    } else {
      this.estado = 'none';
    }
    
  }

  





}