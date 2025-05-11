import { getHistory, clearHistory } from '../services/history';

export class HistoryList {
  constructor(private container: HTMLElement) {
    this.render();
  }

  render() {
    const history = getHistory();
    
    this.container.innerHTML = `
      <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h5>Historique</h5>
          ${history.length > 0 
            ? '<button class="btn btn-sm btn-outline-danger" id="clear-history">Effacer</button>' 
            : ''}
        </div>
        <div class="card-body">
          ${history.length === 0 
            ? '<p class="text-muted">Historique vide</p>' 
            : '<ul class="list-group" id="history-list"></ul>'}
        </div>
      </div>
    `;
    
    if (history.length > 0) {
      const list = this.container.querySelector('#history-list') as HTMLUListElement;
      
      history.forEach(item => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        
        const date = new Date(item.date);
        const formattedDate = date.toLocaleString();
        
        li.innerHTML = `
          <div class="d-flex justify-content-between">
            <div>
              <strong>${this.getCategoryLabel(item.category)}</strong><br>
              ${item.amount} ${item.fromUnit} → ${item.result.toFixed(4)} ${item.toUnit}
            </div>
            <small class="text-muted">${formattedDate}</small>
          </div>
        `;
        
        list.appendChild(li);
      });
      
      const clearBtn = this.container.querySelector('#clear-history') as HTMLButtonElement;
      clearBtn.addEventListener('click', () => {
        clearHistory();
        this.render();
      });
    }
  }

  private getCategoryLabel(category: string): string {
    const labels: Record<string, string> = {
      length: 'Longueur',
      temperature: 'Température',
      weight: 'Poids',
      volume: 'Volume',
      currency: 'Monnaie',
      crypto: 'Crypto'
    };
    
    return labels[category] || category;
  }
}