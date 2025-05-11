import { test, expect } from '@playwright/test';

test.describe('Conversion App E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('Scenario 1: Convert length units', async ({ page }) => {
    // Sélectionner la catégorie Longueur
    await page.selectOption('#category', 'length');
    
    // Sélectionner les unités
    await page.selectOption('#from-unit', 'm');
    await page.selectOption('#to-unit', 'km');
    
    // Entrer la valeur
    await page.fill('#amount', '1000');
    
    // Cliquer sur Convertir
    await page.click('button[type="submit"]');
    
    // Vérifier le résultat
    const resultText = await page.textContent('#result');
    expect(resultText).toContain('1.0000');
  });

  test('Scenario 2: Convert currency', async ({ page }) => {
    // Sélectionner la catégorie Monnaie
    await page.selectOption('#category', 'currency');
    
    // Sélectionner les unités
    await page.selectOption('#from-unit', 'EUR');
    await page.selectOption('#to-unit', 'USD');
    
    // Entrer la valeur
    await page.fill('#amount', '100');
    
    // Cliquer sur Convertir
    await page.click('button[type="submit"]');
    
    // Vérifier que le résultat est affiché
    await expect(page.locator('#result')).toBeVisible();
  });

  test('Scenario 3: Add to favorites', async ({ page }) => {
    // Sélectionner la catégorie Longueur
    await page.selectOption('#category', 'length');
    
    // Sélectionner les unités
    await page.selectOption('#from-unit', 'm');
    await page.selectOption('#to-unit', 'km');
    
    // Entrer la valeur et convertir
    await page.fill('#amount', '1000');
    await page.click('button[type="submit"]');
    
    // Ajouter aux favoris
    await page.click('#favorite-btn');
    
    // Vérifier que le bouton change
    await expect(page.locator('#favorite-btn')).toHaveText('Retirer des favoris');
    
    // Vérifier que le favori apparaît dans la liste
    await expect(page.locator('#favorites-list')).toContainText('Longueur : m → km');
  });

  test('Scenario 4: Check history', async ({ page }) => {
    // Sélectionner la catégorie Longueur
    await page.selectOption('#category', 'length');
    
    // Sélectionner les unités
    await page.selectOption('#from-unit', 'm');
    await page.selectOption('#to-unit', 'km');
    
    // Entrer la valeur et convertir
    await page.fill('#amount', '1000');
    await page.click('button[type="submit"]');
    
    // Vérifier que la conversion est dans l'historique
    await expect(page.locator('#history-list')).toContainText('1000 m → 1.0000 km');
  });
});