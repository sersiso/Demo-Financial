import { Injectable } from '@angular/core';
import { Cuentas } from '../models/cuenta.models';
import { Movimientos } from '../models/movimientos.models';
import { Variables } from './variables';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  colores:colores = new Variables().getColoresVariables();
  private moneda:moneda = new Variables().getMonedaVariables();
  private tipoMovimiento = new Variables().getTipoMovimientoVariables();
  private tipoCuenta = new Variables().getTipoCuentaVariables();
  private movimientos:Movimientos[] = new Variables().getMovimientosVariables();
  private cuentas:Cuentas[] = new Variables().getCuentasVariables();

  constructor() { 

   }


  //Funciones con asientos
  recibirMovimientos(){
    let info = [];
    let mov = this.getInfoMovimientos();
    mov.forEach( resp => {
      if ( resp.tipo != '7'){
        info.push(resp);
      }
    });
    return info;
  }

  crearMovimiento( datosForm: Movimientos, total ){

    const datosRecibidos: Movimientos = {
        asiento: datosForm.asiento.toString(),
        id: datosForm.id.toString(),
        dia: datosForm.dia,
        mes: datosForm.mes,
        anyo: datosForm.anyo,
        concepto: datosForm.concepto,
        cantidad: total,
        cuentaContable: datosForm.cuentaContable,
        contrapartida: datosForm.contrapartida,
        tipo: datosForm.tipo
    }

    this.setMovimientos(datosRecibidos);
    
  }

  
  setMovimientos( info:Movimientos ){
    
    this.movimientos.push(info);
    let asiento = info.asiento;
    let idCuenta = info.cuentaContable;
    let idContrapartida = info.contrapartida;
    let cantidad = info.cantidad;

    this.getInfoCuentas().forEach( resp => {
       
      if ( resp.id === idCuenta ) {
        this.setDebe( idCuenta, cantidad, asiento );
        this.setSaldo ( idCuenta );
      }         
      if ( resp.id === idContrapartida) {
        this.setHaber( idContrapartida, cantidad, asiento ); 
        this.setSaldo ( idContrapartida );
      } 

    });

  }

  setDebe( idCuenta:string, cantidad:string, asiento:string ){
      let indice = this.cuentas.findIndex( i => i.id === idCuenta);
      let data = { asiento: asiento, cantidad: cantidad };
      let dataVacia = { asiento: asiento, cantidad: '0.00' };
      this.cuentas[indice].debe.push(data);
      this.cuentas[indice].haber.push(dataVacia);
  }

  setHaber( idCuenta:string, cantidad:string, asiento:string ){
      let indice = this.cuentas.findIndex( i => i.id === idCuenta);
      let data = { asiento: asiento, cantidad: cantidad };
      let dataVacia = { asiento: asiento, cantidad: '0.00' };
      this.cuentas[indice].debe.push(dataVacia);
      this.cuentas[indice].haber.push(data);
  }

  setSaldo( idCuenta ){

    let indice = this.cuentas.findIndex( i => i.id === idCuenta);
    let numerosDebe:any = [];
    let numerosHaber:any = [];

    let debe = this.cuentas[indice].debe;
    debe.forEach( resp => {
      numerosDebe.push(parseFloat(resp.cantidad));
    });

    let haber = this.cuentas[indice].haber;
    haber.forEach( resp => {
      numerosHaber.push(parseFloat(resp.cantidad));
    });

    let saldo = this.sumarArray(numerosDebe) - this.sumarArray(numerosHaber);
    if ( saldo < 0 ) {
      saldo = Math.abs(saldo);
      this.cuentas[indice].saldo = saldo.toFixed(2);
    } else {
      this.cuentas[indice].saldo = saldo.toFixed(2);
    } 

  }


  //Funciones para cuentas
  setCuenta( info:Cuentas ){
    this.cuentas.push(info);
}

  modificarCuenta( info:Cuentas, idRecibido:any ){
      let indice = this.cuentas.findIndex( i => i.id === idRecibido);
      this.cuentas[indice] = info;
  }

  //Getters
  getMoneda(){
    return this.moneda;
  }

  getTipoDeCuenta(){
    return  this.tipoCuenta;
  }

  getInfoCuentas(){
    let listaCuentas = [];
    this.cuentas.forEach( resp => {
      if ( resp.tipo.codigo !== this.nombreCodigos().cr  ){
        listaCuentas.push(resp);
      }
    });
    return listaCuentas;
  }

  getInfoMovimientos(){
    return this.movimientos;
  }

  getFecha(){
    let fechaCompleta:string;
    fechaCompleta = `${this.dia}/${this.mes}/${this.anyo}`;
    return fechaCompleta;
  }

  getAnyo(){
    return this.anyo;
  }

  nombreCodigos(){
    let codigos = {
      cb: this.tipoCuenta[0].codigo, 
      ce: this.tipoCuenta[1].codigo, 
      cc: this.tipoCuenta[2].codigo,
      cp: this.tipoCuenta[3].codigo, 
      cd: this.tipoCuenta[4].codigo,
      ca: this.tipoCuenta[5].codigo,
      dplp: this.tipoCuenta[6].codigo,
      dclp: this.tipoCuenta[7].codigo,
      dalp: this.tipoCuenta[8].codigo,
      ddlp: this.tipoCuenta[9].codigo,
      cr: this.tipoCuenta[10].codigo,
    }
    return codigos;
  }

  
  //Funciones varias
  genenarIdAutomatico(){
    let d = new Date().getTime();
    let uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      let r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }

  textoIdCuenta( id ){
    let indice = this.cuentas.findIndex( i => i.id === id);
    let identificador = this.cuentas[indice].identificador;
    let tipo = this.cuentas[indice].tipo.codigo;
    let nombre = this.cuentas[indice].nombreCuenta;
    return `${ identificador } / (${ tipo }) ${ nombre }`;
  }

   textoTipo( tipoRecibido ){
    let indice = this.tipoMovimiento.findIndex( i => i.id === tipoRecibido);
    let identificador;
    return identificador = this.tipoMovimiento[indice].nombre;
  } 
  
  mostrarActivo(){
    let infoCuentas:any, peticion:any, codigos:any, lista = [], resultado:number;
    infoCuentas = this.getInfoCuentas();
    peticion =  infoCuentas.forEach( resp =>{
        codigos = resp.tipo.apunte;
        if (codigos === 'activo') {
              lista.push(Number.parseFloat(resp.saldo));
            }
    });
    resultado = parseFloat(this.sumarArray( lista ).toFixed(2));
    return resultado;
  }

  mostrarDisponible(){
    let infoCuentas:any, peticion:any, codigos:any, lista = [], resultado:number;
    infoCuentas = this.getInfoCuentas();
    let codigosDinero = this.nombreCodigos();
    peticion =  infoCuentas.forEach( resp =>{
        codigos = resp.tipo.codigo;
        if (codigos === codigosDinero.cb || codigos === codigosDinero.ce) {
              lista.push(Number.parseFloat(resp.saldo));
            }
    });
    resultado = parseFloat(this.sumarArray( lista ).toFixed(2));
    return resultado;
  }

  mostrarDeuda(){
    let infoCuentas:any, peticion:any, codigos:any, lista = [], resultado:number;
    infoCuentas = this.getInfoCuentas();
    peticion =  infoCuentas.forEach( resp =>{
        codigos = resp.tipo.apunte;
        if (codigos === 'pasivo') {
              lista.push(Number.parseFloat(resp.saldo));
            }
    });
    resultado = parseFloat(this.sumarArray( lista ).toFixed(2));
    return resultado;

  }

  mostrarSaldo(){

    let infoCuentas:any, peticion:any, codigos:any, listaDebe = [], listaHaber = [];
    let debe, haber, resultado:number;
    
    infoCuentas = this.getInfoCuentas();
    peticion =  infoCuentas.forEach( resp =>{
      codigos = resp.tipo.apunte;

      if (codigos === 'pasivo') {
            listaHaber.push(parseFloat(resp.saldo));
          }

      if (codigos === 'activo') {
            listaDebe.push(parseFloat(resp.saldo));
          }

    });

    debe = this.sumarArray( listaDebe );
    haber = this.sumarArray( listaHaber );
    resultado = debe - haber;
    
    return parseFloat(resultado.toFixed(2));

  }

  sumarArray( arrayNumeros ) {
    let suma = 0;
      arrayNumeros.forEach( ( resp:number ) => { suma += resp; });
        return suma;
  }

  buscarCuenta( termino:string ){
    let cuentasArray = [];
    termino = termino.toLocaleLowerCase();
    for (let cuenta of this.cuentas) {
      let nombreDevuelto = cuenta.nombreCuenta.toLocaleLowerCase();
      if ( cuenta.tipo.codigo != this.nombreCodigos().cr ){
        if ( nombreDevuelto.indexOf( termino ) >=0 ){
              cuentasArray.push( cuenta );
            }
      } 
    }
    return cuentasArray;
  } 

  buscarCuentaId( termino:string ){
    let cuentasArray = [];
    termino = termino.toLocaleLowerCase();
    for (let cuenta of this.cuentas) {
      let nombreDevuelto = cuenta.id.toLocaleLowerCase();
      if ( nombreDevuelto.indexOf( termino ) >=0 ){
        cuentasArray.push( cuenta );
      }
    }
    return cuentasArray;
  } 

  crearNumeroAsiento(){
    let identificador:number;
    this.movimientos = this.getInfoMovimientos();
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

  //Variables para fechas
  hoy = new Date();
  dia = this.hoy.getDate();
  mes = this.hoy.getMonth() + 1;
  anyo = this.hoy.getFullYear();
  hora = this.hoy.getTime();

}

//Interfaces
export interface tipo {
  ingreso: string;
  pago: string;
  deuda: string;
}

export interface moneda {
  simboloMoneda:string,
  nombreMoneda:string
}

export interface colores {
  verde: string,
  rojo: string,
  blanco: string
}


