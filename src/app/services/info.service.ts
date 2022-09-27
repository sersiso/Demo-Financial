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

  private tipoCuenta:tipoCuenta = {
    cBanco: 'CB',
    cEfectivo: 'CE',
    cCliente: 'CC',
    cAcreedor: 'CA',
    cDeudaAcreedorLargoPlazo: 'CDALP',
    cDeudaClienteLargoPlazo: 'CDCLP',
  }

  private movimientos:Movimientos[] = [
    {
      id: 'asd56aa822ff5sfa',
      dia: '23',
      mes: '09',
      anyo: '2022',
      cantidad: '90',
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
      cantidad: '120',
      concepto: 'Cobro de proyecto tarjetas visita',
      cuentaContable: 'CB1/Santander',
      contrapartida: 'CC2/Esther',
      tipo: 'Ingreso',
    }
  ];

  private cuentas:Cuentas[] = [
    {
      id: 'lasi214jashñHISOkd2',
      fechaDeCreacion: '10/09/2022',
      tipo: 'CM',
      identificador: '1',
      nombreCuenta: 'Banco Santander 0012',
      descripcion: 'Esta es la cuenta acabada en 0012',
      debe:'370.06',
      haber: '50.48',
      saldo: '420.54'
    },
    {
      id: 'la22314jasfISOkd2',
      fechaDeCreacion: '10/09/2022',
      tipo: 'CC',
      identificador: '2',
      nombreCuenta: 'Esther tórtola',
      descripcion: 'Cliente de azulejos',
      debe: '60.04',
      haber: '0',
      saldo: '0'
    },
    {
      id: 'la22323451fdSOkd2',
      fechaDeCreacion: '12/09/2022',
      tipo: 'CP',
      identificador: '3',
      nombreCuenta: 'La vaca que rie',
      descripcion: 'Proveedor de queso',
      debe: '40.44',
      haber: '200.47',
      saldo: '-160.03'
    },
  ]

  constructor() {  }

  //Peticion de datos
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

}

export interface tipo {
  ingreso: string;
  pago: string;
  deuda: string;
}

export interface moneda {
  simboloMoneda:string,
  nombreMoneda:string
}

export interface tipoCuenta {
  cBanco: string,
  cEfectivo: string,
  cCliente: string,
  cAcreedor: string,
  cDeudaAcreedorLargoPlazo: string,
  cDeudaClienteLargoPlazo: string,
}
