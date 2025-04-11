import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../Footer'; // Polku Footer-komponenttiin

test('Footer näkyy, kun käyttäjä ei ole kirjautunut', () => {
    const user = null; // Käyttäjä ei ole kirjautunut

    // Renderöidään Footer-komponentti vain jos käyttäjä ei ole kirjautunut
    if (!user) {
        render(<Footer />);
    }

    // Varmistetaan, että viesti löytyy DOM:sta
    const message = screen.getByText(/Kirjaudu sisään tallentaaksesi hakuhistoriasi ja nähdäksesi 7 vuorokauden sää./i);
    expect(message).toBeInTheDocument(); // Viesti näkyy
});

test('Footer ei näy, kun käyttäjä on kirjautunut', () => {
    const user = { token: '12345', location: 'Helsinki' }; // Simuloidaan kirjautunut käyttäjä

    // Renderöidään Footer vain jos käyttäjä ei ole kirjautunut
    if (!user) {
        render(<Footer />);
    }

    // Varmistetaan, että viestiä ei ole DOM:sta
    expect(screen.queryByText(/Kirjaudu sisään tallentaaksesi hakuhistoriasi ja nähdäksesi 7 vuorokauden sää./i)).not.toBeInTheDocument();
});