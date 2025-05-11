
# Convertisseur d'Unités

Application web de conversion d'unités développée en TypeScript avec des tests automatisés Jest et Playwright.

## Fonctionnalités

- **Conversions multiples** :
  - Longueur (m, km, ft, in, yd, mi)
  - Température (°C, °F, K)
  - Poids (g, kg, lb)
  - Volume (L, gal)
  - Monnaies (EUR, USD, GBP, JPY)
  - Crypto-monnaies (BTC, ETH, SOL)

- **Système de favoris** :
  - Enregistrement des conversions préférées
  - Accès rapide aux favoris
  - Suppression des favoris

- **Historique des conversions** :
  - Stockage des conversions effectuées
  - Visualisation de l'historique
  - Effacement de l'historique

## Installation

1. Clonez ce dépôt :
```bash
git clone https://github.com/votre-username/convertisseur-unites.git
cd convertisseur-unites
```

2. Installez les dépendances :
```bash
npm install
```

3. Lancez l'application en mode développement :
```bash
npm run dev
```

## Tests

### Tests Unitaires et d'Intégration (Jest)

```bash
npm test
```

### Tests End-to-End (Playwright)

```bash
npm run test:e2e
```

### Tous les tests

```bash
npm run test:all
```

## Architecture du projet

```
/projet-conversion
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── ConversionForm.ts
│   │   ├── FavoritesList.ts
│   │   └── HistoryList.ts
│   ├── services/
│   │   ├── conversion.ts
│   │   ├── favorites.ts
│   │   ├── history.ts
│   │   └── currencyApi.ts
│   ├── tests/
│   │   ├── unit/
│   │   │   ├── conversion.test.ts
│   │   │   └── currencyApi.test.ts
│   │   ├── integration/
│   │   │   ├── favorites.test.ts
│   │   │   └── history.test.ts
│   │   └── e2e/
│   │       └── conversion.spec.ts
│   ├── utils/
│   │   └── helpers.ts
│   ├── styles/
│   │   └── main.css
│   ├── App.ts
│   └── main.ts
├── package.json
├── tsconfig.json
├── jest.config.js
└── README.md
```

## Technologies utilisées

- TypeScript
- Jest pour les tests unitaires et d'intégration
- Playwright pour les tests end-to-end
- Bootstrap pour l'interface utilisateur
- LocalStorage pour la persistance des données

## API externe

Les taux de conversion pour les monnaies et crypto-monnaies sont obtenus via l'API [currency-api](https://github.com/fawazahmed0/exchange-api).

## Auteurs

- Nathanael LEJUSTE

- Lilian ORRIT

## Licence

MIT