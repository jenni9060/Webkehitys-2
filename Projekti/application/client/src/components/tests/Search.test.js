import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Search from '../Search'; // Oikea polku komponenttiin

// Nollaa kaikki mockit jokaisen testin jälkeen
afterEach(() => {
    jest.resetAllMocks();
});

test('näyttää tervetuloviestin ja hakukentän', () => {
    render(<Search searchCity="" setSearchCity={() => {}} onSearch={() => {}} user={null} />);
    
    // Tervetuloviesti
    expect(screen.getByText('Tervetuloa AurinkoArska.fi-sivustolle!')).toBeInTheDocument();
    expect(screen.getByText('Syötä kaupungin nimi nähdäksesi ajankohtaiset säätiedot.')).toBeInTheDocument();
    
    // Hakukentän tarkistus
    expect(screen.getByPlaceholderText('Syötä kaupunki')).toBeInTheDocument();
});

test('käynnistää säätiedon haun paikkakunnan mukaan', () => {
    const mockOnSearch = jest.fn();
    
    render(<Search searchCity="Kokkola" setSearchCity={() => {}} onSearch={mockOnSearch} user={null} />);
    
    // Klikkaa hakupainiketta
    const searchButton = screen.getByText('Hae sää');
    fireEvent.click(searchButton);
    
    // Varmista, että mockOnSearch toimii
    expect(mockOnSearch).toHaveBeenCalledWith('Kokkola');
});


