import { addFavorite, getFavorites, removeFavorite, isFavorite } from '../../services/favorites';

describe('Favorites Service', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('adds and retrieves favorites', () => {
    const conversion = { category: 'length', fromUnit: 'm', toUnit: 'km' };
    addFavorite(conversion);
    
    const favorites = getFavorites();
    expect(favorites.length).toBe(1);
    expect(favorites[0]).toEqual(conversion);
  });

  it('does not add duplicate favorites', () => {
    const conversion = { category: 'length', fromUnit: 'm', toUnit: 'km' };
    addFavorite(conversion);
    addFavorite(conversion);
    
    expect(getFavorites().length).toBe(1);
  });

  it('removes favorites', () => {
    const conversion = { category: 'length', fromUnit: 'm', toUnit: 'km' };
    addFavorite(conversion);
    expect(getFavorites().length).toBe(1);
    
    removeFavorite(conversion);
    expect(getFavorites().length).toBe(0);
  });

  it('checks if conversion is favorite', () => {
    const conversion = { category: 'length', fromUnit: 'm', toUnit: 'km' };
    expect(isFavorite(conversion)).toBe(false);
    
    addFavorite(conversion);
    expect(isFavorite(conversion)).toBe(true);
  });
});