import axios from 'axios';
import ChamadoServico from '../services/ChamadoServico';

jest.mock('axios');

describe('ChamadoServico', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns data when abrirChamado is successful', async () => {
    const mockData = { chamadoId: 123 };
    axios.post.mockResolvedValue({ data: mockData });
    const result = await ChamadoServico.abrirChamado(1);
    expect(axios.post).toHaveBeenCalledWith('/api/Chamado/1');
    expect(result).toEqual(mockData);
  });

  it('throws error when abrirChamado fails', async () => {
    axios.post.mockRejectedValue({});
    await expect(ChamadoServico.abrirChamado(1)).rejects.toThrow('Falha ao abrir chamado, tente novamente');
  });
});
