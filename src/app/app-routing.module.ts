import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { MiEspacioComponent } from './pages/mi-espacio/mi-espacio.component';

const routes: Routes = [
  { path: 'inicio', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'mi-espacio', component: MiEspacioComponent, canActivate: [ AuthGuard ] },
  { path: '**', pathMatch: 'full', redirectTo: 'inicio' }
];


@NgModule({
  imports: [
    RouterModule.forRoot( routes, { onSameUrlNavigation: 'reload' } )
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule { }
