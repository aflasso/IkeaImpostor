// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar({ usuario, logOut, carritoCount, favoritosCount }) {
  return (
    <header>
      <nav className="navbar">
        <div className="nav-links">
          <Link to="/inicio">Inicio</Link>
          <Link to="/carrito">Carrito 🛒 ({carritoCount})</Link>
          <Link to="/favoritos">Favoritos ❤️ ({favoritosCount})</Link>
          <Link to="/historial">Historial</Link>
        </div>
        <div className="usuario">
          <span>👤 {usuario}</span>
          <button onClick={logOut}>Cerrar sesión</button>
        </div>
      </nav>
    </header>
  );
}
