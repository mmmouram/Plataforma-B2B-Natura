import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MeusPedidos.css';
import PedidoServico from '../services/PedidoServico';

const MeusPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  // Simulação de pedidos realizados nas últimas 2 semanas
  useEffect(() => {
    setPedidos([
      { id: 1, dataUltimaAtualizacao: '2023-10-10T10:20:30', status: 'Em Transito' },
      { id: 2, dataUltimaAtualizacao: '2023-10-11T09:15:00', status: 'Aguardando Separação' }
    ]);
  }, []);

  const consultarPedido = async (id) => {
    try {
      const response = await PedidoServico.consultarPedido(id);
      // Navega para a página de detalhe passando os dados do pedido
      navigate(`/pedido/${id}`, { state: response });
    } catch (error) {
      setErro(error.message || 'Erro ao consultar pedido');
    }
  };

  return (
    <div className="meus-pedidos">
      <h1>Meus Pedidos</h1>
      {erro && <div className="mensagem-erro">{erro}</div>}
      <ul>
        {pedidos.map((pedido) => (
          <li key={pedido.id} onClick={() => consultarPedido(pedido.id)}>
            Pedido #{pedido.id} - Status: {pedido.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MeusPedidos;