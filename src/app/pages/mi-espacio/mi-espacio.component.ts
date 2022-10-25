import { Component, Input, OnInit } from '@angular/core';
import { VariablesService } from 'src/app/services/variables.service';
import { Movimientos } from '../../models/movimientos.models';
import { InfoService } from '../../services/info.service';

@Component({
  selector: 'app-mi-espacio',
  templateUrl: './mi-espacio.component.html',
  styleUrls: ['./mi-espacio.component.css']
})
export class MiEspacioComponent implements OnInit {

  colores:colores = {
    verde: '#5f9ea0',
    rojo: '#ff7f50',
    blanco: '#fff'
  }

  moneda:string;
  estado:string = 'block';

  activo:number = 0;
  disponible:number = 0;
  deuda:number = 0;
  balance:number = 0;

  colorActivo:string = this.colores.verde;
  colorDisponible:string = this.colores.verde;
  colorDeuda:string = this.colores.verde;
  colorBalance:string = this.colores.verde;


  constructor( protected _DATOS:InfoService,
              public _VARIABLES:VariablesService ) { 

    this.activo = this._DATOS.mostrarActivo();
    this.disponible = this._DATOS.mostrarDisponible();
    this.deuda = this._DATOS.mostrarDeuda();
    this.balance = this._DATOS.mostrarSaldo();
    
  }

  ngOnInit(): void { 

    this.seleccionarColor();
    this.recibirMoneda();

    console.log("MOVIMIENTOS:");
    console.log(this._DATOS.getInfoMovimientos());

    console.log("CUENTAS:");
    console.log(this._DATOS.getInfoCuentas());

  }

  abrirModalCuenta:boolean = this._VARIABLES.abrirModalCuenta;
  abrirModalAsiento:boolean = this._VARIABLES.abrirModalAsiento;
  abrirModalModificarAsiento:boolean = this._VARIABLES.abrirModalAsiento;
  abrirModalCuentas:boolean = this._VARIABLES.abrirModalCuentas;

  AbrirModalCuenta( termino:boolean ){
    this._VARIABLES.abrirModalCuenta = termino;
    this.abrirModalCuenta = this._VARIABLES.abrirModalCuenta;
  }

  AbrirModalAsiento( termino:boolean ){
    this._VARIABLES.abrirModalAsiento = termino;
    this.abrirModalAsiento = this._VARIABLES.abrirModalAsiento;
  }

  AbrirModalModificarAsiento( termino:boolean, id:string ){
    this._VARIABLES.idAsientoVisualizar = id;
    this._VARIABLES.abrirModalModificarAsiento = termino;
    this.abrirModalModificarAsiento = this._VARIABLES.abrirModalModificarAsiento;
  }

  AbrirModalCuentas( termino:boolean ){
    this._VARIABLES.abrirModalCuentas = termino;
    this.abrirModalCuentas = this._VARIABLES.abrirModalCuentas;
  }

  borrarFila( id:string ){
    console.log(id);
  }

  recibirMoneda(){
    this.moneda = this._DATOS.getMoneda().simboloMoneda;
  }
  
  seleccionarColor(){

    if ( this.activo >= 0 ) { 
      this.colorActivo = this.colores.verde; 
    } else {
      this.colorActivo = this.colores.rojo;
    }
    
    if ( this.disponible >= 0 ) { 
      this.colorDisponible = this.colores.verde; 
    } else {
      this.colorDisponible = this.colores.rojo;
    }

    if ( this.deuda >= 0 ) { 
      this.colorDeuda = this.colores.rojo; 
    } else {
      this.colorDeuda = this.colores.verde;
    }

    if ( this.balance >= 0 ) { 
      this.colorBalance = this.colores.verde; 
    } else {
      this.colorBalance = this.colores.rojo;
    }

  }

}

export interface colores {
  verde: string,
  rojo: string,
  blanco: string
}
