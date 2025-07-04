import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';
import { BrowserRouter } from 'react-router-dom';

// Test to verify that the App component renders the routes properly

describe('App Component', () => {
  it('renders routes correctly', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    // The default route renders MeusPedidos containing "Meus Pedidos" header
    expect(screen.getByText(/Meus Pedidos/i)).toBeInTheDocument();
  });
});
