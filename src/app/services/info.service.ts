import { Injectable } from '@angular/core';
import { Cuentas } from '../models/cuenta.models';
import { Movimientos } from '../models/movimientos.models';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  colores:colores = {
    verde: '#5f9ea0',
    rojo: '#ff7f50',
    blanco: '#fff'
  }

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
      nombre: 'Deudas Acreedor L/P',
      codigo: 'DALP',
    },
    {
      nombre: 'Deudas Cliente L/P',
      codigo: 'DCLP',
    },
    //Si se agregan más tipos, hacerlo también en la función "nombreCodigos"
  ]

  private movimientos:Movimientos[] = [
    {
      asiento: 1,
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
      asiento: 2,
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
      haber: '0.00',
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
    {
      id: '1664545442338',
      fechaDeCreacion: '30/09/2022',
      tipo: {
              nombre: 'Deudas Acreedor L/P',
              codigo: 'DALP',
            },
      identificador: '5',
      nombreCuenta: 'Banco Caixa',
      descripcion: 'Crédito con el banco',
      debe: '0.00',
      haber: '1200.00',
      saldo: '1200.00'
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

  nombreCodigos(){
    let codigos = {
      CBanco: this.tipoCuenta[0].codigo, 
      CEfectivo: this.tipoCuenta[1].codigo, 
      CCliente: this.tipoCuenta[2].codigo,
      CAcreedor: this.tipoCuenta[3].codigo, 
      DAcreedorLP: this.tipoCuenta[4].codigo,
      DClienteLP: this.tipoCuenta[5].codigo  
    }
    return codigos;
  }


  //Setters
  setCuenta( info:Cuentas ){
      this.cuentas.push(info);
  }

  modificarCuenta( info:Cuentas, idRecibido:any ){
      let indice = this.cuentas.findIndex( i => i.id === idRecibido);
      this.cuentas[indice] = info;
  }

  
  //Funciones 
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
      if ( nombreDevuelto.indexOf( termino ) >=0 ){
        cuentasArray.push( cuenta );
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


