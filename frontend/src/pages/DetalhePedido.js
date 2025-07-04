import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './DetalhePedido.css';
import ExibirStatusPedido from '../components/ExibirStatusPedido';
import ChamadoServico from '../services/ChamadoServico';

const DetalhePedido = () => {
  const { state } = useLocation();
  const [mensagemErro, setMensagemErro] = useState('');
  const [mensagemSucesso, setMensagemSucesso] = useState('');
  
  // Se não houver dados do pedido, exibe mensagem de pedido não encontrado
  if (!state) {
    return (
      <div className="detalhe-pedido">
        <h2>Pedido não encontrado</h2>
        <p>Por favor, volte para a página Meus Pedidos e selecione um pedido válido.</p>
      </div>
    );
  }

  const { id, status, dataUltimaAtualizacao, itens } = state;

  const abrirChamado = async () => {
    try {
      const response = await ChamadoServico.abrirChamado(id);
      setMensagemSucesso('Chamado aberto com sucesso!');
      setMensagemErro('');
    } catch (error) {
      setMensagemErro(error.message || 'Falha ao abrir chamado, tente novamente');
      setMensagemSucesso('');
    }
  };

  return (
    <div className="detalhe-pedido">
      <h1>Detalhe do Pedido #{id}</h1>
      <ExibirStatusPedido
        status={status}
        dataAtualizacao={dataUltimaAtualizacao}
        itens={itens}
      />
      <button onClick={abrirChamado} className="botao-chamado">Abrir Chamado</button>
      {mensagemSucesso && <div className="mensagem-sucesso">{mensagemSucesso}</div>}
      {mensagemErro && <div className="mensagem-erro">{mensagemErro}</div>}
    </div>
  );
};

export default DetalhePedido;