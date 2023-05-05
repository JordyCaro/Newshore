import { Component } from '@angular/core';
import { FlightService } from '../services/flight.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Flight } from '../models/journey.model';

@Component({
  selector: 'app-flight-form',
  templateUrl: './flight-form.component.html',
  styleUrls: ['./flight-form.component.css'],
})
export class FlightFormComponent {
  isOneWaySelected = true;
  isRoundTripSelected = false;
  selectedOption = 'ida';
  flightSearchForm: FormGroup = this.formBuilder.group({
    tripType: ['round-trip'],
    origin: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
    destination: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
    currency: ['USD', Validators.required]
  },{
    validator: this.originDestinationValidator
  });
  errorMessage: string = '';

  flights!: Flight[];
  rutaDeIda!: Flight[] | string;
  rutaDeVuelta!: Flight[] | string;

  constructor(private flightService: FlightService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.flightService.getFlights().subscribe((flights) => {
      console.log('FLIGHTS: ',flights);
      this.flights = flights;
      // console.log(this.calcularRutaIdaVuelta('PEI', 'CAN'))
    });
    console.log(this.flightSearchForm.value);

    this.flightSearchForm.valueChanges.subscribe(() => {
      console.log(this.flightSearchForm);
      if (!this.flightSearchForm.hasError('originDestinationMatch')) {
        this.errorMessage = '';
        this.flightSearchForm.setErrors(null);
      } else if (this.flightSearchForm.hasError('originDestinationMatch')) {
        this.errorMessage = 'El origen y el destino no pueden ser los mismos';
      }
    });
  
  }
  
  originDestinationValidator(formGroup: FormGroup) {
    const origin = formGroup.get('origin')?.value;
    const destination = formGroup.get('destination')?.value;
    if (!!origin && origin === destination) {
      return { originDestinationMatch: true };
    }
    return { originDestinationMatch: false };
  }

  
  selectOneWay() {
    this.isOneWaySelected = true;
    this.isRoundTripSelected = false;
  }

  selectRoundTrip() {
    this.isOneWaySelected = false;
    this.isRoundTripSelected = true;
  }

  changeOption(option: string) {
    this.flightSearchForm.controls['travelType'].setValue(option);
  }

  onSubmit() {
    console.log('entro')
    this.rutaDeIda = this.calcularRuta(this.flightSearchForm.get('origin')?.value, this.flightSearchForm.get('destination')?.value,10, this.flights.filter(vuelo => vuelo.transport.flightNumber.startsWith('8')) )
    this.rutaDeVuelta = this.calcularRuta(this.flightSearchForm.get('destination')?.value, this.flightSearchForm.get('origin')?.value,10, this.flights.filter(vuelo => vuelo.transport.flightNumber.startsWith('9')) )
    
  }

  calcularRuta(origen: string, destino: string, maxVuelos = 10, vuelos: Flight[]) {
    const vuelosPosibles: Flight[][] = [];
  
    // Buscamos todos los vuelos que tengan como origen el lugar indicado por el usuario.
    vuelos.forEach((vuelo) => {
      if (vuelo.origin === origen) {
        vuelosPosibles.push([vuelo]);
      }
    });
  
    // Si no hay vuelos posibles, la ruta no se puede calcular.
    if (vuelosPosibles.length === 0) {
      return "Lo siento, no hay vuelos disponibles para el origen especificado.";
    }
  
    // Iteramos a través de cada vuelo posible para encontrar la ruta de viaje.
    for (let i = 0; i < maxVuelos - 1; i++) {
      const nuevasRutas: Flight[][] = [];
  
      // Iteramos a través de cada ruta posible en este punto para encontrar vuelos adicionales.
      for (let j = 0; j < vuelosPosibles.length; j++) {
        const ruta = vuelosPosibles[j];
        const ultimoVuelo = ruta[ruta.length - 1];
  
        // Buscamos vuelos adicionales que tengan como origen el destino del último vuelo en la ruta actual.
        vuelos.forEach((vuelo) => {
          if (vuelo.origin === ultimoVuelo.destination) {
            // Si encontramos un vuelo, creamos una nueva ruta que incluya este vuelo.
            nuevasRutas.push([...ruta, vuelo]);
          }
        });
      }
  
      // Si encontramos una ruta que llegue al destino, la devolvemos.
      for (let k = 0; k < nuevasRutas.length; k++) {
        const ruta = nuevasRutas[k];
        const ultimoVuelo = ruta[ruta.length - 1];
        if (ultimoVuelo.destination === destino) {
          return ruta;
        }
      }
  
      // Si no encontramos una ruta que llegue al destino, usamos las nuevas rutas como las posibles rutas para la próxima iteración.
      vuelosPosibles.splice(0, vuelosPosibles.length);
      nuevasRutas.forEach((ruta) => {
        vuelosPosibles.push(ruta);
      });
  
      // Si no hay más vuelos posibles, la ruta no se puede calcular.
      if (vuelosPosibles.length === 0) {
        return "Lo siento, no hay vuelos disponibles para llegar a su destino.";
      }
    }
  
    // Si llegamos aquí, hemos alcanzado el límite máximo de vuelos permitidos sin encontrar una ruta al destino.
    return "Lo siento, no se pudo encontrar una ruta al destino dentro del límite de vuelos permitidos.";
  }
}
