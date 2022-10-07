import { Pipe, PipeTransform } from '@angular/core';
import { InfoService } from '../services/info.service';

@Pipe({
  name: 'tipoMovimiento'
})
export class TipoMovimientoPipe implements PipeTransform {

  constructor( private _datos: InfoService ){ }

  public transform(value: any) {
    let id = this._datos.textoTipo( value );
    return id;
  }

}
