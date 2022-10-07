import { Pipe, PipeTransform } from '@angular/core';
import { InfoService } from '../services/info.service';

@Pipe({
  name: 'idtexto'
})
export class IdtextoPipe implements PipeTransform {

  constructor( private _datos: InfoService ){ }

  public transform(value: any) {
    let id = this._datos.textoIdCuenta( value );
    return id;
  }

}
