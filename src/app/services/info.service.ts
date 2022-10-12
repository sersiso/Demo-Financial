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

  private tipoMovimiento = [
    {
      id: '1',
      nombre: 'Cobro directo'
    },
    {
      id: '2',
      nombre: 'Pago directo'
    },
    {
      id: '3',
      nombre: 'Deuda con acreedores'
    },
    {
      id: '4',
      nombre: 'Deuda de deudores'
    },
    {
      id: '5',
      nombre: 'Venta a cliente'
    },
    {
      id: '6',
      nombre: 'Compra a proveedores'
    },
    {
      id: '7',
      nombre: 'Nueva cuenta'
    }
  ]

  private tipoCuenta = [
    {
      nombre: 'Cuenta bancaria',
      apunte: 'activo',
      codigo: 'CB',
    },
    {
      nombre: 'Dinero en efectivo',
      apunte: 'activo',
      codigo: 'CE',
    },
    {
      nombre: 'Cliente',
      apunte: 'activo',
      codigo: 'CC',
    },
    {
      nombre: 'Proveedor',
      apunte: 'pasivo',
      codigo: 'CP',
    },
    {
      nombre: 'Deudor',
      apunte: 'activo',
      codigo: 'CD',
    },
    {
      nombre: 'Acreedor',
      apunte: 'pasivo',
      codigo: 'CA',
    },
    {
      nombre: 'Deudas proveedor a L/P',
      apunte: 'pasivo',
      codigo: 'DPLP',
    },
    {
      nombre: 'Deudas cliente a L/P',
      apunte: 'activo',
      codigo: 'DCLP',
    },
    {
      nombre: 'Deudas acreedor a L/P',
      apunte: 'pasivo',
      codigo: 'DALP',
    },
    {
      nombre: 'Deudas deudor a L/P',
      apunte: 'activo',
      codigo: 'DDLP',
    },
    {
      nombre: 'Cuenta de regularización',
      apunte: 'regularización',
      codigo: 'CR',
    },
    //Si se agregan más tipos, hacerlo también en la función "nombreCodigos"
  ]

  private movimientos:Movimientos[] = [

    {
      asiento: '1',
      id: 'M-1665390469887',
      dia: '29',
      mes: '09',
      anyo: '2022',
      concepto: 'Creación de cuenta',
      cantidad: '3500.00',
      cuentaContable: '1664458286047',
      contrapartida: '1665060693545',
      tipo: '7'
    },
    {
      asiento: '2',
      id: 'M-1665390469888',
      dia: '29',
      mes: '09',
      anyo: '2022',
      concepto: 'Creación de cuenta',
      cantidad: '700.00',
      cuentaContable: '1664459194500',
      contrapartida: '1665060693545',
      tipo: '7'
    },
    {
      asiento: '3',
      id: 'M-1665390469888',
      dia: '29',
      mes: '09',
      anyo: '2022',
      concepto: 'Creación de cuenta',
      cantidad: '43.32',
      cuentaContable: '1664459337454',
      contrapartida: '1665060693545',
      tipo: '7'
    },
    {
      asiento: '4',
      id: 'M-1665390469889',
      dia: '29',
      mes: '09',
      anyo: '2022',
      concepto: 'Creación de cuenta',
      cantidad: '310.20',
      cuentaContable: '1664459573944',
      contrapartida: '1665060693545',
      tipo: '7'
    },
    {
      asiento: '5',
      id: 'M-1665390469892',
      dia: '29',
      mes: '09',
      anyo: '2022',
      concepto: 'Creación de cuenta',
      cantidad: '1200.00',
      cuentaContable: '1664545442338',
      contrapartida: '1665060693545',
      tipo: '7'
    },
    {
      asiento: '6',
      id: 'M-1665390469893',
      dia: '29',
      mes: '09',
      anyo: '2022',
      concepto: 'Creación de cuenta',
      cantidad: '670.00',
      cuentaContable: '1665055630546',
      contrapartida: '1665060693545',
      tipo: '7'
    },
    
     
  ];

  private cuentas:Cuentas[] = [
    //REGULARIZACIÓN
    {
      id: '1665060693545',
      fechaDeCreacion: '01/01/2022',
      tipo: {
            nombre: 'Cuenta de regularización',
            apunte: 'regularización',
            codigo: 'CR',
            },
      identificador: '1',
      nombreCuenta: 'Apertura cuenta',
      descripcion: 'Cuenta de regularización',
      debe: [
              {
                asiento: '0',
                cantidad: '0.00'
              }
            ],
      haber: [
              {
                asiento: '0',
                cantidad: '0.00'
              }
            ],
      saldo: '0.00'
    },
    {
      id: '1665060690045',
      fechaDeCreacion: '01/01/2022',
      tipo: {
            nombre: 'Cuenta de regularización',
            apunte: 'regularización',
            codigo: 'CR',
            },
      identificador: '2',
      nombreCuenta: 'Mercaderías',
      descripcion: 'Cuenta de regularización',
      debe: [
              {
                asiento: '0',
                cantidad: '0.00'
              }
            ],
      haber: [
              {
                asiento: '0',
                cantidad: '0.00'
              }
            ],
      saldo: '0.00'
    },
    {
      id: '1665061785259',
      fechaDeCreacion: '01/01/2022',
      tipo: {
            nombre: 'Cuenta de regularización',
            apunte: 'regularización',
            codigo: 'CR',
            },
      identificador: '3',
      nombreCuenta: 'Deudas',
      descripcion: 'Cuenta de regularización',
      debe: [
              {
                asiento: '0',
                cantidad: '0.00'
              }
            ],
      haber: [
              {
                asiento: '0',
                cantidad: '0.00'
              }
            ],
      saldo: '0.00'
    },
    {
      id: '1665138031910',
      fechaDeCreacion: '01/01/2022',
      tipo: {
            nombre: 'Cuenta de regularización',
            apunte: 'regularización',
            codigo: 'CR',
            },
      identificador: '4',
      nombreCuenta: 'Donaciones y regalos',
      descripcion: 'Cuenta de regularización',
      debe: [
              {
                asiento: '0',
                cantidad: '0.00'
              }
            ],
      haber: [
              {
                asiento: '0',
                cantidad: '0.00'
              }
      ],
      saldo: '0.00'
    },
    {
      id: '1665138152607',
      fechaDeCreacion: '01/01/2022',
      tipo: {
            nombre: 'Cuenta de regularización',
            apunte: 'regularización',
            codigo: 'CR',
            },
      identificador: '5',
      nombreCuenta: 'Sueldos y salarios',
      descripcion: 'Cuenta de regularización',
      debe: [
              {
                asiento: '0',
                cantidad: '0.00'
              }
            ],
      haber: [
              {
                asiento: '0',
                cantidad: '0.00'
              }
            ],
      saldo: '0.00'
    },
    //CUENTAS NORMALES
    {
      id: '1664458286047',
      fechaDeCreacion: '29/09/2022',
      tipo: {
            nombre: 'Cuenta bancaria',
            apunte: 'activo',
            codigo: 'CB',
            },
      identificador: '6',
      nombreCuenta: 'Banco Santander 0012',
      descripcion: 'Esta es la cuenta acabada en 0012',
      debe: [
              {
                asiento: '1',
                cantidad: '3500.00'
              },
            ],
      haber: [
              {
                asiento: '1',
                cantidad: '0.00'
              },
            ],
      saldo: '3500.00'
    },
    {
      id: '1664459194500',
      fechaDeCreacion: '29/09/2022',
      tipo: {
            nombre: 'Cuenta Efectivo',
            apunte: 'activo',
            codigo: 'CE',
            },
      identificador: '7',
      nombreCuenta: 'Efectivo',
      descripcion: 'Dinero en efectivo',
      debe: [
              {
                asiento: '2',
                cantidad: '700.00'
              }
            ],
      haber: [
              {
                asiento: '2',
                cantidad: '0.00'
              }
            ],
      saldo: '700.00'
    },
    {
      id: '1664459337454',
      fechaDeCreacion: '29/09/2022',
      tipo: {
              nombre: 'Cuenta Acreedor',
              apunte: 'pasivo',
              codigo: 'CA',
            },
      identificador: '8',
      nombreCuenta: 'Movistar',
      descripcion: 'Suministro de internet',
      debe: [
              {
                asiento: '3',
                cantidad: '0.00'
              }
            ],
      haber: [
              {
                asiento: '3',
                cantidad: '43.32'
              }
            ],
      saldo: '43.32'
    },
    {
      id: '1664459573944',
      fechaDeCreacion: '29/09/2022',
      tipo: {
              nombre: 'Cuenta Cliente',
              apunte: 'activo',
              codigo: 'CC',
            },
      identificador: '9',
      nombreCuenta: 'María Puertas',
      descripcion: 'Cliente que solicita diseños',
      debe: [
              {
                asiento: '4',
                cantidad: '310.20'
              }
            ],
      haber: [
              {
                asiento: '4',
                cantidad: '0.00'
              }
            ],
      saldo: '310.20'
    },
    {
      id: '1664545442338',
      fechaDeCreacion: '30/09/2022',
      tipo: {
              nombre: 'Deudas Acreedor L/P',
              apunte: 'pasivo',
              codigo: 'DALP',
            },
      identificador: '10',
      nombreCuenta: 'Banco Caixa',
      descripcion: 'Crédito con el banco',
      debe: [
              {
                asiento: '5',
                cantidad: '0.00'
              },
            ],
      haber: [
              {
                asiento: '5',
                cantidad: '1200.00'
              }
            ],
      saldo: '1200.00'
    },
    {
      id: '1665055630546',
      fechaDeCreacion: '06/10/2022',
      tipo: {
              nombre: 'Cuenta Cliente',
              apunte: 'activo',
              codigo: 'CC',
            },
      identificador: '11',
      nombreCuenta: 'Antonio Padilla',
      descripcion: 'Cliente para web',
      debe: [
              {
                asiento: '6',
                cantidad: '670.00'
              }
            ],
      haber: [
              {
                asiento: '6',
                cantidad: '0.00'
              }
            ],
      saldo: '670.00'
    },

  ]

  constructor() { 
    
   }


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


  //Setters
  setMovimientos( info:Movimientos ){
    
    //Guarda el asiento
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

  setCuenta( info:Cuentas ){
      this.cuentas.push(info);
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
      this.cuentas[indice].saldo = saldo;
    } else {
      this.cuentas[indice].saldo = saldo;
    }

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
            listaHaber.push(parseFloat(resp.saldo));
          }

      if (codigos === 'CB' || codigos === 'CE' || codigos === 'CC' || codigos === 'DCLP') {
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


