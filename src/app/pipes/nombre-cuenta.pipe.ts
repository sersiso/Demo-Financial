import { Pipe, PipeTransform } from '@angular/core';
import { InfoService } from '../services/info.service';

@Pipe({
  name: 'nombreCuenta'
})
export class NombreCuentaPipe implements PipeTransform {

  constructor( private _DATOS: InfoService ){ }

  public transform(value: any) {
    let nombreCuenta = this.nombreCuenta( value );
    return nombreCuenta;
  }

  nombreCuenta( id ){
    let indice = this._DATOS.getInfoCuentasAll().findIndex( i => i.id === id);
    let nombre = this._DATOS.getInfoCuentasAll()[indice].nombreCuenta;
    return nombre;
  }

}
