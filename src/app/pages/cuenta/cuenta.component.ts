import { Component, OnInit } from '@angular/core';
import { InfoService } from '../../services/info.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cuentas } from '../../models/cuenta.models';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent implements OnInit {

  //Variables
  moneda:string;
  cuenta:FormGroup;
  tiposCuenta:any[] = [];
  cuentas:Cuentas[] = [];
  saldo:string;
  tipoCuenta:string;
  codigo:number = this.CrearIdCuenta();
  idAutomatico = this._datos.genenarIdAutomatico();
  fecha = this._datos.getFecha();

  constructor( private _datos: InfoService, 
              private fb: FormBuilder,
              private router: Router ) { 

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
      cantidad: ['', [Validators.pattern('[0-9]+'), Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      decimales: ['', [Validators.pattern('[0-9]+'), Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
    });
  }

  //Envío de formulario
  guardarCuenta(){
    
    //Validación al pulsar el botón de guardar
    if ( this.cuenta.invalid ) {
      return Object.values( this.cuenta.controls ).forEach( control =>{
        control.markAsTouched();
      });
    }

    const data = this.cuenta.getRawValue();
    this.saldo = data.cantidad + '.' + data.decimales;
    this.tipoCuenta = data.tipo.apunte;

    Swal.fire({
      icon: 'success',
      text: 'Cuenta guardada',
      timer: 2000,
      showConfirmButton: false,
      }).then ( () => {
        this.crearCuenta( data );
        this.router.navigateByUrl('mi-espacio');
      });

  }

  crearCuenta( datosForm: Cuentas ){
    

    let debe:string;
    let haber:string;

    if ( this.tipoCuenta === 'activo' )
    {
      debe = this.saldo;
      haber = '0.00';
    } 
    else 
    {
      haber = this.saldo;
      debe = '0.00';
    }

    const datosRecibidos: Cuentas = {
        id: datosForm.id.toString(),
        fechaDeCreacion: datosForm.fechaDeCreacion,
        tipo: datosForm.tipo,
        identificador: datosForm.identificador,
        nombreCuenta: datosForm.nombreCuenta,
        descripcion: datosForm.descripcion,
        debe: debe,
        haber: haber,
        saldo: this.saldo
    }

    let peticion;
    peticion = this._datos.setCuenta(datosRecibidos);
    console.log(this._datos.getInfoCuentas());
    

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


  //Funciones
  CrearIdCuenta(){
    let identificador:number;
    this.cuentas =  this._datos.getInfoCuentas();
    this.cuentas.forEach( () => {
      identificador = this.cuentas.length;
    });
    identificador++;
    return identificador;
  }

  mostarListaCuentas(){
    let tipos = this._datos.getTipoDeCuenta();
    tipos.forEach( resp => {
      if ( resp.apunte === 'activo' || resp.apunte === 'pasivo' ) {
        this.tiposCuenta.push(resp);
      }
    });
  }

  mostrarMoneda(){
    this.moneda = this._datos.getMoneda().simboloMoneda;
  }

}
