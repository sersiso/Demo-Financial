import { Component, OnInit } from '@angular/core';
import { InfoService } from '../../services/info.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cuentas } from '../../models/cuenta.models';
import Swal from 'sweetalert2';
import { Movimientos } from 'src/app/models/movimientos.models';
import { VariablesService } from 'src/app/services/variables.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent implements OnInit {

  //Variables
  cuentaContable:string;
  contrapartida:string;
  moneda:string;
  cuenta:FormGroup;
  tiposCuenta:any[] = [];
  cuentas:Cuentas[] = [];
  saldo:string;
  asiento:string;
  tipoCuenta:string;
  apareceSaldo:boolean = false;
  codigo:number = this.CrearIdCuenta();
  idAutomatico = this._DATOS.genenarIdAutomatico();
  fecha = this._DATOS.getFecha();

  constructor( private _DATOS: InfoService, 
              private fb: FormBuilder,
              public _VARIABLES: VariablesService ) { 

    this.crearFormulario();

   }

  ngOnInit(): void {

    this.mostrarMoneda();
    this.mostarListaCuentas();

  }

  crearFormulario(){
    this.cuenta = this.fb.group({
      id: [{ value: this.idAutomatico, disabled: true }, Validators.required],
      fechaDeCreacion: [{ value: this.fecha, disabled: true }, Validators.required],
      tipo: ['', Validators.required],
      identificador: [ { value: this.codigo, disabled: true }, Validators.required],
      nombreCuenta: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      descripcion: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      cantidad: [{ value: '0', disabled: true }, [Validators.pattern('[0-9]+'), Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      decimales: [{ value: '00', disabled: true }, [Validators.pattern('[0-9]+'), Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
    });
  }

  //Envío de formulario
  guardarCuenta(){
  
    if ( this.cuenta.invalid ) {
      return Object.values( this.cuenta.controls ).forEach( control =>{
        control.markAsTouched();
      });
    }

    const data = this.cuenta.getRawValue();
    this.cuentaContable = data.id.toString();
    this.contrapartida = '1665060693545';
    this.saldo = data.cantidad + '.' + data.decimales;
    this.tipoCuenta = data.tipo.apunte;

    Swal.fire({
      icon: 'success',
      text: 'Cuenta guardada',
      timer: 2000,
      showConfirmButton: false,
      }).then ( () => {
        this.crearCuenta( data );
        this.cerrarModal( false );
      });

  }

  crearCuenta( datosForm: Cuentas ){

    let debe:any[] = [];
    let haber:any[] = [];

    //Crea asiento de apertura
    if ( this.tipoCuenta === 'activo' ){

      this.crearAsientoApertura();

      let valorDebe = { asiento: this.asiento, cantidad: this.saldo }
      let valorHaber = { asiento: this.asiento, cantidad: '0.00' }
      debe.push(valorDebe);
      haber.push(valorHaber);
    } 

    else if ( this.tipoCuenta === 'pasivo' ){

      this.crearAsientoApertura();

      let valorHaber = { asiento: this.asiento, cantidad: this.saldo }
      let valorDebe = { asiento: this.asiento, cantidad: '0.00' }
      debe.push(valorDebe);
      haber.push(valorHaber);
    }

    //Graba la cuenta
    const datosRecibidos: Cuentas = {
        id: datosForm.id.toString(),
        fechaDeCreacion: datosForm.fechaDeCreacion,
        tipo: datosForm.tipo,
        identificador: datosForm.identificador.toString(),
        nombreCuenta: datosForm.nombreCuenta,
        descripcion: datosForm.descripcion,
        debe: debe,
        haber: haber,
        saldo: this.saldo
    }

    let peticion;
    peticion = this._DATOS.setCuenta(datosRecibidos);
  }

  //Validaciones
  get descripcionNoValido(){
    return this.cuenta.get('descripcion').invalid &&
           this.cuenta.get('descripcion').touched
  }

  get nombreNoValido(){
    return this.cuenta.get('nombreCuenta').invalid &&
    this.cuenta.get('nombreCuenta').touched
  }

  get saldoNoValido(){
    return this.cuenta.get('cantidad').invalid &&
            this.cuenta.get('cantidad').touched
  }

  get decimalesNoValido(){
    return  this.cuenta.get('decimales').invalid &&
            this.cuenta.get('decimales').touched
  }

  get tipoNoValido(){
    return this.cuenta.get('tipo').invalid &&
            this.cuenta.get('tipo').touched
  }

  
  crearAsientoApertura(){
      this.asiento = this._DATOS.crearNumeroAsiento().toString();
      const datosRecibidos: Movimientos = {
        asiento: this.asiento,
        id: 'M-'+ this._DATOS.genenarIdAutomatico(),
        dia: this._DATOS.dia.toString(),
        mes: this._DATOS.mes.toString(),
        anyo: this._DATOS.anyo.toString(),
        concepto: 'Creación de cuenta',
        cantidad: this.saldo,
        cuentaContable: this.cuentaContable,
        contrapartida: this.contrapartida,
        tipo: '7'
      }
      this._DATOS.setMovimientos(datosRecibidos);
  }


  CrearIdCuenta(){
    let identificador:number;
    this.cuentas =  this._DATOS.getInfoCuentas();
    this.cuentas.forEach( () => {
      identificador = this.cuentas.length;
    });
    identificador++;
    return identificador;
  }

  mostarListaCuentas(){
    let tipos = this._DATOS.getTipoDeCuenta();
    tipos.forEach( resp => {
      if ( resp.apunte === 'activo' || resp.apunte === 'pasivo' ) {
        this.tiposCuenta.push(resp);
      }
    });
  }

  mostrarMoneda(){
    this.moneda = this._DATOS.getMoneda().simboloMoneda;
  }

  cerrarModal( termino:boolean ){
    this._VARIABLES.abrirModalCuenta = termino;
    this.cuenta.reset('');
  }

}
