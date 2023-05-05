export type Transport = {
    flightCarrier: string;
    flightNumber: string;
  }

export type Flight = {
    transport: Transport;
    origin: string;
    destination: string;
    price: number;
}

export type Journey = {
    flights: Flight[];
    origin: string;
    destination: string;
    price: number;
}