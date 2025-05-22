import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './Navbar';

const Layout = ({ logOut, usuario }) => {
  const [totalFavoritos, setTotalFavoritos] = useState(0);

  useEffect(() => {
    const clave = `favoritos_${usuario}`;
    const favoritos = JSON.parse(localStorage.getItem(clave)) || [];
    setTotalFavoritos(favoritos.length);
  }, [usuario]);

  // Esto permite actualizar el número desde otros componentes
  const actualizarFavoritos = () => {
    const clave = `favoritos_${usuario}`;
    const favoritos = JSON.parse(localStorage.getItem(clave)) || [];
    setTotalFavoritos(favoritos.length);
  };

  return (
    <>
      <Navbar logOut={logOut} usuario={usuario} totalFavoritos={totalFavoritos} />
      <main style={{ padding: '1rem' }}>
        {/* Proveer función para actualizar favoritos si es necesario */}
        <Outlet context={{ actualizarFavoritos }} />
      </main>
    </>
  );
};

export default Layout;
