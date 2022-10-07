import { Component, OnInit } from '@angular/core';
import { InfoService } from '../../services/info.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cuentas } from '../../models/cuenta.models';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Movimientos } from '../../models/movimientos.models';
import { isEmpty } from 'rxjs';

@Component({
  selector: 'app-asiento',
  templateUrl: './asiento.component.html',
  styleUrls: ['./asiento.component.css']
})
export class AsientoComponent implements OnInit {

  //fechas
  meses:string[] = ['01','02','03','04','05','06','07','08','09','10','11','12'];
  dias:any[] = [];
  anyo = this._datos.getAnyo();

  //Formulario
  movimiento:FormGroup;

  //Almacenamiento datos
  movimientos:Movimientos[] = [];
  cuentasContables:any[] = [];
  cuentasContrapartida:any[] = [];

  //Información
  moneda:string;
  total:string;
  cuentas = this._datos.getInfoCuentas();
  asiento:number = this.crearNumeroAsiento();
  idAutomatico = this._datos.genenarIdAutomatico();

  //Carteles
  mostrarCartelIngreso:boolean = false;
  mostrarCartelPago:boolean = false;
  mostrarCartelDeudaA:boolean = false;
  mostrarCartelDeudaC:boolean = false;
  mostrarCartelVenta:boolean = false;
  mostrarCartelCompra:boolean = false;
  cuadrarAsiento:boolean = false;

  constructor( private _datos: InfoService, 
              private fb: FormBuilder,
              private router: Router ) { 

    this.crearFormulario();

    }

  ngOnInit(): void {

    this.mostrarMoneda();

    for ( let d = 1; d < 32; d++ ){
      this.dias.push(d);
    }

  }

