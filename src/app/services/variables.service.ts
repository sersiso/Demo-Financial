import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VariablesService {

  //Ventanas modales
  public abrirModalCuenta:boolean = false;
  public abrirModalAsiento:boolean = false;
  public abrirModalCuentas:boolean = false;
  public abrirModalModificarCuenta:boolean = false;
  public idCuentaModificar:string;
  

  constructor() { }
}
