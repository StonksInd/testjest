import { App } from './App';
import './styles/main.css';

// Attendre que le DOM soit chargé avant d'initialiser l'application
document.addEventListener('DOMContentLoaded', () => {
  const appElement = document.getElementById('app');
  if (appElement) {
    new App(appElement);
  } else {
    console.error("Élément '#app' non trouvé dans le DOM");
  }
});