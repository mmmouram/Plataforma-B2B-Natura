import React from 'react';
import './ExibirStatusPedido.css';

const ExibirStatusPedido = ({ status, dataAtualizacao, itens }) => {
  return (
    <div className="exibir-status">
      <h2>Status: {status}</h2>
      <p>Última atualização: {new Date(dataAtualizacao).toLocaleString()}</p>
      {itens && itens.length > 0 && (
        <div className="lista-itens">
          <h3>Itens do Pedido:</h3>
          <ul>
            {itens.map(item => (
              <li key={item.id}>Produto: {item.produto || item.Produto} - Status: {item.status || item.Status}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ExibirStatusPedido;