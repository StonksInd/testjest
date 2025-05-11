const CDN_PRIMARY = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies';
const CDN_FALLBACK = 'https://latest.currency-api.pages.dev/v1/currencies';

export async function getExchangeRate(from: string, to: string, amount: number): Promise<number> {
  if (from === to) return amount;

  const fromLower = from.toLowerCase();
  const toLower = to.toLowerCase();

  const endpoints = [
    `${CDN_PRIMARY}/${fromLower}.json`,
    `${CDN_FALLBACK}/${fromLower}.json`,
  ];

  for (const url of endpoints) {
    try {
      const response = await fetch(url);
      if (!response.ok) continue;

      const data = await response.json();
      if (data[fromLower] && typeof data[fromLower][toLower] === 'number') {
        return amount * data[fromLower][toLower];
      }
    } catch (error) {
      console.warn(`Fetch failed at: ${url}`, error);
    }
  }

  throw new Error('Impossible de récupérer le taux de change');
}
