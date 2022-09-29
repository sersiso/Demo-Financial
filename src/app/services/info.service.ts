import { Injectable } from '@angular/core';
import { Cuentas } from '../models/cuenta.models';
import { Movimientos } from '../models/movimientos.models';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  private moneda:moneda = {
    simboloMoneda: '€',
    nombreMoneda: 'Euro'
  }

  private tipoDeMovimiento:tipo = {
    ingreso: 'Ingreso',
    pago: 'Pago',
    deuda: 'Deuda',
  }

  private tipoCuenta = [
    {
      nombre: 'Cuenta bancaria',
      codigo: 'CB',
    },
    {
      nombre: 'Cuenta Efectivo',
      codigo: 'CE',
    },
    {
      nombre: 'Cuenta Cliente',
      codigo: 'CC',
    },
    {
      nombre: 'Cuenta Acreedor',
      codigo: 'CA',
    },
    {
      nombre: 'Dedudas Acreedor L/P',
      codigo: 'DALP',
    },
    {
      nombre: 'Dedudas Cliente L/P',
      codigo: 'DCLP',
    },
  ]

  private movimientos:Movimientos[] = [
    {
      id: 'asd56aa822ff5sfa',
      dia: '23',
      mes: '09',
      anyo: '2022',
      cantidad: '1200',
      concepto: 'Cobro de proyecto página web',
      cuentaContable: 'CB1/Santander',
      contrapartida: 'CC2/Esther',
      tipo: 'Ingreso',
    },
    {
      id: 'I2jdlsiHGdsljs39a',
      dia: '26',
      mes: '09',
      anyo: '2022',
      cantidad: '4312',
      concepto: 'Cobro de proyecto tarjetas visita',
      cuentaContable: 'CB1/Santander',
      contrapartida: 'CC2/Esther',
      tipo: 'Ingreso',
    }
  ];

  private cuentas:Cuentas[] = [
    {
      id: '1664458286047',
      fechaDeCreacion: '29/09/2022',
      tipo: {
            nombre: 'Cuenta bancaria',
            codigo: 'CB',
            },
      identificador: '1',
      nombreCuenta: 'Banco Santander 0012',
      descripcion: 'Esta es la cuenta acabada en 0012',
      debe:'2410.75',
      haber: '0.00',
      saldo: '2410.75'
    },
    {
      id: '1664459194500',
      fechaDeCreacion: '29/09/2022',
      tipo: {
            nombre: 'Cuenta Efectivo',
            codigo: 'CE',
            },
      identificador: '2',
      nombreCuenta: 'Efectivo',
      descripcion: 'Dinero en efectivo',
      debe: '640.50',
      haber: '0',
      saldo: '640.50'
    },
    {
      id: '1664459337454',
      fechaDeCreacion: '29/09/2022',
      tipo: {
              nombre: 'Cuenta Acreedor',
              codigo: 'CA',
            },
      identificador: '3',
      nombreCuenta: 'Movistar',
      descripcion: 'Suministro de internet',
      debe: '0.00',
      haber: '43.32',
      saldo: '43.32'
    },
    {
      id: '1664459573944',
      fechaDeCreacion: '29/09/2022',
      tipo: {
              nombre: 'Cuenta Cliente',
              codigo: 'CC',
            },
      identificador: '4',
      nombreCuenta: 'María Puertas',
      descripcion: 'Cliente que solicita diseños',
      debe: '310.20',
      haber: '0.00',
      saldo: '310.20'
    },

  ]

  constructor() { }


  //Getters
  getMoneda(){
    return this.moneda;
  }

  getTipoMovimiento(){
    return this.tipoDeMovimiento;
  }

  getTipoDeCuenta(){
    return  this.tipoCuenta;
  }

  getInfoCuentas(){
    return this.cuentas;
  }

  getInfoMovimientos(){
    return this.movimientos;
  }

  getFecha(){
    let fechaCompleta:string;
    fechaCompleta = `${this.dia}/${this.mes}/${this.anyo}`;
    return fechaCompleta;
  }


  //Setters
  setCuenta( info:Cuentas ){
      this.cuentas.push(info);
  }

  
  genenarIdAutomatico(){
    let id:number;
    id = this.hora + this.dia + this.mes + this.anyo; 
    return id;
  }
  

  mostrarActivo(){
    let infoCuentas:any, peticion:any, codigos:any, lista = [], resultado:number;
    infoCuentas = this.getInfoCuentas();
    peticion =  infoCuentas.forEach( resp =>{
        codigos = resp.tipo.codigo;
        if (codigos === 'CB' || codigos === 'CE' || codigos === 'CC' || codigos === 'DCLP') {
              lista.push(Number.parseFloat(resp.saldo));
            }
    });
    resultado = parseFloat(this.sumarArray( lista ).toFixed(2));
    return resultado;
  }

  mostrarDisponible(){
    let infoCuentas:any, peticion:any, codigos:any, lista = [], resultado:number;
    infoCuentas = this.getInfoCuentas();
    peticion =  infoCuentas.forEach( resp =>{
        codigos = resp.tipo.codigo;
        if (codigos === 'CB' || codigos === 'CE') {
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
        codigos = resp.tipo.codigo;
        if (codigos === 'CA' || codigos === 'DALP') {
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
      codigos = resp.tipo.codigo;

      if (codigos === 'CA' || codigos === 'DALP') {
            listaHaber.push(Number.parseFloat(resp.saldo));
          }

      if (codigos === 'CB' || codigos === 'CE' || codigos === 'CC' || codigos === 'DCLP') {
            listaDebe.push(Number.parseFloat(resp.saldo));
          }

    });

    debe = this.sumarArray( listaDebe );
    haber = this.sumarArray( listaHaber );
    resultado = debe - haber;
    
    return parseFloat(resultado.toFixed(2));

  }


  //Suma los valores de un array
  sumarArray( arrayNumeros ) {
    let suma = 0;
      arrayNumeros.forEach( ( resp:number ) => { suma += resp; });
        return suma;
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


