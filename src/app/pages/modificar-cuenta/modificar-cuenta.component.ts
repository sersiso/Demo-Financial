import { Component, OnInit } from '@angular/core';
import { InfoService } from '../../services/info.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cuentas } from '../../models/cuenta.models';
import Swal from 'sweetalert2';
import { VariablesService } from '../../services/variables.service';

@Component({
  selector: 'app-modificar-cuenta',
  templateUrl: './modificar-cuenta.component.html',
  styleUrls: ['./modificar-cuenta.component.css']
})
export class ModificarCuentaComponent implements OnInit {

  //Variables
  recuperarIdUrl:string;
  cuenta:FormGroup;
  tiposCuenta:any[] = [];
  cuentaRecuperada:any = [];

  constructor( private _DATOS: InfoService, 
              private fb: FormBuilder,
              public _VARIABLES: VariablesService ) { 

    this.recuperarIdUrl = this._VARIABLES.idCuentaModificar;
    this.cuentaRecuperada = this.recuperarDatos( this.recuperarIdUrl );
    this.crearFormulario();
   }

  ngOnInit(): void {

    this.mostarListaCuentas();

  }

  crearFormulario(){
    this.cuenta = this.fb.group({
      id: [{ value: this.recuperarIdUrl, disabled: true }, Validators.required],
      fechaDeCreacion: [{ value: this.cuentaRecuperada[0].fechaDeCreacion, disabled: true }, Validators.required],
      tipo: [ this.cuentaRecuperada[0].tipo.nombre, Validators.required],
      identificador: [ { value: this.cuentaRecuperada[0].identificador, disabled: true }, Validators.required],
      nombreCuenta: [ this.cuentaRecuperada[0].nombreCuenta, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      descripcion: [ this.cuentaRecuperada[0].descripcion, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]]
    });
  }

  recuperarDatos( id:string ){
    let infoCuenta = [];
    infoCuenta = this._DATOS.buscarCuentaId( id );
    return infoCuenta;
  }

  //Envío de formulario
  guardarCuenta(){

    const data = this.cuenta.getRawValue();

    //Validación al pulsar el botón de guardar
    if ( this.cuenta.invalid ) {
      return Object.values( this.cuenta.controls ).forEach( control =>{
        control.markAsTouched();
      });
    }

    let apunte:string;
    let codigo:string; 
    let nombre:string;
    nombre = data.tipo;

    //Si es el mismo tipo de cuenta
    if ( this.cuentaRecuperada[0].tipo.nombre === data.tipo ||
          this.cuentaRecuperada[0].tipo.nombre !== data.tipo &&
          this.cuentaRecuperada[0].saldo === '0.00' ) {

        for (let n of this.tiposCuenta) {
          if ( n.nombre === nombre ){
            codigo = n.codigo;
            apunte = n.apunte;
          }
        }

        data.tipo = { 
          nombre: nombre,
          apunte: apunte, 
          codigo: codigo 
        }
        
        Swal.fire({
          icon: 'success',
          text: 'Cuenta modificada',
          timer: 2000,
          showConfirmButton: false,
          }).then ( () => {
            this.modificarCuenta( data );
            this.cerrarModal ( false );
          });

    } 

    //Si es distinto tipo de cuenta
    else if ( this.cuentaRecuperada[0].tipo.nombre !== data.tipo &&
               this.cuentaRecuperada[0].saldo !== '0.00' ) {

      data.tipo = { 
        nombre: this.cuentaRecuperada[0].tipo.nombre, 
        apunte: this.cuentaRecuperada[0].tipo.apunte,
        codigo: this.cuentaRecuperada[0].tipo.codigo 
      }

      Swal.fire({
        icon: 'info',
        text: 'No se ha podido modificar el tipo de cuenta. Sólo se puede hacer con las que tienen saldo 0',
        showConfirmButton: true,
      }).then ( () => {
        this.modificarCuenta( data );
        this.cerrarModal( false );
      });
    }

  }

  modificarCuenta( datosForm: Cuentas ){

    const datosRecibidos:any = {
        id: this.recuperarIdUrl,
        fechaDeCreacion: this.cuentaRecuperada[0].fechaDeCreacion,
        tipo: datosForm.tipo,
        identificador: this.cuentaRecuperada[0].identificador,
        nombreCuenta: datosForm.nombreCuenta,
        descripcion: datosForm.descripcion,
        debe: this.cuentaRecuperada[0].debe,
        haber: this.cuentaRecuperada[0].haber,
        saldo: this.cuentaRecuperada[0].saldo
    }

    let peticion;
    peticion = this._DATOS.modificarCuenta( datosRecibidos, this.recuperarIdUrl );

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

  get tipoNoValido(){
    return this.cuenta.get('tipo').invalid &&
            this.cuenta.get('tipo').touched
  }


  //Funciones
  mostarListaCuentas(){
    this.tiposCuenta = this._DATOS.getTipoDeCuenta();
  }

  cerrarModal( termino:boolean ){
    this._VARIABLES.abrirModalModificarCuenta = termino;
  }

}
