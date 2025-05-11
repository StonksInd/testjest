export function convert(category: string, fromUnit: string, toUnit: string, value: number): number {
    if (fromUnit === toUnit) return value;
  
    switch (category) {
      case 'length':
        return convertLength(fromUnit, toUnit, value);
      case 'temperature':
        return convertTemperature(fromUnit, toUnit, value);
      case 'weight':
        return convertWeight(fromUnit, toUnit, value);
      case 'volume':
        return convertVolume(fromUnit, toUnit, value);
      default:
        throw new Error('Catégorie de conversion non supportée');
    }
  }
  
  function convertLength(fromUnit: string, toUnit: string, value: number): number {
    const toMeter: Record<string, number> = {
      m: 1,
      km: 1000,
      ft: 0.3048,
      in: 0.0254,
      yd: 0.9144,
      mi: 1609.344
    };
  
    const valueInMeters = value * toMeter[fromUnit];
    return valueInMeters / toMeter[toUnit];
  }
  
  function convertTemperature(fromUnit: string, toUnit: string, value: number): number {
    if (fromUnit === '°C') {
      if (toUnit === '°F') return (value * 9/5) + 32;
      if (toUnit === 'K') return value + 273.15;
    }
    
    if (fromUnit === '°F') {
      if (toUnit === '°C') return (value - 32) * 5/9;
      if (toUnit === 'K') return (value - 32) * 5/9 + 273.15;
    }
    
    if (fromUnit === 'K') {
      if (toUnit === '°C') return value - 273.15;
      if (toUnit === '°F') return (value - 273.15) * 9/5 + 32;
    }
    
    return value;
  }
  
  function convertWeight(fromUnit: string, toUnit: string, value: number): number {
    const toGram: Record<string, number> = {
      g: 1,
      kg: 1000,
      lb: 453.592
    };
  
    const valueInGrams = value * toGram[fromUnit];
    return valueInGrams / toGram[toUnit];
  }
  
  function convertVolume(fromUnit: string, toUnit: string, value: number): number {
    const toLiter: Record<string, number> = {
      L: 1,
      gal: 3.78541
    };
  
    const valueInLiters = value * toLiter[fromUnit];
    return valueInLiters / toLiter[toUnit];
  }