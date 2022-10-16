import { Cuentas } from "../models/cuenta.models"
import { Movimientos } from "../models/movimientos.models"

export class Variables {

    private cuentas:Cuentas[] = [
        //CUENTAS POR DEFECTO
        {
          id: '1665060693545',
          fechaDeCreacion: '01/01/2022',
          tipo: { nombre: 'Cuenta de regularización', apunte: 'regularización', codigo: 'CR' },
          identificador: '1',
          nombreCuenta: 'Apertura cuenta',
          descripcion: 'Cuenta de regularización',
          debe: [
                  { asiento: '0', cantidad: '0.00' },
                  { asiento: '1', cantidad: '0.00' },
                  { asiento: '2', cantidad: '0.00' },
                ],
          haber: [
                  { asiento: '0', cantidad: '0.00' },
                  { asiento: '1', cantidad: '3500.00' },
                  { asiento: '2', cantidad: '1200.00' },
                ],
          saldo: '4700.00'
        },
        {
          id: '1665060690045',
          fechaDeCreacion: '01/01/2022',
          tipo: { nombre: 'Cuenta de regularización', apunte: 'regularización', codigo: 'CR' },
          identificador: '2',
          nombreCuenta: 'Mercaderías',
          descripcion: 'Cuenta de regularización',
          debe: [
                  { asiento: '0', cantidad: '0.00' },
                ],
          haber: [
                  { asiento: '0', cantidad: '0.00' },
                ],
          saldo: '0.00'
        },
        {
          id: '1665061785259',
          fechaDeCreacion: '01/01/2022',
          tipo: { nombre: 'Cuenta de regularización', apunte: 'regularización', codigo: 'CR' },
          identificador: '3',
          nombreCuenta: 'Deudas',
          descripcion: 'Cuenta de regularización',
          debe: [
                  { asiento: '0', cantidad: '0.00' }
                ],
          haber: [
                  { asiento: '0', cantidad: '0.00' }
                ],
          saldo: '0.00'
        },
        {
          id: '1665138031910',
          fechaDeCreacion: '01/01/2022',
          tipo: { nombre: 'Cuenta de regularización', apunte: 'regularización', codigo: 'CR' },
          identificador: '4',
          nombreCuenta: 'Prestar, donar y regalar',
          descripcion: 'Cuenta de regularización',
          debe: [
                  { asiento: '0', cantidad: '0.00' },
                ],
          haber: [
                  { asiento: '0', cantidad: '0.00' },
                ],
          saldo: '0.00'
        },
        {
          id: '1665138152607',
          fechaDeCreacion: '01/01/2022',
          tipo: { nombre: 'Cuenta de regularización', apunte: 'regularización', codigo: 'CR' },
          identificador: '5',
          nombreCuenta: 'Sueldos y salarios',
          descripcion: 'Cuenta de regularización',
          debe: [
                  { asiento: '0', cantidad: '0.00' }
                ],
          haber: [
                  { asiento: '0', cantidad: '0.00' }
                ],
          saldo: '0.00'
        },
    
        //CUENTAS NORMALES ----------------------------------------
         {
          id: '793d2d7c25124a23ac189ea595998fe9',
          fechaDeCreacion: '29/09/2022',
          tipo: {
                nombre: 'Cuenta bancaria',
                apunte: 'activo',
                codigo: 'CB',
                },
          identificador: '6',
          nombreCuenta: 'Banco Santander 1014',
          descripcion: 'Nueva cuenta bancaria',
          debe: [
                  { asiento: '1', cantidad: '3500.00' },
                ],
          haber: [
                  { asiento: '1', cantidad: '0.00' },
                ],
          saldo: '3500.00'
        },
        {
          id: '2e24eb1938a9462e8a39565ac218fd19',
          fechaDeCreacion: '29/09/2022',
          tipo: {
                nombre: 'Dinero en efectivo',
                apunte: 'activo',
                codigo: 'CE',
                },
          identificador: '7',
          nombreCuenta: 'Efectivo',
          descripcion: 'Dinero debajo del colchón',
          debe: [
                  { asiento: '2', cantidad: '1200.00' },
                ],
          haber: [
                  { asiento: '2', cantidad: '0.00' },
                ],
          saldo: '1200.00'
        } 
    
      ]

    private movimientos:Movimientos[] = [

         {
          asiento: '1',
          id: 'M-e56c6d8530194cb086e5c616abb68532',
          dia: '29',
          mes: '09',
          anyo: '2022',
          concepto: 'Creación de cuenta',
          cantidad: '3500.00',
          cuentaContable: '793d2d7c25124a23ac189ea595998fe9',
          contrapartida: '1665060693545',
          tipo: '7'
        }, 
        {
          asiento: '2',
          id: 'M-e56c6d8530194cb086e6c616abb68533',
          dia: '29',
          mes: '09',
          anyo: '2022',
          concepto: 'Creación de cuenta',
          cantidad: '1200.00',
          cuentaContable: '2e24eb1938a9462e8a39565ac218fd19',
          contrapartida: '1665060693545',
          tipo: '7'
        }, 
    ]

    private colores = {
        verde: '#5f9ea0',
        rojo: '#ff7f50',
        blanco: '#fff'
    }

    private moneda = {
        simboloMoneda: '€',
        nombreMoneda: 'Euro'
      }

    private tipoMovimiento = [
        {
          id: '1',
          nombre: 'Cobro'
        },
        {
          id: '2',
          nombre: 'Pago'
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
        },
        {
          id: '8',
          nombre: 'Traspaso'
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


    datosAnuales = {
        anyo: 2022,
        asientos: [
                
                  ],
        cuentas: [
  
                  ]
              }
  

    getCuentasVariables(){
        return this.cuentas;
    }

    getMovimientosVariables(){
        return this.movimientos;
    }

    getTipoCuentaVariables(){
       return this.tipoCuenta;
    }

    getTipoMovimientoVariables(){
        return this.tipoMovimiento;
    }

    getColoresVariables(){
        return this.colores;
    }

    getMonedaVariables(){
        return this.moneda;
    }



}


