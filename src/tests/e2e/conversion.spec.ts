import { test, expect, Page } from '@playwright/test';

test.describe('Convertisseur d\'Unités', () => {
  let page: Page;

  test.beforeEach(async ({ page: pageFixture }) => {
    page = pageFixture;
    await page.goto('/');
  });

  test('doit convertir des mètres en pieds et afficher le résultat correctement', async () => {
    await page.selectOption('#category', 'length');

    await page.selectOption('#from-unit', 'm');

    await page.selectOption('#to-unit', 'ft');

    await page.fill('#amount', '10');

    await page.click('button[type="submit"]');

    const resultElement = await page.waitForSelector('#result');
    const resultText = await resultElement.textContent();
    
    expect(resultText).toContain('32.8084');
  });

  test('doit convertir des euros en dollars et afficher le résultat correctement', async () => {
    await page.selectOption('#category', 'currency');

    await page.selectOption('#from-unit', 'EUR');

    await page.selectOption('#to-unit', 'USD');

    await page.fill('#amount', '100');

    await page.click('button[type="submit"]');

    const resultElement = await page.waitForSelector('#result');
    const resultText = await resultElement.textContent();
    

    expect(resultText).toContain('Résultat:');
    
    const historyItem = await page.waitForSelector('#history-list li');
    const historyText = await historyItem.textContent();
    expect(historyText).toContain('EUR');
    expect(historyText).toContain('USD');
  });

  test('doit ajouter une conversion aux favoris et vérifier sa présence', async () => {
    await page.selectOption('#category', 'temperature');

    await page.selectOption('#from-unit', '°C');

    await page.selectOption('#to-unit', '°F');

    await page.fill('#amount', '25');

    await page.click('button[type="submit"]');

    await page.waitForSelector('#favorite-btn:not([disabled])');

    await page.click('#favorite-btn');

    const favoriteItem = await page.waitForSelector('#favorites-list li');
    const favoriteText = await favoriteItem.textContent();
    expect(favoriteText).toContain('Température');
    expect(favoriteText).toContain('°C');
    expect(favoriteText).toContain('°F');
  });

  test('doit exécuter une conversion et vérifier son inclusion dans l\'historique', async () => {
    await page.selectOption('#category', 'weight');

    await page.selectOption('#from-unit', 'kg');

    await page.selectOption('#to-unit', 'lb');

    await page.fill('#amount', '5');

    await page.click('button[type="submit"]');

    const historyItem = await page.waitForSelector('#history-list li');
    const historyText = await historyItem.textContent();
    expect(historyText).toContain('Poids');
    expect(historyText).toContain('kg');
    expect(historyText).toContain('lb');
    expect(historyText).toContain('5');
    expect(historyText).toMatch(/11\.02/);
  });
});