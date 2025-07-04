import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Rotas from './routes/Rotas';

const App = () => (
  <Router>
    <Rotas />
  </Router>
);

export default App;