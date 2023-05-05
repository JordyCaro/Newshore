import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyConversion'
})
export class CurrencyConversionPipe implements PipeTransform {
  transform(value: number, targetCurrency: string): number {
    // Se define el factor de conversión de USD a las otras monedas
    const conversionFactors: any = {
      'EUR': 0.82,
      'GBP': 0.72,
      'JPY': 109.34
    };

    // Se comprueba si la moneda de destino está entre las monedas soportadas
    if (conversionFactors[targetCurrency]) {
      // Se realiza la conversión
      const convertedValue = value * conversionFactors[targetCurrency];
      // Se redondea el valor a dos decimales
      return Math.round(convertedValue * 100) / 100;
    } else {
      // Si la moneda de destino no es válida, se devuelve el valor original
      return value;
    }
  }
}