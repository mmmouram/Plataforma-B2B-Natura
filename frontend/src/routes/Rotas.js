import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MeusPedidos from '../pages/MeusPedidos';
import DetalhePedido from '../pages/DetalhePedido';

const Rotas = () => {
  return (
    <Routes>
      <Route path="/" element={<MeusPedidos />} />
      <Route path="/pedido/:id" element={<DetalhePedido />} />
    </Routes>
  );
};

export default Rotas;