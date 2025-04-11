import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../Header'; // Polku Header-komponenttiin

test('näyttää painikkeet Kirjaudu ja Rekisteröidy vierailevalle käyttäjälle', () => {
    const mockOnRegisterClick = jest.fn();
    const mockOnLoginClick = jest.fn();

    // Renderöidään Header vierailevalle käyttäjälle (user = null)
    render(<Header onRegisterClick={mockOnRegisterClick} onLoginClick={mockOnLoginClick} user={null} />);

    // Tarkistetaan, että painikkeet "Kirjaudu" ja "Rekisteröidy" löytyvät DOM:sta
    expect(screen.getByText(/Kirjaudu/i)).toBeInTheDocument();
    expect(screen.getByText(/Rekisteröidy/i)).toBeInTheDocument();

    // Simuloidaan painikkeiden klikkaukset
    fireEvent.click(screen.getByText(/Kirjaudu/i));
    fireEvent.click(screen.getByText(/Rekisteröidy/i));

    // Tarkistetaan, että mock-funktiot kutsutaan
    expect(mockOnLoginClick).toHaveBeenCalled();
    expect(mockOnRegisterClick).toHaveBeenCalled();
});

test('näyttää painikkeen Kirjaudu ulos kirjautuneelle käyttäjälle', () => {
    const mockOnLogoutClick = jest.fn();

    // Simuloidaan kirjautunut käyttäjä
    const user = { token: '12345', location: 'Helsinki' };

    // Renderöidään Header kirjautuneelle käyttäjälle
    render(<Header onLogoutClick={mockOnLogoutClick} user={user} />);

    // Tarkistetaan, että painike "Kirjaudu ulos" löytyy DOM:sta
    expect(screen.getByText(/Kirjaudu ulos/i)).toBeInTheDocument();

    // Simuloidaan painikkeen klikkaus
    fireEvent.click(screen.getByText(/Kirjaudu ulos/i));

    // Tarkistetaan, että mockOnLogoutClick kutsutaan
    expect(mockOnLogoutClick).toHaveBeenCalled();
});
