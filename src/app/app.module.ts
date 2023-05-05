import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FlightFormComponent } from './flight-form/flight-form.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SelectFlightComponent } from './select-flight/select-flight.component';
import { RutaComponent } from './ruta/ruta.component';
import { CurrencyConversionPipe } from './pipes/currency-conversion.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FlightFormComponent,
    HomeComponent,
    SelectFlightComponent,
    RutaComponent,
    CurrencyConversionPipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
