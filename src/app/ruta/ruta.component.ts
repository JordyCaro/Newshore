import { Component, Input, OnInit } from '@angular/core';
import { Flight } from '../models/journey.model';

@Component({
  selector: 'app-ruta',
  templateUrl: './ruta.component.html',
  styleUrls: ['./ruta.component.css']
})
export class RutaComponent implements OnInit {
  @Input() ruta!: Flight[] | string | any;
  @Input() currency!: string;

  existeRuta = false;
  constructor() { }

  ngOnInit(): void {
    console.log(this.ruta)
  }

  ngOnChanges() {
    this.existeRuta = Array.isArray(this.ruta);
  }
}
