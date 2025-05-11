/**
 * Formate un nombre pour l'affichage avec un nombre spécifique de décimales
 * @param value - La valeur à formater
 * @param decimals - Le nombre de décimales (par défaut: 4)
 * @returns Le nombre formaté sous forme de chaîne
 */
export function formatNumber(value: number, decimals: number = 4): string {
    return value.toFixed(decimals);
  }
  
  /**
   * Obtient l'étiquette lisible pour une catégorie
   * @param category - La clé de catégorie
   * @returns L'étiquette traduite
   */
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
  
  /**
   * Vérifie si une valeur est numérique
   * @param value - La valeur à vérifier
   * @returns true si la valeur est numérique, false sinon
   */
  export function isNumeric(value: any): boolean {
    return !isNaN(parseFloat(value)) && isFinite(value);
  }
  
  /**
   * Génère un identifiant unique
   * @returns Un identifiant unique
   */
  export function generateId(): string {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }