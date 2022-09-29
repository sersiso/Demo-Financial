import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { MiEspacioComponent } from './pages/mi-espacio/mi-espacio.component';
import { MovimientoComponent } from './pages/movimiento/movimiento.component';
import { CuentaComponent } from './pages/cuenta/cuenta.component';
import { CuentasComponent } from './pages/cuentas/cuentas.component';
import { MilesPipe } from './pipes/miles.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    MiEspacioComponent,
    MovimientoComponent,
    CuentaComponent,
    CuentasComponent,
    MilesPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
