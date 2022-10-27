import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VariablesService } from '../../services/variables.service';
import { InfoService } from '../../services/info.service';
import Swal from 'sweetalert2';

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

  modalBusqueda:boolean = false;
  abrirAsiento:boolean = false;
  abrirTiempo:boolean = false;
  abrirFecha:boolean = false;

  busqueda: FormGroup;
  movimientoBuscado:any[] = [];
  buscador:boolean = false;

  fechas
  meses:string[] = ['01','02','03','04','05','06','07','08','09','10','11','12'];
  dias:any[] = [];
  mesesNombres:any[] = this._DATOS.getMesesNombres();
  anyo = this._DATOS.getAnyo();


  constructor( protected _DATOS:InfoService,
              public _VARIABLES:VariablesService,
              private fb:FormBuilder ) { 

    this.activo = this._DATOS.mostrarActivo();
    this.disponible = this._DATOS.mostrarDisponible();
    this.deuda = this._DATOS.mostrarDeuda();
    this.balance = this._DATOS.mostrarSaldo();
    this.crearFormulario();
    
  }

  ngOnInit(): void { 

    this.seleccionarColor();
    this.recibirMoneda();

    for ( let d = 1; d < 32; d++ ){
      this.dias.push(this._DATOS.zeroFill(d,2));
    }

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

  AbrirModalModificarAsiento( termino:boolean, id:string, tipo:string ){
    if ( tipo === '7' ){
      Swal.fire({
        icon: 'info',
        text: 'No se puede modificar un asiento de apertura',
        showConfirmButton: true,
        });
    } else {
      this._VARIABLES.idAsientoVisualizar = id;
      this._VARIABLES.abrirModalModificarAsiento = termino;
      this.abrirModalModificarAsiento = this._VARIABLES.abrirModalModificarAsiento;
    }
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

  //formulario de busqueda
  crearFormulario(){
    this.busqueda = this.fb.group({
      asiento: ['', [ Validators.pattern('[0-9]+'), Validators.minLength(1), Validators.maxLength(4) ]],
      tiempo: [''],
      dia: [''],
      mes: [''],
      anyo: [''],
    });
  }


  //Búsqueda
  AbrirModalBusqueda( condicion:boolean ){
      this.modalBusqueda = condicion;
      this.busqueda.controls['asiento'].reset('');
      this.busqueda.controls['tiempo'].reset('');
      this.busqueda.controls['dia'].reset('');
      this.busqueda.controls['mes'].reset('');
      this.busqueda.controls['anyo'].reset('');
  }

  cerrarModal( condicion:boolean ){
    this.modalBusqueda = condicion;
    this.abrirAsiento = false;
    this.abrirTiempo = false;
    this.abrirFecha = false;
    this.busqueda.reset('');
  }

  busquedaAsiento(){
    this.abrirAsiento = true;
    this.abrirTiempo = false;
    this.abrirFecha = false;
    this.busqueda.controls['tiempo'].reset('');
    this.busqueda.controls['dia'].reset('');
    this.busqueda.controls['mes'].reset('');
    this.busqueda.controls['anyo'].reset('');
  }

  busquedaTiempo(){
    this.abrirTiempo = true;
    this.abrirAsiento = false;
    this.abrirFecha = false;
    this.busqueda.controls['asiento'].reset('');
    this.busqueda.controls['dia'].reset('');
    this.busqueda.controls['mes'].reset('');
    this.busqueda.controls['anyo'].reset('');
  }

  busquedaFecha(){
    this.abrirTiempo = false;
    this.abrirAsiento = false;
    this.abrirFecha = true;
    this.busqueda.controls['asiento'].reset('');
    this.busqueda.controls['tiempo'].reset('');
  }

  recibirAnyo(){
    return this._DATOS.getAnyo();
  }

  buscar(){
    //Validación al pulsar el botón de guardar
    if ( this.busqueda.invalid ) {
      return Object.values( this.busqueda.controls ).forEach( control =>{
        control.markAllAsTouched();
      });
    }

    const data = this.busqueda.getRawValue();
    console.log(data);
    

    if ( data.asiento != '' ){
      const asiento = 1;
      this.buscarAsiento( data.asiento, asiento );
    } 
    else if ( data.tiempo != '' ){
      const tiempo = 2;
      this.buscarAsiento( data.tiempo, tiempo );
    } 
    else if ( data.dia !='' && data.mes !='' && data.anyo !='' ){
      const fecha = 3;
      let fechaCorrecta = {
        dia: data.dia,
        mes: data.mes,
        anyo: data.anyo.toString()
      }
      
      this.buscarAsiento( fechaCorrecta , fecha );
      
    }
  }

  buscarAsiento( info:any , tipo:number ){
    this.movimientoBuscado = [];
    const movimientos = this._DATOS.getInfoMovimientos();

  if ( tipo === 1 ){

      movimientos.forEach(resp => {
        if ( resp.asiento === info ){
          this.movimientoBuscado.push(resp);

          Swal.fire({
            text: 'Buscando',
            timer: 500,
            showConfirmButton: false,
          }).then( ()=>{
            this.buscador = true;
            this.cerrarModal( false );
          });
          Swal.showLoading();
        } 
      });

      if ( this.movimientoBuscado.length < 1 ){
        Swal.fire({
          icon: 'info',
          text: 'No existe ese asiento',
          showConfirmButton: true,
          }).then( ()=>{
            this.buscador = false;
          });
      }
    } 

  else if ( tipo === 2 ) {
      movimientos.forEach(resp => {
        if ( resp.mes === info ){
          this.movimientoBuscado.push(resp);

          Swal.fire({
            text: 'Buscando',
            timer: 500,
            showConfirmButton: false,
          }).then( ()=>{
            this.buscador = true;
            this.cerrarModal( false );
          });
          Swal.showLoading();
        } 
      });

      if ( this.movimientoBuscado.length < 1 ){
        Swal.fire({
          icon: 'info',
          text: 'No existen movimientos en este mes',
          showConfirmButton: true,
          }).then( ()=>{
            this.buscador = false;
          });
      }

    }

  else if ( tipo === 3 ){
      movimientos.forEach(resp => {
        if ( resp.dia === info.dia && resp.mes === info.mes && resp.anyo === info.anyo ){

          this.movimientoBuscado.push(resp);

          Swal.fire({
            text: 'Buscando',
            timer: 500,
            showConfirmButton: false,
          }).then( ()=>{
            this.buscador = true;
            this.cerrarModal( false );
          });
          Swal.showLoading();

        } 
      });

      if ( this.movimientoBuscado.length < 1 ){
        Swal.fire({
          icon: 'info',
          text: 'No existen asientos con esa fecha',
          showConfirmButton: true,
          }).then( ()=>{
            this.buscador = false;
          });
      }

    } 
  }

  get asientoNoValido(){
    return this.busqueda.get('asiento').invalid;
  }

  mes( mes:any ){
    
    let arrayDias = [];

    if ( mes === '02' ) {
      for ( let d = 1; d < 29; d++ ){
        arrayDias.push(this._DATOS.zeroFill(d,2));
      }
      this.dias = arrayDias;
    }
    else if ( mes === '04' || mes === '06' || mes === '09' || mes === '11' ) {
      for ( let d = 1; d < 31; d++ ){
        arrayDias.push(this._DATOS.zeroFill(d,2));
      }
      this.dias = arrayDias;
    }
    else {
      for ( let d = 1; d < 32; d++ ){
        arrayDias.push(this._DATOS.zeroFill(d,2));
      }
      this.dias = arrayDias;
    }
    
  }

  actualizar(){
    this.buscador = false;
    this.ngOnInit;
  }

}

export interface colores {
  verde: string,
  rojo: string,
  blanco: string
}
