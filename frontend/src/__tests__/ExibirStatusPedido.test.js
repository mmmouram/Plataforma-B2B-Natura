import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ExibirStatusPedido from '../components/ExibirStatusPedido';

// Tests for ExibirStatusPedido component

describe('ExibirStatusPedido Component', () => {
  it('renders status and last update date', () => {
    const props = {
      status: 'Em Transito',
      dataAtualizacao: '2023-10-10T10:20:30',
      itens: []
    };
    render(<ExibirStatusPedido {...props} />);
    expect(screen.getByText(/Status: Em Transito/i)).toBeInTheDocument();
    expect(screen.getByText(/Última atualização:/i)).toBeInTheDocument();
  });

  it('renders list of itens when provided', () => {
    const props = {
      status: 'Em Transito',
      dataAtualizacao: '2023-10-10T10:20:30',
      itens: [
        { id: 1, produto: 'Produto A', status: 'Enviado' },
        { id: 2, produto: 'Produto B', status: 'Separação' }
      ]
    };
    render(<ExibirStatusPedido {...props} />);
    
    expect(screen.getByText(/Itens do Pedido:/i)).toBeInTheDocument();
    expect(screen.getByText(/Produto: Produto A - Status: Enviado/i)).toBeInTheDocument();
    expect(screen.getByText(/Produto: Produto B - Status: Separação/i)).toBeInTheDocument();
  });
});
