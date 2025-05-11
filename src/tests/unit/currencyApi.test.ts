import { getExchangeRate } from '../../services/currencyApi';

// Mock de l'API
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ eur: 1.2 }),
  })
) as jest.Mock;

describe('Currency API Service', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('fetches exchange rate from API', async () => {
    const rate = await getExchangeRate('USD', 'EUR', 1);
    expect(rate).toBeCloseTo(1.2);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('returns same amount when currencies are identical', async () => {
    const rate = await getExchangeRate('USD', 'USD', 100);
    expect(rate).toBe(100);
    expect(fetch).not.toHaveBeenCalled();
  });

  it('throws error when API fails', async () => {
    (fetch as jest.Mock).mockImplementationOnce(() => Promise.reject('API error'));
    await expect(getExchangeRate('USD', 'EUR', 1)).rejects.toThrow('Impossible de récupérer le taux de change');
  });
});