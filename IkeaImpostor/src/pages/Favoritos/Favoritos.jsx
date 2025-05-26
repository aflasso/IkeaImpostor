import productos from '../../../data';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '@google/model-viewer';
import { useOutletContext } from 'react-router-dom';
import './Favoritos.css';


export default function Favoritos() {
  const usuario = localStorage.getItem('usuario');
  const [favoritos, setFavoritos] = useState([]);
  const navigate = useNavigate();
  const { actualizarFavoritos, actualizarCarrito } = useOutletContext();
  const [mensajeCarrito, setMensajeCarrito] = useState('');

  useEffect(() => {
    const clave = `favoritos_${usuario}`;
    const data = JSON.parse(localStorage.getItem(clave)) || [];
    const productosFavoritos = productos.filter((p) => data.includes(p.id));
    setFavoritos(productosFavoritos);
  }, [usuario]);

  const handleAgregarAlCarrito = (producto) => {
    const clave = `carrito_${usuario}`;
    const carrito = JSON.parse(localStorage.getItem(clave)) || [];

    const index = carrito.findIndex((item) => item.id === producto.id);
    if (index !== -1) {
      carrito[index].cantidad += 1;
    } else {
      carrito.push({ id: producto.id, cantidad: 1 });
    }

    localStorage.setItem(clave, JSON.stringify(carrito));
    actualizarCarrito();

    setMensajeCarrito(`"${producto.nombre}" se agregó al carrito 🛒`);
    setTimeout(() => setMensajeCarrito(''), 3000);
  };

  const handleEliminarFavorito = (id) => {
    const clave = `favoritos_${usuario}`;
    const nuevaLista = favoritos.filter(p => p.id !== id);
    setFavoritos(nuevaLista);
    const idsActualizados = nuevaLista.map(p => p.id);
    localStorage.setItem(clave, JSON.stringify(idsActualizados));
    actualizarFavoritos();
  };

  // 🔧 Aquí estaba el problema: faltaba el return
  return (
    <div className="favoritos-container">
      {mensajeCarrito && <div className="notificacion">{mensajeCarrito}</div>}

      {favoritos.length === 0 ? (
        <div className="mensaje-vacio">
          <h2>No tienes productos en favoritos</h2>
          <p>Agrega tus productos preferidos para verlos aquí ❤️</p>
        </div>
      ) : (
        favoritos.map((producto) => (
          <div key={producto.id} className="favorito-card">
            <model-viewer
              src={producto.modelo}
              alt={`Modelo de ${producto.nombre}`}
              auto-rotate
              camera-controls
            ></model-viewer>
            <h3>{producto.nombre}</h3>
            <p>${producto.precio.toFixed(2)}</p>
            <div>
              <button onClick={() => handleAgregarAlCarrito(producto)}>Agregar al carrito 🛒</button>
              <button onClick={() => navigate(`/producto/${producto.id}`)}>Ver más</button>
              <button onClick={() => handleEliminarFavorito(producto.id)}>Quitar ❌</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}





