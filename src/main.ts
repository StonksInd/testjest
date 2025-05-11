import { App } from './App';
import './styles/main.css';

document.addEventListener('DOMContentLoaded', () => {
  const appElement = document.getElementById('app');
  if (appElement) {
    new App(appElement);
  } else {
    console.error("Élément '#app' non trouvé dans le DOM");
  }
});