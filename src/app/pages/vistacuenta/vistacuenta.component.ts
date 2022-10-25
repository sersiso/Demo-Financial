import { Component, OnInit } from '@angular/core';
import { InfoService } from 'src/app/services/info.service';
import { VariablesService } from 'src/app/services/variables.service';

@Component({
  selector: 'app-vistacuenta',
  templateUrl: './vistacuenta.component.html',
  styleUrls: ['./vistacuenta.component.css']
})
export class VistacuentaComponent implements OnInit {

  recuperarIdUrl:string;
  movimientoCuenta = [];
  colorCifra = '#5f9ea0';
  moneda:any;

  constructor( protected _VARIABLES: VariablesService,
              private _DATOS: InfoService ) { 

    this.recuperarIdUrl = this._VARIABLES.idCuentaVisualizar;
    this.movimientoCuenta = _DATOS.buscarCuentaId( this.recuperarIdUrl );
    console.log(this.movimientoCuenta);
    
   }

  ngOnInit(): void {
    this.monedaUsada();
  }

  monedaUsada(){
    this.moneda = this._DATOS.getMoneda();
    console.log(this.moneda);
  }

  cerrarModal( termino:boolean ){
    this._VARIABLES.abrirModalVistaCuenta = termino;
  }

}
