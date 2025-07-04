import axios from 'axios';

const API_BASE = '/api/Chamado';

const abrirChamado = async (pedidoId) => {
  try {
    const response = await axios.post(`${API_BASE}/${pedidoId}`);
    return response.data;
  } catch (error) {
    throw new Error('Falha ao abrir chamado, tente novamente');
  }
};

const ChamadoServico = {
  abrirChamado
};

export default ChamadoServico;
