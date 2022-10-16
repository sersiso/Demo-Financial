import { Component, OnInit } from '@angular/core';
import { InfoService } from '../../services/info.service';
import { VariablesService } from '../../services/variables.service';

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
  colores = this._DATOS.colores;
  negativo = false;
  colorPositivo:string = this.colores.verde;

  constructor( protected _DATOS: InfoService, public _VARIABLES: VariablesService ) { }

  ngOnInit(): void {

    this.cuentas();
    this.monedaUsada();

  }

  buscar( texto:string ){
    this.buscadorActivo = true;
    this.cuentaBuscador = this._DATOS.buscarCuenta( texto );
  }

  cuentas(){
    let cuentas = this._DATOS.getInfoCuentas();
    cuentas.forEach( resp => {
      if ( resp.tipo.codigo !== this._DATOS.nombreCodigos().cr  ){
        this.infoCuentas.push(resp);
      }
    });
  }

  monedaUsada(){
    this.moneda = this._DATOS.getMoneda();
  }

  cerrarModal( termino:boolean ){
    this._VARIABLES.abrirModalCuentas = termino;
  }

  abrirModalModificarCuenta:boolean = this._VARIABLES.abrirModalModificarCuenta;

  AbrirModalModificarCuenta( termino:boolean, id:string ){
    this._VARIABLES.abrirModalModificarCuenta = termino;
    this.abrirModalModificarCuenta = this._VARIABLES.abrirModalModificarCuenta;
    this._VARIABLES.idCuentaModificar = id;
  }

  





}
