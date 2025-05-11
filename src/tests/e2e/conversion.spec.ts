import { test, expect, Page } from '@playwright/test';

test.describe('Convertisseur d\'Unités', () => {
  let page: Page;

  test.beforeEach(async ({ page: pageFixture }) => {
    page = pageFixture;
    await page.goto('/');
  });

  // Scénario 1 : Conversion d'une unité de longueur
  test('doit convertir des mètres en pieds et afficher le résultat correctement', async () => {
    // Sélectionner la catégorie de longueur
    await page.selectOption('#category', 'length');

    // Sélectionner l'unité de départ (mètres)
    await page.selectOption('#from-unit', 'm');

    // Sélectionner l'unité d'arrivée (pieds)
    await page.selectOption('#to-unit', 'ft');

    // Entrer la valeur à convertir
    await page.fill('#amount', '10');

    // Cliquer sur le bouton de conversion
    await page.click('button[type="submit"]');

    // Vérifier que le résultat est affiché
    const resultElement = await page.waitForSelector('#result');
    const resultText = await resultElement.textContent();
    
    // 10 mètres = environ 32.8084 pieds
    expect(resultText).toContain('32.8084');
  });

  // Scénario 2 : Conversion d'une monnaie
  test('doit convertir des euros en dollars et afficher le résultat correctement', async () => {
    // Sélectionner la catégorie monnaie
    await page.selectOption('#category', 'currency');

    // Sélectionner l'unité de départ (euros)
    await page.selectOption('#from-unit', 'EUR');

    // Sélectionner l'unité d'arrivée (dollars)
    await page.selectOption('#to-unit', 'USD');

    // Entrer la valeur à convertir
    await page.fill('#amount', '100');

    // Cliquer sur le bouton de conversion
    await page.click('button[type="submit"]');

    // Vérifier que le résultat est affiché
    const resultElement = await page.waitForSelector('#result');
    const resultText = await resultElement.textContent();
    
    // Le résultat exact dépendra du taux de change, 
    // donc on vérifie juste que le résultat est affiché
    expect(resultText).toContain('Résultat:');
    
    // On vérifie que la conversion apparaît dans l'historique
    const historyItem = await page.waitForSelector('#history-list li');
    const historyText = await historyItem.textContent();
    expect(historyText).toContain('EUR');
    expect(historyText).toContain('USD');
  });

  // Scénario 3 : Ajout d'une conversion aux favoris
  test('doit ajouter une conversion aux favoris et vérifier sa présence', async () => {
    // Sélectionner la catégorie température
    await page.selectOption('#category', 'temperature');

    // Sélectionner l'unité de départ (Celsius)
    await page.selectOption('#from-unit', '°C');

    // Sélectionner l'unité d'arrivée (Fahrenheit)
    await page.selectOption('#to-unit', '°F');

    // Entrer la valeur à convertir
    await page.fill('#amount', '25');

    // Cliquer sur le bouton de conversion
    await page.click('button[type="submit"]');

    // Attendre que le bouton de favoris soit activé
    await page.waitForSelector('#favorite-btn:not([disabled])');

    // Cliquer sur le bouton d'ajout aux favoris
    await page.click('#favorite-btn');

    // Vérifier que la conversion a été ajoutée aux favoris
    const favoriteItem = await page.waitForSelector('#favorites-list li');
    const favoriteText = await favoriteItem.textContent();
    expect(favoriteText).toContain('Température');
    expect(favoriteText).toContain('°C');
    expect(favoriteText).toContain('°F');
  });

  // Scénario 4 : Vérification de l'inclusion dans l'historique
  test('doit exécuter une conversion et vérifier son inclusion dans l\'historique', async () => {
    // Sélectionner la catégorie poids
    await page.selectOption('#category', 'weight');

    // Sélectionner l'unité de départ (kg)
    await page.selectOption('#from-unit', 'kg');

    // Sélectionner l'unité d'arrivée (lb)
    await page.selectOption('#to-unit', 'lb');

    // Entrer la valeur à convertir
    await page.fill('#amount', '5');

    // Cliquer sur le bouton de conversion
    await page.click('button[type="submit"]');

    // Vérifier que la conversion a été ajoutée à l'historique
    const historyItem = await page.waitForSelector('#history-list li');
    const historyText = await historyItem.textContent();
    expect(historyText).toContain('Poids');
    expect(historyText).toContain('kg');
    expect(historyText).toContain('lb');
    expect(historyText).toContain('5');
    // 5 kg ≈ 11.0231 lb
    expect(historyText).toMatch(/11\.02/);
  });
});