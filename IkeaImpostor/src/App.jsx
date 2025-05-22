import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Inicio from './pages/Inicio';
import Carrito from './pages/Carrito';
import Favoritos from './pages/Favoritos';
import Historial from './pages/Historial';
import Login from './pages/Login';
import Producto from './pages/Producto';

import './App.css'

function App() {

  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('usuario');
    if (user) setUsuario(user);
  }, []);

  const handleLogin = (user) => {
    setUsuario(user);
  };

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    setUsuario(null);
  };

  return (
        <BrowserRouter>
      <Routes>
        {!usuario ? (
          <Route path="/" element={<Login onLogin={handleLogin} />} />
        ) : (
          <Route path="/" element={<Layout logOut={handleLogout} usuario={usuario} />}>
            <Route index element={<Navigate to="/inicio" replace />} />
            <Route path="inicio" element={<Inicio />} />
            <Route path="carrito" element={<Carrito />} />
            <Route path="favoritos" element={<Favoritos />} />
            <Route path="historial" element={<Historial />} />
            <Route path="producto/:id" element={<Producto />} />
          </Route>
        )}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
