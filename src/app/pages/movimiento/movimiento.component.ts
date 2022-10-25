import { Component, OnInit } from '@angular/core';
import { InfoService } from '../../services/info.service';
import { FormBuilder, FormGroup, NgModel, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Movimientos } from '../../models/movimientos.models';
import { VariablesService } from '../../services/variables.service';

@Component({
  selector: 'app-movimiento',
  templateUrl: './movimiento.component.html',
  styleUrls: ['./movimiento.component.css']
})
export class MovimientoComponent implements OnInit {

  //Recuperar información
  idMovimiento:string;
  infoMovimiento:any;

  //Almacenamiento datos
  cuentasContables:any[] = [];
  cuentasContrapartida:any[] = [];

  //fechas
  meses:string[] = ['01','02','03','04','05','06','07','08','09','10','11','12'];
  dias:any[] = [];
  anyo = this._DATOS.getAnyo();

  //Formulario
  cambioMovimiento:FormGroup;

  //Información
  moneda:string;
  total:string;
  cuentas = this._DATOS.getInfoCuentasAll();

  //Carteles
  mostrarCartelIngreso:boolean = false;
  mostrarCartelPago:boolean = false;
  mostrarCartelDeudaA:boolean = false;
  mostrarCartelDeudaC:boolean = false;
  mostrarCartelVenta:boolean = false;
  mostrarCartelCompra:boolean = false;
  mostrarCartelTraspaso:boolean = false;
  cuadrarAsiento:boolean = false;

  //Cantidad
  numero:string;
  decimales:string;

  constructor( public _VARIABLES: VariablesService,
              private _DATOS: InfoService,
              private fb: FormBuilder ) { 

      this.idMovimiento = this._VARIABLES.idAsientoVisualizar;
      this.infoMovimiento = this.recuperarInfo( this.idMovimiento );
      
      
   }

  ngOnInit(): void {

    for ( let d = 1; d < 32; d++ ){
      this.dias.push(d);
    }

    this.crearFormulario();
    this.mostrarMoneda();
    this.tipoMovimiento( this.infoMovimiento.tipo );

    if ( this.infoMovimiento.tipo === '7' ){
      this.cambioMovimiento.controls['cuentaContable'].disable();
      this.cambioMovimiento.controls['contrapartida'].disable();
      this.cambioMovimiento.controls['cuadrar'].disable();
      this.cambioMovimiento.controls['concepto'].disable();
      this.cambioMovimiento.controls['tipo'].disable();
    }
    
    else {
      this.cambioMovimiento.controls['tipo'].disable();
    }

  }

