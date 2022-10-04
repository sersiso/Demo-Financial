import { Component, OnInit } from '@angular/core';
import { InfoService } from '../../services/info.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cuentas } from '../../models/cuenta.models';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor( private _datos: InfoService, 
              private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute ) { 

    this.recuperarIdUrl = this.route.snapshot.paramMap.get('id');
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
    infoCuenta = this._datos.buscarCuentaId( id );
    return infoCuenta;
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

    let codigo:string, nombre:string;
    nombre = data.tipo;

    for (let n of this.tiposCuenta) {
      if ( n.nombre === nombre ){
        codigo = n.codigo;
      }
    }

    data.tipo = { 
      nombre: nombre, 
      codigo: codigo 
    }

    Swal.fire({
      icon: 'success',
      text: 'Cuenta modificada',
      timer: 2000,
      showConfirmButton: false,
      }).then ( () => {
        this.modificarCuenta( data );
        this.router.navigateByUrl('cuentas');
      });

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
    peticion = this._datos.modificarCuenta( datosRecibidos, this.recuperarIdUrl );

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
    this.tiposCuenta = this._datos.getTipoDeCuenta();
  }

}
