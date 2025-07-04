import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MeusPedidos from '../pages/MeusPedidos';
import { BrowserRouter } from 'react-router-dom';
import PedidoServico from '../services/PedidoServico';

jest.mock('../services/PedidoServico');

// Mock the useNavigate hook from react-router-dom
jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    __esModule: true,
    ...originalModule,
    useNavigate: () => jest.fn(),
  };
});

// Tests for the MeusPedidos component

describe('MeusPedidos Component', () => {
  beforeEach(() => {
    PedidoServico.consultarPedido.mockClear();
  });

  it('renders the list of pedidos', async () => {
    render(
      <BrowserRouter>
        <MeusPedidos />
      </BrowserRouter>
    );
    expect(screen.getByText(/Meus Pedidos/i)).toBeInTheDocument();
    // As the list is set in useEffect, ensure the pedidos appear
    await waitFor(() => {
      expect(screen.getByText(/Pedido #1/i)).toBeInTheDocument();
      expect(screen.getByText(/Pedido #2/i)).toBeInTheDocument();
    });
  });

  it('calls consultarPedido and navigates on pedido click', async () => {
    const fakeNavigate = jest.fn();
    // Override useNavigate
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(fakeNavigate);
    PedidoServico.consultarPedido.mockResolvedValue({
      id: 1,
      status: 'Em Transito',
      dataUltimaAtualizacao: '2023-10-10T10:20:30',
      itens: []
    });

    render(
      <BrowserRouter>
        <MeusPedidos />
      </BrowserRouter>
    );

    const pedidoItem = await screen.findByText(/Pedido #1/i);
    fireEvent.click(pedidoItem);

    await waitFor(() => {
      expect(PedidoServico.consultarPedido).toHaveBeenCalledWith(1);
      expect(fakeNavigate).toHaveBeenCalledWith('/pedido/1', { state: {
        id: 1,
        status: 'Em Transito',
        dataUltimaAtualizacao: '2023-10-10T10:20:30',
        itens: []
      } });
    });
  });

  it('displays error when consultarPedido fails', async () => {
    PedidoServico.consultarPedido.mockRejectedValue(new Error('Pedido não encontrado'));
    render(
      <BrowserRouter>
        <MeusPedidos />
      </BrowserRouter>
    );

    const pedidoItem = await screen.findByText(/Pedido #1/i);
    fireEvent.click(pedidoItem);

    await waitFor(() => {
      expect(screen.getByText(/Pedido não encontrado/i)).toBeInTheDocument();
    });
  });
});
