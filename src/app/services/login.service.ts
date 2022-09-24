import { Injectable } from '@angular/core';
import { empresaModel } from '../models/empresa.models';
import { usuarioModel } from '../models/user.models';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private usuario: usuarioModel = {
    token: '39jahoHÑOhs-29aH02HAÑOja39932jalhjalj54816aaelHI39as932991*ggeE6E24FA14GAgaddEg464HL1Hkdlppph28HAl1',
    user: 'admin',
    password: 'contabilidad',
  };

  private empresa: empresaModel = {
    nombre: 'Sergio, SL',
    direccion: 'C/ Mirlo, 22',
    ciudad: 'Granada',
    fundadaEn: '2022',
    identificacion: 'CIF1246489'
  }

  private comprobarStorage:string = 'tokenPrueba[AplicacionContabilidad]';

  constructor() { }

  recogerUsuario(){
    return this.usuario;
  }

  getEmpresa(){
    return this.empresa;
  }

  estaAutenticado():boolean {
    if (localStorage.getItem(this.comprobarStorage) && 
        localStorage.getItem(this.comprobarStorage) === this.usuario.token &&
        this.usuario.token.length > 2 ) {
        return true;
    } else {
        return false;
    }
  }

  quitarHeaderFooter(){
    if ( window.location.pathname === '/login' ){
      return 'none';
    } else {
      return 'block';
    }
     
  }

  logOut(){
    localStorage.removeItem('tokenPrueba[AplicacionContabilidad]');
  }

}
