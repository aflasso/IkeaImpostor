// src/components/Layout.jsx
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { useState, useEffect } from 'react';

export default function Layout({ logOut, usuario }) {
  const [carritoCount, setCarritoCount] = useState(0);
  const [favoritosCount, setFavoritosCount] = useState(0);

  const actualizarCarrito = () => {
    const clave = `carrito_${usuario}`;
    const carrito = JSON.parse(localStorage.getItem(clave)) || [];
    const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    setCarritoCount(total);
  };

  const actualizarFavoritos = () => {
    const clave = `favoritos_${usuario}`;
    const favoritos = JSON.parse(localStorage.getItem(clave)) || [];
    setFavoritosCount(favoritos.length);
  };

  useEffect(() => {
    actualizarCarrito();
    actualizarFavoritos();
  }, [usuario]);

  return (
    <>
      <Navbar
        usuario={usuario}
        logOut={logOut}
        carritoCount={carritoCount}
        favoritosCount={favoritosCount}
      />
      <main>
        <Outlet context={{ actualizarCarrito, actualizarFavoritos }} />
      </main>
    </>
  );
}
