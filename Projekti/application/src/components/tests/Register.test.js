import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Register from '../Register'; // Polku komponenttiin

test('päivittää syöttökenttien arvot oikein', () => {
    const mockOnClose = jest.fn(); // Mockataan onClose-funktio

    render(<Register onClose={mockOnClose} />);

    // Syötä tiedot syöttökenttiin ja tarkista niiden päivitys
    const emailInput = screen.getByPlaceholderText('Syötä sähköposti');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput.value).toBe('test@example.com');

    const passwordInput = screen.getByPlaceholderText('Syötä salasana');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(passwordInput.value).toBe('password123');

    const locationInput = screen.getByPlaceholderText('Syötä paikkakunta');
    fireEvent.change(locationInput, { target: { value: 'Helsinki' } });
    expect(locationInput.value).toBe('Helsinki');
});

test('näyttää virheilmoituksen, jos paikkakunta ei ole validi', async () => {
    const mockOnClose = jest.fn();

    // Mockataan koordinaattien haku palauttamaan null
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: () => Promise.resolve([]), // Simuloidaan, että paikkakuntaa ei löytynyt
    });

    render(<Register onClose={mockOnClose} />);

    // Syötä tiedot
    fireEvent.change(screen.getByPlaceholderText('Syötä sähköposti'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Syötä salasana'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Syötä paikkakunta'), { target: { value: 'VirheellinenPaikkakunta' } });

    // Klikkaa "Rekisteröidy"-painiketta
    fireEvent.click(screen.getByRole('button', { name: /rekisteröidy/i }));

    // Odota, että virheilmoitus näkyy
    await screen.findByText(/virheellinen paikkakunta:/i);
});

