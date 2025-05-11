import { convert } from '../../services/conversion';

describe('Conversion Service', () => {
  describe('Length Conversion', () => {
    it('converts meters to kilometers', () => {
      expect(convert('length', 'm', 'km', 1000)).toBeCloseTo(1);
    });
    
    it('converts inches to feet', () => {
      expect(convert('length', 'in', 'ft', 12)).toBeCloseTo(1);
    });
    
    it('converts miles to yards', () => {
      expect(convert('length', 'mi', 'yd', 1)).toBeCloseTo(1760);
    });
  });

  describe('Temperature Conversion', () => {
    it('converts Celsius to Fahrenheit', () => {
      expect(convert('temperature', '°C', '°F', 0)).toBeCloseTo(32);
      expect(convert('temperature', '°C', '°F', 100)).toBeCloseTo(212);
    });
    
    it('converts Fahrenheit to Kelvin', () => {
      expect(convert('temperature', '°F', 'K', 32)).toBeCloseTo(273.15);
    });
  });

  describe('Weight Conversion', () => {
    it('converts kilograms to grams', () => {
      expect(convert('weight', 'kg', 'g', 1)).toBeCloseTo(1000);
    });
    
    it('converts pounds to kilograms', () => {
      expect(convert('weight', 'lb', 'kg', 1)).toBeCloseTo(0.453592);
    });
  });

  describe('Volume Conversion', () => {
    it('converts liters to gallons', () => {
      expect(convert('volume', 'L', 'gal', 3.78541)).toBeCloseTo(1);
    });
  });
});