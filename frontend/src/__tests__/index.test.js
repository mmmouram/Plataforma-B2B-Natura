import React from 'react';
import ReactDOM from 'react-dom';
import '@testing-library/jest-dom';

// This test ensures that the main index.js renders the App component into the #root element

describe('index.js', () => {
  it('renders App component into #root', () => {
    // Prepare the DOM
    document.body.innerHTML = '<div id="root"></div>';
    require('../index');
    const root = document.getElementById('root');
    expect(root).toBeInTheDocument();
    // Since the App component renders MeusPedidos, we expect to see the text "Meus Pedidos"
    expect(root.textContent).toMatch(/Meus Pedidos/i);
  });
});
