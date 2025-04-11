import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Login from '../Login'; // Polku Login-komponenttiin

// Nollaa kaikki mockit jokaisen testin jälkeen
afterEach(() => {
    jest.resetAllMocks();
});

test('päivittää syöttökenttien arvot oikein', () => {
    const mockOnClose = jest.fn();
    const mockOnLoginSuccess = jest.fn();

    render(<Login onClose={mockOnClose} onLoginSuccess={mockOnLoginSuccess} />);

    // Sähköpostin syöttökenttä
    const emailInput = screen.getByPlaceholderText('Syötä sähköposti');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput.value).toBe('test@example.com');

    // Salasanan syöttökenttä
    const passwordInput = screen.getByPlaceholderText('Syötä salasana');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(passwordInput.value).toBe('password123');
});

test('näyttää virheilmoituksen, jos kirjautuminen epäonnistuu', async () => {
    const mockOnClose = jest.fn();
    const mockOnLoginSuccess = jest.fn();

    // Mockataan epäonnistunut API-vastaus
    global.fetch = jest.fn(() =>
        Promise.resolve({
            status: 401,
            json: () => Promise.resolve({ error: 'Virheellinen sähköposti tai salasana' }),
        })
    );

    render(<Login onClose={mockOnClose} onLoginSuccess={mockOnLoginSuccess} />);

    // Syötä tiedot
    fireEvent.change(screen.getByPlaceholderText('Syötä sähköposti'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Syötä salasana'), { target: { value: 'wrongpassword' } });

    // Lähetä lomake
    fireEvent.click(screen.getByRole('button', { name: /kirjaudu sisään/i }));

    // Odota virheilmoitusta
    await waitFor(() => {
        expect(screen.getByText(/virheellinen sähköposti tai salasana/i)).toBeInTheDocument();
    });
});

test('lähettää kirjautumistiedot oikein ja näyttää onnistumisviestin', async () => {
    const mockOnClose = jest.fn();
    const mockOnLoginSuccess = jest.fn();

    // Mockataan onnistunut API-vastaus
    global.fetch = jest.fn(() =>
        Promise.resolve({
            status: 200,
            json: () => Promise.resolve({ user: { email: 'test@example.com' } }),
        })
    );

    render(<Login onClose={mockOnClose} onLoginSuccess={mockOnLoginSuccess} />);

    // Syötä tiedot
    fireEvent.change(screen.getByPlaceholderText('Syötä sähköposti'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Syötä salasana'), { target: { value: 'password123' } });

    // Lähetä lomake
    fireEvent.click(screen.getByRole('button', { name: /kirjaudu sisään/i }));

    // Odota onnistumisviestiä
    await waitFor(() => {
        expect(screen.getByText(/kirjautuminen onnistui/i)).toBeInTheDocument();
    });

    // Varmista, että `onLoginSuccess` kutsutaan
    await waitFor(() => {
        expect(mockOnLoginSuccess).toHaveBeenCalledWith({ email: 'test@example.com' });
    });

    // Varmista, että `onClose` kutsutaan
    await waitFor(() => {
        expect(mockOnClose).toHaveBeenCalled();
    });
});
