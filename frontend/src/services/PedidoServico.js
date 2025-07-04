import axios from 'axios';

const API_BASE = '/api/Pedido';

const consultarPedido = async (id) => {
  try {
    const response = await axios.get(`${API_BASE}/${id}`);
    // Retorna os dados do pedido com status, dataUltimaAtualizacao e itens
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error('Pedido não encontrado');
    } else {
      throw new Error('Status temporariamente indisponível, tente novamente mais tarde');
    }
  }
};

const PedidoServico = {
  consultarPedido
};

export default PedidoServico;
