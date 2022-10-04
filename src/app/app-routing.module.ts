import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { MiEspacioComponent } from './pages/mi-espacio/mi-espacio.component';
import { MovimientoComponent } from './pages/movimiento/movimiento.component';
import { CuentaComponent } from './pages/cuenta/cuenta.component';
import { CuentasComponent } from './pages/cuentas/cuentas.component';
import { ModificarCuentaComponent } from './pages/modificar-cuenta/modificar-cuenta.component';

const routes: Routes = [
  { path: 'inicio', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'mi-espacio', component: MiEspacioComponent, canActivate: [ AuthGuard ] },
  { path: 'movimiento/:id', component: MovimientoComponent, canActivate: [ AuthGuard ] },
  { path: 'cuenta', component: CuentaComponent, canActivate: [ AuthGuard ] },
  { path: 'cuentas', component: CuentasComponent, canActivate: [ AuthGuard ] },
  { path: 'modificar-cuenta/:id', component: ModificarCuentaComponent, canActivate: [ AuthGuard ] },
  { path: '**', pathMatch: 'full', redirectTo: 'inicio' }
];


@NgModule({
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
