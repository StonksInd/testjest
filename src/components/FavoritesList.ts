import { getFavorites, removeFavorite } from '../services/favorites';
import { convert } from '../services/conversion';
import { getExchangeRate } from '../services/currencyApi';

export class FavoritesList {
  constructor(private container: HTMLElement) {
    this.render();
  }

  render() {
    const favorites = getFavorites();
    
    this.container.innerHTML = `
      <div class="card">
        <div class="card-header">
          <h5>Favoris</h5>
        </div>
        <div class="card-body">
          ${favorites.length === 0 
            ? '<p class="text-muted">Aucun favori</p>' 
            : '<ul class="list-group" id="favorites-list"></ul>'}
        </div>
      </div>
    `;
    
    if (favorites.length > 0) {
      const list = this.container.querySelector('#favorites-list') as HTMLUListElement;
      
      favorites.forEach((fav, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        
        li.innerHTML = `
          <span>${this.getFavoriteLabel(fav)}</span>
          <div>
            <button class="btn btn-sm btn-outline-primary convert-btn" data-index="${index}">
              Convertir
            </button>
            <button class="btn btn-sm btn-outline-danger remove-btn" data-index="${index}">
              ×
            </button>
          </div>
        `;
        
        list.appendChild(li);
      });
      
      this.setupEventListeners();
    }
  }

  private getFavoriteLabel(fav: any): string {
    const categoryLabels: Record<string, string> = {
      length: 'Longueur',
      temperature: 'Température',
      weight: 'Poids',
      volume: 'Volume',
      currency: 'Monnaie',
      crypto: 'Crypto'
    };
    
    return `${categoryLabels[fav.category]} : ${fav.fromUnit} → ${fav.toUnit}`;
  }

  private setupEventListeners() {
    document.querySelectorAll('.convert-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const index = parseInt((e.target as HTMLElement).dataset.index || '0');
        const favorites = getFavorites();
        const fav = favorites[index];
        
        if (!fav) {
          console.error('Favorite not found at the given index.');
          return;
        }

        const amount = parseFloat(prompt(`Montant à convertir (${fav.fromUnit} → ${fav.toUnit})`) || '1');
        
        let result: number;
        
        if (fav.category === 'currency' || fav.category === 'crypto') {
          result = await getExchangeRate(fav.fromUnit, fav.toUnit, amount);
        } else {
          result = convert(fav.category, fav.fromUnit, fav.toUnit, amount);
        }
        
        alert(`${amount} ${fav.fromUnit} = ${result.toFixed(4)} ${fav.toUnit}`);
      });
    });
    
    document.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        const index = parseInt((e.target as HTMLElement).dataset.index || '0');
        const favorites = getFavorites();
        removeFavorite(favorites[index]);
        this.render();
      });
    });
  }
}