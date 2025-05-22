import { Link } from 'react-router-dom';

const Navbar = ({ usuario, logOut, totalFavoritos }) => {
  return (
    <nav style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between', padding: '1rem' }}>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/inicio">Inicio</Link>
        <Link to="/carrito">Carrito</Link>
        <Link to="/favoritos">
          Favoritos <span style={{ color: 'red' }}>({totalFavoritos})</span>
        </Link>
        <Link to="/historial">Historial</Link>
      </div>
      <div>
        <span>👤 {usuario}</span>
        <button onClick={logOut} style={{ marginLeft: '1rem' }}>Cerrar sesión</button>
      </div>
    </nav>
  );
};

export default Navbar;
