// src/components/Navbar.jsx
import { Link } from 'react-router-dom';

const Navbar = ({ usuario, logOut }) => {
  return (
    <nav style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between' }}>
      <div>
        <Link to="/inicio">Inicio</Link>
        <Link to="/carrito">Carrito</Link>
        <Link to="/favoritos">Favoritos</Link>
        <Link to="/historial">Historial</Link>
      </div>
      <div>
        <span>👤 {usuario}</span>
        <button onClick={logOut}>Cerrar sesión</button>
      </div>
    </nav>
  );
};

export default Navbar;