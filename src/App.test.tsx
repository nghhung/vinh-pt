import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the app with navigation', () => {
    render(<App />);
    // Check that the site name is rendered (appears in header and footer)
    const siteNames = screen.getAllByText('FitPro Training');
    expect(siteNames.length).toBeGreaterThan(0);
    // Check that navigation links are present
    expect(screen.getAllByRole('link', { name: /home/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('link', { name: /about/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('link', { name: /services/i }).length).toBeGreaterThan(0);
  });
});
