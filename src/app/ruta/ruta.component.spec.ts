import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaComponent } from './ruta.component';

describe('RutaComponent', () => {
  let component: RutaComponent;
  let fixture: ComponentFixture<RutaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('when input `ruta` is an array of flights', () => {
    beforeEach(() => {
      component.ruta = [
        { 
          origin: 'MAD', 
          destination: 'BCN', 
          transport: { 
            flightCarrier: 'Iberia', 
            flightNumber: 'IB1234' 
          }, 
          price: 100 
        },
        { 
          origin: 'BCN', 
          destination: 'MAD', 
          transport: { 
            flightCarrier: 'Vueling', 
            flightNumber: 'VY5678' 
          }, 
          price: 80 
        }
      ];
      fixture.detectChanges();
    });

    it('should show the flights details', () => {
      const element = fixture.nativeElement.querySelectorAll('.vuelo');
      console.log('element', element)
      const vuelos = fixture.nativeElement.querySelectorAll('.vuelo');
      expect(vuelos.length).toBe(2);

      const vuelo1 = vuelos[0];
      expect(vuelo1.querySelector('.vuelo-origin').textContent).toBe('MAD');
      expect(vuelo1.querySelector('.vuelo-destination').textContent).toBe('BCN');
      expect(vuelo1.querySelector('.vuelo-carrier').textContent).toBe('Iberia');
      expect(vuelo1.querySelector('.vuelo-number').textContent).toBe('IB1234');
      expect(vuelo1.querySelector('.vuelo-price').textContent).toBe('$ 100');

      const vuelo2 = vuelos[1];
      expect(vuelo2.querySelector('.vuelo-origin').textContent).toBe('BCN');
      expect(vuelo2.querySelector('.vuelo-destination').textContent).toBe('MAD');
      expect(vuelo2.querySelector('.vuelo-carrier').textContent).toBe('Vueling');
      expect(vuelo2.querySelector('.vuelo-number').textContent).toBe('VY5678');
      expect(vuelo2.querySelector('.vuelo-price').textContent).toBe('$ 80');
    });
  });

  describe('when input `ruta` is a string', () => {
    beforeEach(() => {
      component.ruta = 'No hay vuelos disponibles';
      fixture.detectChanges();
    });

    it('should show the error message', () => {
      const mensaje = fixture.nativeElement.querySelector('h2');
      expect(mensaje).toBeTruthy();
      expect(mensaje.textContent).toBe('No hay vuelos disponibles');
    });
  });
});