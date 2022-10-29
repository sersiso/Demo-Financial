import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
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

  terminoBuscado:string = '';

  buscar( texto:string ){
    this.terminoBuscado = texto;
    this.buscadorActivo = true;
    this.cuentaBuscador = this._DATOS.buscarCuenta( texto );
  }

  actualizar() {
    this.buscar( this.terminoBuscado );
  }

  eliminarCuenta( id:string ){

    const cuentas = this._DATOS.getInfoCuentasAll();
    const indice = cuentas.findIndex( i => i.id === id );
    const longitud = cuentas[indice].debe.length;

    if ( cuentas[indice].saldo != '0.00' || longitud >1 ) {
      Swal.fire({
        icon: 'warning',
        title: 'No se puede eliminar',
        text: 'Debe tener saldo 0.00 y sin movimientos',
        showConfirmButton: true,
        });
        
    } 
    else if ( cuentas[indice].saldo === '0.00' && longitud === 1 ){
      Swal.fire({
        icon: 'question',
        title: 'Eliminar cuenta',
        text: '¿Deseas borrar la cuenta?',
        showConfirmButton: true,
        showCancelButton: true,
        }).then ( resp => {
          if ( resp.value ){
            cuentas.splice(indice,1);
          }
        });
    }

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

  abrirModalVistaCuenta:boolean = this._VARIABLES.abrirModalVistaCuenta;
  AbrirModalVistaCuenta( termino:boolean, id:string ){
    this._VARIABLES.abrirModalVistaCuenta = termino;
    this.abrirModalVistaCuenta = this._VARIABLES.abrirModalVistaCuenta;
    this._VARIABLES.idCuentaVisualizar = id;
  }

}
