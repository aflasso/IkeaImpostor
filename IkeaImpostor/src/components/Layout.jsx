import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './Navbar';

const Layout = ({ logOut, usuario }) => {
  const [totalFavoritos, setTotalFavoritos] = useState(0);
  const [totalCarrito, setTotalCarrito] = useState(0);

  const actualizarFavoritos = () => {
    const clave = `favoritos_${usuario}`;
    const favoritos = JSON.parse(localStorage.getItem(clave)) || [];
    setTotalFavoritos(favoritos.length);
  };

  const actualizarCarrito = () => {
    const clave = `carrito_${usuario}`;
    const carrito = JSON.parse(localStorage.getItem(clave)) || [];
    const total = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    setTotalCarrito(total);
  };

  useEffect(() => {
    actualizarFavoritos();
    actualizarCarrito();
  }, [usuario]);

  return (
    <>
      <Navbar
        logOut={logOut}
        usuario={usuario}
        totalFavoritos={totalFavoritos}
        totalCarrito={totalCarrito}
      />
      <main style={{ padding: '1rem' }}>
        <Outlet context={{ actualizarFavoritos, actualizarCarrito }} />
      </main>
    </>
  );
};
export default Layout;