import React from 'react';
import { render, screen } from '@testing-library/react';
import Weather from '../Weather';

// Nollaa kaikki mockit jokaisen testin jälkeen
afterEach(() => {
    jest.resetAllMocks();
});

test('näyttää vain yhden päivän säätiedot, kun isWeekly on false', () => {
    const mockData = [
        {
            temperature_2m_max: 25,
            temperature_2m_min: 15,
            rain_sum: 0,
            wind_speed_10m_max: 10,
            daylight_duration: 43200,
        },
    ];

    render(<Weather data={mockData} city="Helsinki" isWeekly={false} />);

    // Tarkista, että lämpötila näkyy oikein
    expect(screen.getByText((content, element) => 
        element.tagName === 'SPAN' && content.includes('25 °C')
    )).toBeInTheDocument();

    // Tarkista muut tiedot
    expect(screen.getByText((content, element) => 
        element.tagName === 'SPAN' && content.includes('15 °C')
    )).toBeInTheDocument();

    expect(screen.getByText((content, element) => 
        element.tagName === 'SPAN' && content.includes('0 mm')
    )).toBeInTheDocument();

    expect(screen.getByText((content, element) => 
        element.tagName === 'SPAN' && content.includes('2.78 m/s')
    )).toBeInTheDocument();

    expect(screen.getByText((content, element) => 
        element.tagName === 'SPAN' && content.includes('12.00 tuntia')
    )).toBeInTheDocument();
});
