import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Rotas from '../routes/Rotas';
import { MemoryRouter } from 'react-router-dom';

// Tests for the routing component

describe('Rotas Component', () => {
  it('renders MeusPedidos for root path', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Rotas />
      </MemoryRouter>
    );
    expect(screen.getByText(/Meus Pedidos/i)).toBeInTheDocument();
  });

  it('renders DetalhePedido for /pedido/1 with no state', () => {
    render(
      <MemoryRouter initialEntries={['/pedido/1']}>
        <Rotas />
      </MemoryRouter>
    );
    // When no location state is provided, DetalhePedido shows "Pedido não encontrado"
    expect(screen.getByText(/Pedido não encontrado/i)).toBeInTheDocument();
  });
});
