import { browser } from 'k6/browser';
import { check, sleep } from 'k6';

// Määrittele sovelluksen URL
const appAddress = 'http://localhost:5173';  // Vaihda tarvittaessa oikeaan osoitteeseen

export const options = {
    scenarios: {
        browser: {
            executor: 'shared-iterations',
            vus: 5, // Virtuaalisten käyttäjien määrä
            iterations: 10, // Kokonaismäärä testitoistoja
            maxDuration: '2m', // Testin maksimikesto
            options: {
                browser: {
                    type: 'chromium', // Määritellään selain
                },
            },
        },
    },
};

export default async function () {
    // Luo uusi selainistunto
    const page = await browser.newPage();

    try {
        // Vaihe 1: Navigoi sovellukseen
        await page.goto(appAddress);

        // Vaihe 2: Luo satunnainen nimi, ikä, kaupunki ja lempiväri
        const name = Math.random().toString(36).substring(7);
        const age = Math.floor(Math.random() * 100) + 1; // Satunnainen ikä
        const city = Math.random().toString(36).substring(7);
        const color = Math.random().toString(36).substring(7);

        // Vaihe 3: Täytä lomakekentät
        await page.locator('input#name').type(name);
        await page.locator('input#age').type(age.toString());
        await page.locator('input#city').type(city);
        await page.locator('input#color').type(color);

        // Vaihe 4: Klikkaa "Rekisteröidy" nappia
        await page.locator('button[type="submit"]').click();

        // Vaihe 5: Odota, että käyttäjä näkyy käyttäjälistassa
        await page.reload();

        // Vaihe 6: Hae taulukon kaikki rivit, jotka edustavat käyttäjiä
        const rows = await page.$$('table tbody tr');

        // Varmista, että ainakin yksi rivi löytyy taulukosta
        check(rows, {
            'Found rows in the table': (items) => items.length > 0, // Varmista, että löytyy käyttäjä
        });

        // Vaihe 7: Käy läpi rivit ja varmista, että juuri luotu käyttäjä on mukana
        let userFound = false;
        for (const row of rows) {
            const cells = await row.$$('td');  // Hae taulukon solut
            const userName = await cells[0].textContent();
            const userCity = await cells[1].textContent();

            // Jos nimi ja kaupunki vastaavat juuri luotua käyttäjää
            if (userName === name && userCity === city) {
                userFound = true;
                break;  // Löydettiin käyttäjä, ei tarvitse tarkistaa lisää
            }
        }
        for (const row of rows) {
            const cells = await row.$$('td');
            const userName = await cells[0].textContent();
            const userCity = await cells[1].textContent();
        
            // console.log(`Checking user: ${userName.trim()} and ${userCity.trim()}`);
            if (userName.trim() === name && userCity.trim() === city) {
                // console.log('User found!');
                userFound = true;
                break;
            }
        }
        
        if (!userFound) {
            console.log('User not found!');
        }
        
        // Varmista, että uusi käyttäjä on listassa
        check(userFound, {
            'User is found in the table': (found) => found === true,
        });

    } finally {
        // Vaihe 8: Sulje selainistunto
        await page.close();
    }

    // Tauota hetkeksi ennen seuraavaa toistoa
    sleep(1);
}
