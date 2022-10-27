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
                  { asiento: '3', cantidad: '0.00' },
                  { asiento: '4', cantidad: '0.00' },
                  { asiento: '5', cantidad: '0.00' },
                  { asiento: '7', cantidad: '0.00' },
                ],
          haber: [
                  { asiento: '0', cantidad: '0.00' },
                  { asiento: '1', cantidad: '0.00' },
                  { asiento: '2', cantidad: '0.00' },
                  { asiento: '3', cantidad: '0.00' },
                  { asiento: '4', cantidad: '0.00' },
                  { asiento: '5', cantidad: '0.00' },
                  { asiento: '7', cantidad: '0.00' },
                ],
          saldo: '0.00'
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
                  { asiento: '6', cantidad: '0.00' },
                  { asiento: '11', cantidad: '230.40' },
                ],
          haber: [
                  { asiento: '0', cantidad: '0.00' },
                  { asiento: '6', cantidad: '350.00' },
                  { asiento: '11', cantidad: '0.00' },
                ],
          saldo: '119.60'
        },
        {
          id: '1665061785259',
          fechaDeCreacion: '01/01/2022',
          tipo: { nombre: 'Cuenta de regularización', apunte: 'regularización', codigo: 'CR' },
          identificador: '3',
          nombreCuenta: 'Deudas',
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
          id: '1665138031910',
          fechaDeCreacion: '01/01/2022',
          tipo: { nombre: 'Cuenta de regularización', apunte: 'regularización', codigo: 'CR' },
          identificador: '4',
          nombreCuenta: 'Prestar, donar y regalar',
          descripcion: 'Cuenta de regularización',
          debe: [
                  { asiento: '0', cantidad: '0.00' },
                  { asiento: '8', cantidad: '0.00' },
                ],
          haber: [
                  { asiento: '0', cantidad: '0.00' },
                  { asiento: '8', cantidad: '650.46' },
                ],
          saldo: '650.46'
        },
        {
          id: '1665138152607',
          fechaDeCreacion: '01/01/2022',
          tipo: { nombre: 'Cuenta de regularización', apunte: 'regularización', codigo: 'CR' },
          identificador: '5',
          nombreCuenta: 'Sueldos y salarios',
          descripcion: 'Cuenta de regularización',
          debe: [
                  { asiento: '0', cantidad: '0.00' },
                  { asiento: '9', cantidad: '0.00' },
                  { asiento: '10', cantidad: '0.00' },
                ],
          haber: [
                  { asiento: '0', cantidad: '0.00' },
                  { asiento: '9', cantidad: '1200.50' },
                  { asiento: '10', cantidad: '1200.50' },
                ],
          saldo: '2401.00'
        },
        {
          id: '1665138152648',
          fechaDeCreacion: '01/01/2022',
          tipo: { nombre: 'Cuenta de regularización', apunte: 'regularización', codigo: 'CR' },
          identificador: '6',
          nombreCuenta: 'Créditos',
          descripcion: 'Cuenta de regularización',
          debe: [
                  { asiento: '0', cantidad: '0.00' },
                ],
          haber: [
                  { asiento: '0', cantidad: '0.00' },
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
          identificador: '7',
          nombreCuenta: 'BANCO SANTANDER 1014',
          descripcion: 'Nueva cuenta bancaria',
          debe: [
                  { asiento: '1', cantidad: '0.00' },
                  { asiento: '9', cantidad: '1200.50' },
                  { asiento: '10', cantidad: '1200.50' },
                ],
          haber: [
                  { asiento: '1', cantidad: '0.00' },
                  { asiento: '9', cantidad: '0.00' },
                  { asiento: '10', cantidad: '0.00' },
                ],
          saldo: '2401.00'
        },
        {
          id: '2e24eb1938a9462e8a39565ac218fd19',
          fechaDeCreacion: '29/09/2022',
          tipo: {
                nombre: 'Dinero en efectivo',
                apunte: 'activo',
                codigo: 'CE',
                },
          identificador: '8',
          nombreCuenta: 'EFECTIVO',
          descripcion: 'Dinero debajo del colchón',
          debe: [
                  { asiento: '2', cantidad: '00.00' },
                  { asiento: '8', cantidad: '650.46' },
                ],
          haber: [
                  { asiento: '2', cantidad: '0.00' },
                  { asiento: '8', cantidad: '0.00' },
                ],
          saldo: '650.46'
        },
        {
          id: '2e24eb193832442e8a39565ac218as40',
          fechaDeCreacion: '29/09/2022',
          tipo: {
                nombre: 'Proveedor',
                apunte: 'pasivo',
                codigo: 'CP',
                },
          identificador: '9',
          nombreCuenta: 'PAPELERÍA, SL',
          descripcion: 'Proveedor de papelería',
          debe: [
                  { asiento: '3', cantidad: '0.00' },
                  { asiento: '11', cantidad: '0.00' },
                ],
          haber: [
                  { asiento: '3', cantidad: '0.00' },
                  { asiento: '11', cantidad: '230.40' },
                ],
          saldo: '230.40'
        }, 
        {
          id: '2e24eb193832442e8a39565ac218as55',
          fechaDeCreacion: '29/09/2022',
          tipo: {
                nombre: 'Cliente',
                apunte: 'activo',
                codigo: 'CC',
                },
          identificador: '10',
          nombreCuenta: 'DISEÑADORES, SA',
          descripcion: 'Solicitan diseños eventualmente',
          debe: [
                  { asiento: '4', cantidad: '0.00' },
                  { asiento: '6', cantidad: '350.00' },
                ],
          haber: [
                  { asiento: '4', cantidad: '0.00' },
                  { asiento: '6', cantidad: '0.00' },
                ],
          saldo: '350.00'
        },
        {
          id: '990cc3dac13a4bd99297da377f05cf06',
          fechaDeCreacion: '29/09/2022',
          tipo: {
                nombre: 'Deudas acreedor a L/P',
                apunte: 'pasivo',
                codigo: 'DALP',
                },
          identificador: '11',
          nombreCuenta: 'BBVA (CRÉDITO)',
          descripcion: 'Crédito para compra de coche',
          debe: [
                  { asiento: '5', cantidad: '0.00' },
                ],
          haber: [
                  { asiento: '5', cantidad: '0.00' },
                ],
          saldo: '0.00'
        },
        {
          id: 'd143c84edf3e49acba788bd990e7ef01',
          fechaDeCreacion: '18/10/2022',
          tipo: {
                nombre: 'Cliente',
                apunte: 'activo',
                codigo: 'CC',
                },
          identificador: '11',
          nombreCuenta: 'SERGIO',
          descripcion: 'Solicita ilustraciones',
          debe: [
                  { asiento: '7', cantidad: '0.00' },
                ],
          haber: [
                  { asiento: '7', cantidad: '0.00' },
                ],
          saldo: '0.00'
        },
    
      ]

    private movimientos:Movimientos[] = [

         {
          asiento: '1',
          id: 'M-e56c6d8530194cb086e5c616abb68532',
          dia: '29',
          mes: '09',
          anyo: '2022',
          concepto: 'Creación de cuenta',
          cantidad: '0.00',
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
          cantidad: '0.00',
          cuentaContable: '2e24eb1938a9462e8a39565ac218fd19',
          contrapartida: '1665060693545',
          tipo: '7'
        }, 
        {
          asiento: '3',
          id: 'M-e56c6d8530194cb086e6c616abb68534',
          dia: '29',
          mes: '09',
          anyo: '2022',
          concepto: 'Creación de cuenta',
          cantidad: '0.00',
          cuentaContable: '2e24eb193832442e8a39565ac218as40',
          contrapartida: '1665060693545',
          tipo: '7'
        }, 
        {
          asiento: '4',
          id: 'M-e56c6d8530194cb086e6c616abb68535',
          dia: '29',
          mes: '09',
          anyo: '2022',
          concepto: 'Creación de cuenta',
          cantidad: '0.00',
          cuentaContable: '2e24eb193832442e8a39565ac218as55',
          contrapartida: '1665060693545',
          tipo: '7'
        }, 
        {
          asiento: '5',
          id: 'M-e56c6d8530194cb086e6c616abb68534',
          dia: '29',
          mes: '09',
          anyo: '2022',
          concepto: 'Creación de cuenta',
          cantidad: '0.00',
          cuentaContable: '990cc3dac13a4bd99297da377f05cf06',
          contrapartida: '1665060693545',
          tipo: '7'
        }, 
        {
          asiento: '6',
          id: 'M-024d43e4063b4bbda7f7d1253cf20062',
          dia: '16',
          mes: '10',
          anyo: '2022',
          concepto: 'Factura 34',
          cantidad: '350.00',
          cuentaContable: '2e24eb193832442e8a39565ac218as55',
          contrapartida: '1665060690045',
          tipo: '5'
        }, 
        {
          asiento: '7',
          id: 'M-6f4f43ed8580426ebf49d272c0dd901e',
          dia: '19',
          mes: '10',
          anyo: '2022',
          concepto: 'Creación de cuenta',
          cantidad: '0.00',
          cuentaContable: 'd143c84edf3e49acba788bd990e7ef01',
          contrapartida: '1665060693545',
          tipo: '7'
        }, 
        {
          asiento: '8',
          id: 'M-78b57a004a544262a79ead577f0c9e27',
          dia: '09',
          mes: '10',
          anyo: '2022',
          concepto: 'Dinero guardado en la hucha',
          cantidad: '650.46',
          cuentaContable: '2e24eb1938a9462e8a39565ac218fd19',
          contrapartida: '1665138031910',
          tipo: '1'
        }, 
        {
          asiento: '9',
          id: 'M-5fb1a2dfe9634dd4848ce0f211126d8d',
          dia: '04',
          mes: '10',
          anyo: '2022',
          concepto: 'Nómina Octubre',
          cantidad: '1200.50',
          cuentaContable: '793d2d7c25124a23ac189ea595998fe9',
          contrapartida: '1665138152607',
          tipo: '1'
        }, 
        {
          asiento: '10',
          id: 'M-5fb1a2dfe9634dd4668ce0f21115d834',
          dia: '03',
          mes: '11',
          anyo: '2022',
          concepto: 'Nómina Noviembre',
          cantidad: '1200.50',
          cuentaContable: '793d2d7c25124a23ac189ea595998fe9',
          contrapartida: '1665138152607',
          tipo: '1'
        }, 
        {
          asiento: '11',
          id: 'M-f7b8ae1be1044fada17fc42704da1de6',
          dia: '01',
          mes: '11',
          anyo: '2022',
          concepto: 'Dejo a deber Factura 55',
          cantidad: '230.40',
          cuentaContable: '1665060690045',
          contrapartida: '2e24eb193832442e8a39565ac218as40',
          tipo: '6'
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

  mesesNombres:any[] = [
      {
        nombre:'Enero',
        mes: '01',
      },
      {
        nombre:'Febrero',
        mes: '02',
      },
      {
        nombre:'Marzo',
        mes: '03',
      },
      {
        nombre:'Abril',
        mes: '04',
      },
      {
        nombre:'Mayo',
        mes: '05',
      },
      {
        nombre:'Junio',
        mes: '06',
      },
      {
        nombre:'Julio',
        mes: '07',
      },
      {
        nombre:'Agosto',
        mes: '08',
      },
      {
        nombre:'Septiembre',
        mes: '09',
      },
      {
        nombre:'Octubre',
        mes: '10',
      },
      {
        nombre:'Noviembre',
        mes: '11',
      },
      {
        nombre:'Diciembre',
        mes: '12',
      }            
];

    datosAnuales:any = [
      {
        anyo: '2022',
        diario: {
          movimientos: this.movimientos
                  },
        mayor: {
          cuentas: this.cuentas
                },
      }
    ] 
  

    getCuentasVariables(){
      const anyoDeTrabajo = '2022';
      let indice = this.datosAnuales.findIndex( i => i.anyo === anyoDeTrabajo);
      return this.datosAnuales[indice].mayor.cuentas;
    }

    getMovimientosVariables(){
      const anyoDeTrabajo = '2022';
      let indice = this.datosAnuales.findIndex( i => i.anyo === anyoDeTrabajo);
      return this.datosAnuales[indice].diario.movimientos;
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

    getMesesNombres(){
      return this.mesesNombres;
    }



}