  crearFormulario(){
    this.cambioMovimiento = this.fb.group({
      asiento: [ this.infoMovimiento.asiento, Validators.required],
      id: [this.infoMovimiento.id, Validators.required],
      dia: [this.infoMovimiento.dia, Validators.required],
      mes: [this.infoMovimiento.mes, Validators.required],
      anyo: [{ value: this.anyo, disabled: true }, Validators.required],
      cuentaContable: [''],
      contrapartida: [''],
      cuadrar: [''],
      concepto: [this.infoMovimiento.concepto, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      tipo: [this.infoMovimiento.tipo, Validators.required],
      cantidad: [this.devolverCantidad( this.infoMovimiento.cantidad ), [Validators.pattern('[0-9]+'), Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      decimales: [this.devolverDecimales( this.infoMovimiento.cantidad ), [Validators.pattern('[0-9]+'), Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
    });
  }

  devolverCantidad( termino:string ){
    let indice = termino.indexOf('.');
    let extraida = termino.substring( 0, indice );
    return extraida;
  }

  devolverDecimales( termino:string ){
    let extraida = termino.slice( termino.length - 2 );
    return extraida;
  }

  //Cambiar datos
  modificarMovimiento(){

      //Validación al pulsar el botón de guardar
      if ( this.cambioMovimiento.invalid ) {
        return Object.values( this.cambioMovimiento.controls ).forEach( control =>{
          control.markAsTouched();
        });
      }

      const data = this.cambioMovimiento.getRawValue();

      if ( data.cuentaContable === '' ){
        data.cuentaContable = this.infoMovimiento.cuentaContable;
      } else {
        let idcuenta = this._DATOS.buscaIDporNombre( data.cuentaContable );
        data.cuentaContable = idcuenta;
      }

      if ( data.contrapartida === '' ){
        data.contrapartida = this.infoMovimiento.contrapartida;
      } else {
        let idcontrapartida = this._DATOS.buscaIDporNombre( data.contrapartida );
        data.contrapartida = idcontrapartida;
      }

      let cantidadJunta = data.cantidad + '.' + data.decimales; 
      let info:Movimientos;

      info = {
        asiento: data.asiento,
        id: data.id,
        dia: data.dia,
        mes: data.mes,
        anyo: data.anyo,
        concepto: data.concepto,
        cantidad: cantidadJunta,
        cuentaContable: data.cuentaContable,
        contrapartida: data.contrapartida,
        tipo: data.tipo,
      }

      let cuentasAntiguas = {
        cuentaContable: this.infoMovimiento.cuentaContable,
        contrapartida: this.infoMovimiento.contrapartida
      }

      console.log(info);
      
      Swal.fire({
        icon: 'success',
        text: 'Cuenta modificada',
        timer: 2000,
        showConfirmButton: false,
        }).then ( () => {
          if ( 
            this.infoMovimiento.cuentaContable != info.cuentaContable || 
            this.infoMovimiento.contrapartida != info.contrapartida
             ) {
              this._DATOS.modificarAsiento( info, this.idMovimiento, true, cuentasAntiguas );
          } else {
            this._DATOS.modificarAsiento( info, this.idMovimiento, false, cuentasAntiguas );
          }
          this.cerrarModal ( false );
        });

  }

  borrarMovimiento( id:string ){

    Swal.fire({
      icon: 'question',
      text: '¿Borrar movimiento?',
      showConfirmButton: true,
      showCancelButton: true,
      }).then ( resp => {
        if ( resp.value ) {
          this._DATOS.borrarAsiento( this.idMovimiento );
        }
        this.cerrarModal ( false );
      });

  }

  //Validaciones
  get fechaNoValido(){
    return (this.cambioMovimiento.get('dia').invalid && this.cambioMovimiento.get('dia').touched) ||
            (this.cambioMovimiento.get('mes').invalid && this.cambioMovimiento.get('mes').touched) ||
            (this.cambioMovimiento.get('anyo').invalid && this.cambioMovimiento.get('anyo').touched)
  }

  get tipoNoValido(){
    return this.cambioMovimiento.get('tipo').invalid && this.cambioMovimiento.get('tipo').touched;
  }

  get cuentaNoValido(){
    return this.cambioMovimiento.get('cuentaContable').invalid && this.cambioMovimiento.get('cuentaContable').touched;
  }

  get contrapartidaNoValido(){
    return this.cambioMovimiento.get('contrapartida').invalid && this.cambioMovimiento.get('contrapartida').touched;
  }

  get conceptoNoValido(){
    return this.cambioMovimiento.get('concepto').invalid && this.cambioMovimiento.get('concepto').touched;
  }

  get cantidadNoValido(){
    return this.cambioMovimiento.get('cantidad').invalid &&
            this.cambioMovimiento.get('cantidad').touched
  }

  get decimalesNoValido(){
    return  this.cambioMovimiento.get('decimales').invalid &&
            this.cambioMovimiento.get('decimales').touched
  }

  mes( mes:any ){
  
    let arrayDias = [];

    if ( mes === '02' ) {
      for ( let d = 1; d < 29; d++ ){
        arrayDias.push(d);
      }
      this.dias = arrayDias;
    }
    else if ( mes === '04' || mes === '06' || mes === '09' || mes === '11' ) {
      for ( let d = 1; d < 31; d++ ){
        arrayDias.push(d);
      }
      this.dias = arrayDias;
    }
    else {
      for ( let d = 1; d < 32; d++ ){
        arrayDias.push(d);
      }
      this.dias = arrayDias;
    }
    
  }

  resetCampoSelect(){
    this.cambioMovimiento.controls['cuentaContable'].reset('');
    this.cambioMovimiento.controls['contrapartida'].reset('');
    this.cuentasContables = [];
    this.cuentasContrapartida = [];
  }


  tipoMovimiento( movimiento:any ){

    let nombreCodigos = this._DATOS.nombreCodigos();
    let arrayContables = [];
    let arrayContrapartida = [];

    if ( movimiento === '1' ) {

      this.resetCampoSelect();

      this.mostrarCartelIngreso = true;
      this.mostrarCartelPago = false;
      this.mostrarCartelDeudaA = false;
      this.mostrarCartelDeudaC = false;
      this.mostrarCartelVenta = false;
      this.mostrarCartelCompra = false;
      this.mostrarCartelTraspaso = false;
      this.cuadrarAsiento = false;
      
        this.cuentas.forEach( resp => {
          if ( 
            nombreCodigos.cb === resp.tipo.codigo || 
            nombreCodigos.ce === resp.tipo.codigo ){
            arrayContables.push(resp);
            this.cuentasContables = arrayContables;
          }
          if ( 
            nombreCodigos.dclp === resp.tipo.codigo || 
            nombreCodigos.cc === resp.tipo.codigo ||
            nombreCodigos.cd === resp.tipo.codigo ||
            nombreCodigos.ddlp === resp.tipo.codigo ||
            nombreCodigos.cr === resp.tipo.codigo && resp.nombreCuenta === 'Prestar, donar y regalar' || 
            nombreCodigos.cr === resp.tipo.codigo && resp.nombreCuenta === 'Sueldos y salarios'){
            arrayContrapartida.push(resp);
            this.cuentasContrapartida = arrayContrapartida;
          }
        });

    }
    else if ( movimiento === '2' ){

      this.resetCampoSelect();

      this.mostrarCartelIngreso = false;
      this.mostrarCartelPago = true;
      this.mostrarCartelDeudaA = false;
      this.mostrarCartelDeudaC = false;
      this.mostrarCartelVenta = false;
      this.mostrarCartelCompra = false;
      this.mostrarCartelTraspaso = false;
      this.cuadrarAsiento = false;

      this.cuentas.forEach( resp => {
        if ( 
          nombreCodigos.cp === resp.tipo.codigo || 
          nombreCodigos.ca === resp.tipo.codigo ||
          nombreCodigos.dplp === resp.tipo.codigo || 
          nombreCodigos.dalp === resp.tipo.codigo ||
          nombreCodigos.cr === resp.tipo.codigo && resp.nombreCuenta === 'Créditos' ||
          nombreCodigos.cr === resp.tipo.codigo && resp.nombreCuenta === 'Prestar, donar y regalar' || 
          nombreCodigos.cr === resp.tipo.codigo && resp.nombreCuenta === 'Sueldos y salarios' ){
          arrayContables.push(resp);
          this.cuentasContables = arrayContables;
        }
        if ( 
          nombreCodigos.cb === resp.tipo.codigo || 
          nombreCodigos.ce === resp.tipo.codigo ){
          arrayContrapartida.push(resp);
          this.cuentasContrapartida = arrayContrapartida;
        }
      });

    }
    else if ( movimiento === '3' ){

      this.resetCampoSelect();

      this.mostrarCartelIngreso = false;
      this.mostrarCartelPago = false;
      this.mostrarCartelDeudaA = true;
      this.mostrarCartelDeudaC = false;
      this.mostrarCartelVenta = false;
      this.mostrarCartelCompra = false;
      this.mostrarCartelTraspaso = false;
      this.cuadrarAsiento = false;

      this.cuentas.forEach( resp => {
        if ( nombreCodigos.cr === resp.tipo.codigo && resp.nombreCuenta === 'Deudas' ){
          arrayContables.push(resp);
          this.cuentasContables = arrayContables;
        }
        if ( 
          nombreCodigos.ca === resp.tipo.codigo || 
          nombreCodigos.dalp === resp.tipo.codigo ){
          arrayContrapartida.push(resp);
          this.cuentasContrapartida = arrayContrapartida;
        }
      });

    }
    else if ( movimiento === '4' ){

      this.resetCampoSelect();

      this.mostrarCartelIngreso = false;
      this.mostrarCartelPago = false;
      this.mostrarCartelDeudaA = false;
      this.mostrarCartelDeudaC = true;
      this.mostrarCartelVenta = false;
      this.mostrarCartelCompra = false;
      this.mostrarCartelTraspaso = false;
      this.cuadrarAsiento = false;

      this.cuentas.forEach( resp => {
        if ( 
          nombreCodigos.cd === resp.tipo.codigo || 
          nombreCodigos.ddlp === resp.tipo.codigo ){
          arrayContables.push(resp);
          this.cuentasContables = arrayContables;
        }
        if ( nombreCodigos.cr === resp.tipo.codigo && resp.nombreCuenta === 'Deudas' ){
          arrayContrapartida.push(resp);
          this.cuentasContrapartida = arrayContrapartida;
        }
      });

    }
    else if ( movimiento === '5' ){

      this.resetCampoSelect();

      this.mostrarCartelIngreso = false;
      this.mostrarCartelPago = false;
      this.mostrarCartelDeudaA = false;
      this.mostrarCartelDeudaC = false;
      this.mostrarCartelVenta = true;
      this.mostrarCartelCompra = false;
      this.mostrarCartelTraspaso = false;
      this.cuadrarAsiento = false;

      this.cuentas.forEach( resp => {
        if ( 
          nombreCodigos.cc === resp.tipo.codigo || 
          nombreCodigos.dclp === resp.tipo.codigo ){
          arrayContables.push(resp);
          this.cuentasContables = arrayContables;
        }
        if ( nombreCodigos.cr === resp.tipo.codigo && resp.nombreCuenta === 'Mercaderías' ){
          arrayContrapartida.push(resp);
          this.cuentasContrapartida = arrayContrapartida;
        }
      });

    }
    else if ( movimiento === '6' ){

      this.resetCampoSelect();

      this.mostrarCartelIngreso = false;
      this.mostrarCartelPago = false;
      this.mostrarCartelDeudaA = false;
      this.mostrarCartelDeudaC = false;
      this.mostrarCartelVenta = false;
      this.mostrarCartelCompra = true;
      this.mostrarCartelTraspaso = false;
      this.cuadrarAsiento = false;

      this.cuentas.forEach( resp => {
        if ( nombreCodigos.cr === resp.tipo.codigo && resp.nombreCuenta === 'Mercaderías' ){
          arrayContables.push(resp);
          this.cuentasContables = arrayContables;
        }
        if ( 
          nombreCodigos.cp === resp.tipo.codigo || 
          nombreCodigos.dplp === resp.tipo.codigo ){
          arrayContrapartida.push(resp);
          this.cuentasContrapartida = arrayContrapartida;
        }
      });
    }

    else if ( movimiento === '8' ){

      this.resetCampoSelect();

      this.mostrarCartelIngreso = false;
      this.mostrarCartelPago = false;
      this.mostrarCartelDeudaA = false;
      this.mostrarCartelDeudaC = false;
      this.mostrarCartelVenta = false;
      this.mostrarCartelCompra = false;
      this.mostrarCartelTraspaso = true;
      this.cuadrarAsiento = false;

      this.cuentas.forEach( resp => {
        if ( 
          nombreCodigos.cb === resp.tipo.codigo || 
          nombreCodigos.ce === resp.tipo.codigo ){
          arrayContables.push(resp);
          this.cuentasContables = arrayContables;
        }
        if ( 
          nombreCodigos.cb === resp.tipo.codigo || 
          nombreCodigos.ce === resp.tipo.codigo ){
          arrayContrapartida.push(resp);
          this.cuentasContrapartida = arrayContrapartida;
        }
      });
    }
    
  }

  recuperarInfo( id:string ){
    const infoMovimiento = this._DATOS.getInfoMovimientos();
    let movimiento;
    infoMovimiento.forEach( resp => {
      if ( resp.id === this.idMovimiento ){
            movimiento = resp;
      }
    });
    return movimiento;
  }

  cerrarModal( termino:boolean ){
    this._VARIABLES.abrirModalModificarAsiento = termino;
  }

  mostrarMoneda(){
    this.moneda = this._DATOS.getMoneda().simboloMoneda;
  }

}
