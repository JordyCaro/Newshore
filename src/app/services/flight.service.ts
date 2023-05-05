import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Flight } from '../models/journey.model';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  public baseUrl = environment.API_URL;
  constructor(private httpClient: HttpClient) {}

  // public getFlights(id: number): Observable<any> {
  //   return this.httpClient.get(`${this.baseUrl}flights/2`);
  // }

  public getFlights(): Observable<Flight[]> {
    return this.httpClient.get<Flight[]>(`${this.baseUrl}flights/2`).pipe(
      map((response: any[]) =>  {
        return response.map((flight: any) => {
          return {
            transport: {
              flightCarrier: flight.flightCarrier,
              flightNumber: flight.flightNumber,
            },
            origin: flight.departureStation,
            destination: flight.arrivalStation,
            price: flight.price,
          };
        });
      })
    );
  }
}
