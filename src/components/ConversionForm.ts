import { convert } from '../services/conversion';
import { addToHistory } from '../services/history';
import { addFavorite, isFavorite, removeFavorite } from '../services/favorites';
import { getExchangeRate } from '../services/currencyApi';

type ConversionCategory = 'length' | 'temperature' | 'weight' | 'volume' | 'currency' | 'crypto';

export class ConversionForm {
  private form!: HTMLFormElement;
  private resultDiv!: HTMLDivElement;
  private favoriteButton!: HTMLButtonElement;

  constructor(private container: HTMLElement) {
    this.render();
    this.setupEventListeners();
  }

  private render() {
    this.container.innerHTML = `
      <form id="conversion-form" class="card p-4">
        <div class="mb-3">
          <label for="category" class="form-label">Catégorie</label>
          <select id="category" class="form-select" required>
            <option value="">Sélectionnez une catégorie</option>
            <option value="length">Longueur</option>
            <option value="temperature">Température</option>
            <option value="weight">Poids</option>
            <option value="volume">Volume</option>
            <option value="currency">Monnaie</option>
            <option value="crypto">Crypto-monnaie</option>
          </select>
        </div>
        
        <div class="row mb-3">
          <div class="col-md-6">
            <label for="from-unit" class="form-label">De</label>
            <select id="from-unit" class="form-select" disabled required></select>
          </div>
          <div class="col-md-6">
            <label for="to-unit" class="form-label">À</label>
            <select id="to-unit" class="form-select" disabled required></select>
          </div>
        </div>
        
        <div class="mb-3">
          <label for="amount" class="form-label">Montant</label>
          <input type="number" id="amount" class="form-control" step="any" required>
        </div>
        
        <button type="submit" class="btn btn-primary mb-3">Convertir</button>
        <button type="button" id="favorite-btn" class="btn btn-outline-secondary" disabled>
          Ajouter aux favoris
        </button>
        
        <div id="result" class="mt-3 alert alert-info" style="display: none;"></div>
      </form>
    `;

    this.form = this.container.querySelector('#conversion-form') as HTMLFormElement;
    this.resultDiv = this.container.querySelector('#result') as HTMLDivElement;
    this.favoriteButton = this.container.querySelector('#favorite-btn') as HTMLButtonElement;
  }

  private setupEventListeners() {
    const categorySelect = this.form.querySelector('#category') as HTMLSelectElement;
    const fromUnitSelect = this.form.querySelector('#from-unit') as HTMLSelectElement;
    const toUnitSelect = this.form.querySelector('#to-unit') as HTMLSelectElement;
    const amountInput = this.form.querySelector('#amount') as HTMLInputElement;

    categorySelect.addEventListener('change', () => {
      const category = categorySelect.value as ConversionCategory;
      this.updateUnitOptions(category, fromUnitSelect, toUnitSelect);
    });

    this.form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const category = categorySelect.value as ConversionCategory;
      const fromUnit = fromUnitSelect.value;
      const toUnit = toUnitSelect.value;
      const amount = parseFloat(amountInput.value);
      
      let result: number;
      
      if (category === 'currency' || category === 'crypto') {
        result = await getExchangeRate(fromUnit, toUnit, amount);
      } else {
        result = convert(category, fromUnit, toUnit, amount);
      }
      
      const conversion = {
        category,
        fromUnit,
        toUnit,
        amount,
        result,
        date: new Date().toISOString()
      };
      
      addToHistory(conversion);
      this.displayResult(result);
      this.updateFavoriteButton(conversion);
    });

    this.favoriteButton.addEventListener('click', () => {
      const category = categorySelect.value as ConversionCategory;
      const fromUnit = fromUnitSelect.value;
      const toUnit = toUnitSelect.value;
      
      const conversion = {
        category,
        fromUnit,
        toUnit
      };
      
      if (isFavorite(conversion)) {
        removeFavorite(conversion);
        this.favoriteButton.textContent = 'Ajouter aux favoris';
        this.favoriteButton.classList.remove('btn-danger');
        this.favoriteButton.classList.add('btn-outline-secondary');
      } else {
        addFavorite(conversion);
        this.favoriteButton.textContent = 'Retirer des favoris';
        this.favoriteButton.classList.remove('btn-outline-secondary');
        this.favoriteButton.classList.add('btn-danger');
      }
    });
  }

  private updateUnitOptions(category: ConversionCategory, fromSelect: HTMLSelectElement, toSelect: HTMLSelectElement) {
    fromSelect.innerHTML = '';
    toSelect.innerHTML = '';
    
    let units: string[] = [];
    
    switch (category) {
      case 'length':
        units = ['m', 'km', 'ft', 'in', 'yd', 'mi'];
        break;
      case 'temperature':
        units = ['°C', '°F', 'K'];
        break;
      case 'weight':
        units = ['g', 'kg', 'lb'];
        break;
      case 'volume':
        units = ['L', 'gal'];
        break;
      case 'currency':
        units = ['EUR', 'USD', 'GBP', 'JPY'];
        break;
      case 'crypto':
        units = ['BTC', 'ETH', 'SOL'];
        break;
      default:
        fromSelect.disabled = true;
        toSelect.disabled = true;
        return;
    }
    
    units.forEach(unit => {
      fromSelect.add(new Option(unit, unit));
      toSelect.add(new Option(unit, unit));
    });
    
    fromSelect.disabled = false;
    toSelect.disabled = false;
  }

  private displayResult(result: number) {
    this.resultDiv.style.display = 'block';
    this.resultDiv.textContent = `Résultat: ${result.toFixed(4)}`;
  }

  private updateFavoriteButton(conversion: any) {
    this.favoriteButton.disabled = false;
    
    if (isFavorite(conversion)) {
      this.favoriteButton.textContent = 'Retirer des favoris';
      this.favoriteButton.classList.remove('btn-outline-secondary');
      this.favoriteButton.classList.add('btn-danger');
    } else {
      this.favoriteButton.textContent = 'Ajouter aux favoris';
      this.favoriteButton.classList.remove('btn-danger');
      this.favoriteButton.classList.add('btn-outline-secondary');
    }
  }
}