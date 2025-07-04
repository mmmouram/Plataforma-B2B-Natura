import axios from 'axios';
import PedidoServico from '../services/PedidoServico';

jest.mock('axios');

describe('PedidoServico', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns data when request is successful', async () => {
    const mockData = {
      id: 1,
      status: 'Em Transito',
      dataUltimaAtualizacao: '2023-10-10T10:20:30',
      itens: []
    };

    axios.get.mockResolvedValue({ data: mockData });
    const result = await PedidoServico.consultarPedido(1);
    expect(axios.get).toHaveBeenCalledWith('/api/Pedido/1');
    expect(result).toEqual(mockData);
  });

  it('throws "Pedido não encontrado" error for 404 status', async () => {
    axios.get.mockRejectedValue({ response: { status: 404 } });
    await expect(PedidoServico.consultarPedido(99)).rejects.toThrow('Pedido não encontrado');
  });

  it('throws generic error for other errors', async () => {
    axios.get.mockRejectedValue({});
    await expect(PedidoServico.consultarPedido(1)).rejects.toThrow('Status temporariamente indisponível, tente novamente mais tarde');
  });
});
