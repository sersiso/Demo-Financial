import { Pipe, PipeTransform } from '@angular/core';
import { InfoService } from '../services/info.service';

@Pipe({
  name: 'meses'
})
export class MesesPipe implements PipeTransform {

  constructor( ){ }

  public transform(value: string) {
    const mes = this.getMesNombre( value );
    return mes;
  }

  getMesNombre( termino:string ){
    if ( termino === '01' ) return 'Enero';
    else if ( termino === '02' ) return 'Febrero';
    else if ( termino === '03' ) return 'Marzo';
    else if ( termino === '04' ) return 'Abril';
    else if ( termino === '05' ) return 'Mayo';
    else if ( termino === '06' ) return 'Junio';
    else if ( termino === '07' ) return 'Julio';
    else if ( termino === '08' ) return 'Agosto';
    else if ( termino === '09' ) return 'Septiembre';
    else if ( termino === '10' ) return 'Octubre';
    else if ( termino === '11' ) return 'Noviembre';
    else return 'Diciembre';
  }

}
