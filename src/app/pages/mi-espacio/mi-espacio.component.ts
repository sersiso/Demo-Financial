import { Component, OnInit } from '@angular/core';
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
  movimientos:Movimientos[] = [];

  activo:number = 0;
  deuda:number = 0;
  balance:number = 0;

  colorActivo:string = this.colores.rojo;
  colorDeuda:string = this.colores.verde;
  colorBalance:string = this.colores.verde;

  constructor( private _datos:InfoService ) { 
    this.cantidad();
    this.seleccionarColor();
  }

  ngOnInit(): void { 
    this.recibirMoneda();
    this.recibirMovimientos();
  }

  recibirMovimientos(){
    this.movimientos = this._datos.getInfoMovimientos();
    console.log(this.movimientos);
  }

  cantidad(){
    let recibirData = [];
    let guardarData = [];
      recibirData = this._datos.getInfoCuentas();
      recibirData.forEach( resp => {
        guardarData.push(Number.parseFloat(resp.saldo));
      });
        this.activo = parseFloat(this.sumarArrayPositivos(guardarData).toFixed(2));
        this.deuda = parseFloat(this.sumarArrayNegativos(guardarData).toFixed(2));
        this.balance = parseFloat(this.sumarArray(guardarData).toFixed(2));

  }
  
  sumarArray( arrayNumeros ) {
    let suma = 0;
      arrayNumeros.forEach(function(numero){
            suma += numero;
        });
        return suma;
  }

  sumarArrayPositivos( arrayNumeros ) {
    let suma = 0;
    const filtradoDeNumeros = arrayNumeros.filter((valor)=> valor > 0);
      filtradoDeNumeros.forEach(function(numero){
            suma += numero;
        });
        return suma;
  }

  sumarArrayNegativos( arrayNumeros ) {
    let suma = 0;
    const filtradoDeNumeros = arrayNumeros.filter((valor)=> valor < 0);
      filtradoDeNumeros.forEach(function(numero){
            suma += numero;
        });
        return suma;
  }

  borrarFila( id:string ){
    
    console.log(id);
  }

  recibirMoneda(){
    this.moneda = this._datos.getMoneda().simboloMoneda;
  }
  
  seleccionarColor(){

    if ( this.activo >= 0) { 
      this.colorActivo = this.colores.verde; 
    } else { 
      this.colores.rojo 
    } 

    if ( this.deuda < 0 ) { 
      this.colorDeuda = this.colores.rojo; 
    } else { 
      this.colores.verde 
    } 

    if ( this.balance >= 0 ) {
       this.colorBalance = this.colores.verde; 
    } else { 
      this.colores.rojo 
    }

  }

}

export interface colores {
  verde: string,
  rojo: string,
  blanco: string
}
