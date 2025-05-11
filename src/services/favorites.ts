const FAVORITES_KEY = 'unitConverterFavorites';

export function getFavorites(): any[] {
  const favorites = localStorage.getItem(FAVORITES_KEY);
  return favorites ? JSON.parse(favorites) : [];
}

export function addFavorite(conversion: any) {
  const favorites = getFavorites();
  if (!isFavorite(conversion)) {
    favorites.push(conversion);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
}

export function removeFavorite(conversion: any) {
  let favorites = getFavorites();
  favorites = favorites.filter(fav => 
    !(fav.category === conversion.category && 
      fav.fromUnit === conversion.fromUnit && 
      fav.toUnit === conversion.toUnit)
  );
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function isFavorite(conversion: any): boolean {
  const favorites = getFavorites();
  return favorites.some(fav => 
    fav.category === conversion.category && 
    fav.fromUnit === conversion.fromUnit && 
    fav.toUnit === conversion.toUnit
  );
}