import { ConversionForm } from './components/ConversionForm';
import { FavoritesList } from './components/FavoritesList';
import { HistoryList } from './components/HistoryList';

export class App {
  constructor(private root: HTMLElement) {
    this.render();
  }

  render() {
    this.root.innerHTML = `
      <div class="row">
        <div class="col-md-8">
          <h1 class="mb-4">Convertisseur d'Unités</h1>
          <div id="conversion-form"></div>
          <div id="history" class="mt-5"></div>
        </div>
        <div class="col-md-4">
          <div id="favorites" class="sticky-top pt-3"></div>
        </div>
      </div>
    `;

    new ConversionForm(document.getElementById('conversion-form')!);
    new FavoritesList(document.getElementById('favorites')!);
    new HistoryList(document.getElementById('history')!);
  }
}