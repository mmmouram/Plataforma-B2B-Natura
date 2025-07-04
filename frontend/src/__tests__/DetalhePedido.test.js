import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import DetalhePedido from '../pages/DetalhePedido';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ChamadoServico from '../services/ChamadoServico';

jest.mock('../services/ChamadoServico');

// Tests for DetalhePedido component

describe('DetalhePedido Component', () => {
  it('renders "Pedido não encontrado" when no state is provided', () => {
    render(
      <MemoryRouter initialEntries={[ '/pedido/1' ]}>
        <Routes>
          <Route path="/pedido/:id" element={<DetalhePedido />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText(/Pedido não encontrado/i)).toBeInTheDocument();
  });

  it('renders pedido details when state is provided and opens chamado successfully', async () => {
    ChamadoServico.abrirChamado.mockResolvedValue({});

    const state = {
      id: 1,
      status: 'Em Transito',
      dataUltimaAtualizacao: '2023-10-10T10:20:30',
      itens: [{ id: 1, produto: 'Produto A', status: 'Enviado' }]
    };

    render(
      <MemoryRouter initialEntries={[ { pathname: '/pedido/1', state } ]}>
        <Routes>
          <Route path="/pedido/:id" element={<DetalhePedido />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Detalhe do Pedido #1/i)).toBeInTheDocument();
    expect(screen.getByText(/Status: Em Transito/i)).toBeInTheDocument();
    
    const button = screen.getByRole('button', { name: /Abrir Chamado/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(ChamadoServico.abrirChamado).toHaveBeenCalledWith(1);
      expect(screen.getByText(/Chamado aberto com sucesso!/i)).toBeInTheDocument();
    });
  });

  it('displays error when abrirChamado fails', async () => {
    ChamadoServico.abrirChamado.mockRejectedValue(new Error('Falha ao abrir chamado, tente novamente'));
    
    const state = {
      id: 1,
      status: 'Em Transito',
      dataUltimaAtualizacao: '2023-10-10T10:20:30',
      itens: []
    };
    
    render(
      <MemoryRouter initialEntries={[ { pathname: '/pedido/1', state } ]}>
        <Routes>
          <Route path="/pedido/:id" element={<DetalhePedido />} />
        </Routes>
      </MemoryRouter>
    );

    const button = screen.getByRole('button', { name: /Abrir Chamado/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/Falha ao abrir chamado, tente novamente/i)).toBeInTheDocument();
    });
  });
});
