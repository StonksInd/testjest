
export function formatNumber(value: number, decimals: number = 4): string {
    return value.toFixed(decimals);
  }
  

  export function getCategoryLabel(category: string): string {
    const labels: Record<string, string> = {
      length: 'Longueur',
      temperature: 'Température',
      weight: 'Poids',
      volume: 'Volume',
      currency: 'Monnaie',
      crypto: 'Crypto-monnaie'
    };
    
    return labels[category] || category;
  }
  

  export function isNumeric(value: any): boolean {
    return !isNaN(parseFloat(value)) && isFinite(value);
  }
  

  export function generateId(): string {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }