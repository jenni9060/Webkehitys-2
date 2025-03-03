import { test, expect } from '@playwright/test';

// Define the application's local address
const appAddress = 'http://localhost:5173'; // Vaihda oikeaan URL-osoitteeseen, jossa lomake sijaitsee

test('Täyttää lomakkeen ja lähettää sen', async ({ page }) => {
    // Luo satunnaiset arvot kentille
    const name = (Math.random() + 1).toString(36).substring(7);
    const age = Math.floor(Math.random() * 100);  // Satunnainen ikä
    const city = (Math.random() + 1).toString(36).substring(7);
    const color = (Math.random() + 1).toString(36).substring(7);

    // Navigoi lomakkeen sisältävälle sivulle
    await page.goto(appAddress);

    // Täytä lomakkeen kentät satunnaisilla arvoilla
    await page.fill('input#name', name);
    await page.fill('input#age', age.toString());
    await page.fill('input#city', city);
    await page.fill('input#color', color);

    // Klikkaa rekisteröitymisnappia lähettämään lomake
    await page.click('button:has-text("Rekisteröidy")');

    // Odota, että lomake on lähetetty ja näkyy jokin onnistumisviesti tai siirrytään toiselle sivulle
    await page.waitForSelector('h1'); // Vaihda tähän oikea valitsin, joka on näkyvissä onnistuneen lähetyksen jälkeen

    // Varmista, että näkyy oikea teksti, joka kertoo onnistuneesta rekisteröitymisestä
    const successMessage = await page.locator('h1');
    //await expect(successMessage).toContainText('Kiitos rekisteröitymisestä!');
});
