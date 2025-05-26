import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar({ usuario, logOut, carritoCount, favoritosCount }) {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => setMenuAbierto(!menuAbierto);

  return (
    <header>
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/inicio">Inicio</Link>
        </div>

        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>

        <div className={`nav-links ${menuAbierto ? 'activo' : ''}`}>
          <Link to="/carrito" onClick={() => setMenuAbierto(false)}>Carrito 🛒 ({carritoCount})</Link>
          <Link to="/favoritos" onClick={() => setMenuAbierto(false)}>Favoritos ❤️ ({favoritosCount})</Link>
          <Link to="/historial" onClick={() => setMenuAbierto(false)}>Historial</Link>
        </div>

        <div className="usuario">
          <span>👤 {usuario}</span>
          <button onClick={logOut}>Cerrar sesión</button>
        </div>
      </nav>
    </header>
  );
}
