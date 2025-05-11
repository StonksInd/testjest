const API_URL = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies';

export async function getExchangeRate(from: string, to: string, amount: number): Promise<number> {
  if (from === to) return amount;

  try {
    const fromLower = from.toLowerCase();
    const toLower = to.toLowerCase();
    const response = await fetch(`${API_URL}/${fromLower}/${toLower}.json`);
    const data = await response.json();
    return amount * data[toLower];
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    throw new Error('Impossible de récupérer le taux de change');
  }
}