  crearFormulario(){
    this.movimiento = this.fb.group({
      asiento: [{ value: this.asiento, disabled: true }, Validators.required],
      id: ['M-'+this.idAutomatico, Validators.required],
      dia: ['', Validators.required],
      mes: ['', Validators.required],
      anyo: [{ value: this.anyo, disabled: true }, Validators.required],
      cuentaContable: ['', Validators.required],
      contrapartida: ['', Validators.required],
      cuadrar: [''],
      concepto: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      tipo: ['', Validators.required],
      cantidad: ['', [Validators.pattern('[0-9]+'), Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      decimales: ['', [Validators.pattern('[0-9]+'), Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
    });
  }

  //Envío de formulario
  guardarCuenta(){
    
    //Validación al pulsar el botón de guardar
    if ( this.movimiento.invalid ) {
      return Object.values( this.movimiento.controls ).forEach( control =>{
        control.markAsTouched();
      });
    }

    const data = this.movimiento.getRawValue();
    this.total = data.cantidad + '.' + data.decimales;
    console.log(data);
    
     Swal.fire({
      icon: 'success',
      text: 'Movimiento guardado',
      timer: 2000,
      showConfirmButton: false,
      }).then ( () => {
        this.crearMovimiento( data );

        if ( data.cuadrar === true ){
          console.log("Hace el asiento extra");
        }

        this.router.navigateByUrl('mi-espacio');
      }); 

  }

  crearMovimiento( datosForm: Movimientos ){

    const datosRecibidos: Movimientos = {
        asiento: datosForm.asiento,
        id: datosForm.id.toString(),
        dia: datosForm.dia,
        mes: datosForm.mes,
        anyo: datosForm.anyo,
        concepto: datosForm.concepto,
        cantidad: this.total,
        cuentaContable: datosForm.cuentaContable,
        contrapartida: datosForm.contrapartida,
        tipo: datosForm.tipo
    }

    let peticion = this._datos.setMovimientos(datosRecibidos);
    console.log(datosRecibidos);
    
    
  }

  //Validaciones
  get fechaNoValido(){
    return (this.movimiento.get('dia').invalid && this.movimiento.get('dia').touched) ||
            (this.movimiento.get('mes').invalid && this.movimiento.get('mes').touched) ||
            (this.movimiento.get('anyo').invalid && this.movimiento.get('anyo').touched)
  }

  get tipoNoValido(){
    return this.movimiento.get('tipo').invalid && this.movimiento.get('tipo').touched;
  }

  get cuentaNoValido(){
    return this.movimiento.get('cuentaContable').invalid && this.movimiento.get('cuentaContable').touched;
  }

  get contrapartidaNoValido(){
    return this.movimiento.get('contrapartida').invalid && this.movimiento.get('contrapartida').touched;
  }

  get conceptoNoValido(){
    return this.movimiento.get('concepto').invalid && this.movimiento.get('concepto').touched;
  }

  get cantidadNoValido(){
    return this.movimiento.get('cantidad').invalid &&
            this.movimiento.get('cantidad').touched
  }

  get decimalesNoValido(){
    return  this.movimiento.get('decimales').invalid &&
            this.movimiento.get('decimales').touched
  }


  //Funciones
  crearNumeroAsiento(){
    let identificador:number;
    this.movimientos = this._datos.getInfoMovimientos();
    if ( this.movimientos.length === 0 ){
      identificador = 1;
    } 
    else {
      this.movimientos.forEach( () => {
        identificador = this.movimientos.length;
      });
      identificador++;
    }
    return identificador;
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
    this.movimiento.controls['cuentaContable'].reset('');
    this.movimiento.controls['contrapartida'].reset('');
  }


  tipoMovimiento( movimiento:any ){

    let nombreCodigos = this._datos.nombreCodigos();
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
      this.cuadrarAsiento = true;
      
        this.cuentas.forEach( resp => {
          if ( nombreCodigos.cb === resp.tipo.codigo || 
            nombreCodigos.ce === resp.tipo.codigo ){
            arrayContables.push(resp);
            this.cuentasContables = arrayContables;
          }
          if ( nombreCodigos.dclp === resp.tipo.codigo || 
            nombreCodigos.cc === resp.tipo.codigo || 
            nombreCodigos.cr === resp.tipo.codigo && resp.nombreCuenta === 'Donaciones y regalos' || 
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
      this.cuadrarAsiento = true;

      this.cuentas.forEach( resp => {
        if ( nombreCodigos.ca === resp.tipo.codigo || 
          nombreCodigos.dalp === resp.tipo.codigo ||
          nombreCodigos.cr === resp.tipo.codigo && resp.nombreCuenta === 'Donaciones y regalos' || 
            nombreCodigos.cr === resp.tipo.codigo && resp.nombreCuenta === 'Sueldos y salarios' ){
          arrayContables.push(resp);
          this.cuentasContables = arrayContables;
        }
        if ( nombreCodigos.cb === resp.tipo.codigo || nombreCodigos.ce === resp.tipo.codigo ){
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
      this.cuadrarAsiento = false;

      this.cuentas.forEach( resp => {
        if ( nombreCodigos.cr === resp.tipo.codigo && resp.nombreCuenta === 'Deudas' ){
          arrayContables.push(resp);
          this.cuentasContables = arrayContables;
        }
        if ( nombreCodigos.ca === resp.tipo.codigo || nombreCodigos.dalp === resp.tipo.codigo ){
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
      this.cuadrarAsiento = false;

      this.cuentas.forEach( resp => {
        if ( nombreCodigos.cc === resp.tipo.codigo || nombreCodigos.dclp === resp.tipo.codigo ){
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
      this.cuadrarAsiento = false;

      this.cuentas.forEach( resp => {
        if ( nombreCodigos.cc === resp.tipo.codigo || nombreCodigos.dclp === resp.tipo.codigo ){
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
      this.cuadrarAsiento = false;

      this.cuentas.forEach( resp => {
        if ( nombreCodigos.cr === resp.tipo.codigo && resp.nombreCuenta === 'Mercaderías' ){
          arrayContables.push(resp);
          this.cuentasContables = arrayContables;
        }
        if ( nombreCodigos.ca === resp.tipo.codigo || nombreCodigos.dalp === resp.tipo.codigo ){
          arrayContrapartida.push(resp);
          this.cuentasContrapartida = arrayContrapartida;
        }
      });
    }
    
  }

  mostrarMoneda(){
    this.moneda = this._datos.getMoneda().simboloMoneda;
  }

}
  