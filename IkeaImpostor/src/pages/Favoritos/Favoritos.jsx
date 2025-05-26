import productos from '../../../data';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '@google/model-viewer';
import { useOutletContext } from 'react-router-dom';

export default function Favoritos() {
  const usuario = localStorage.getItem('usuario');
  const [favoritos, setFavoritos] = useState([]);
  const navigate = useNavigate();
  const { actualizarFavoritos } = useOutletContext();

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
    alert("Producto agregado al carrito");
  };

  const handleEliminarFavorito = (id) => {
    const clave = `favoritos_${usuario}`;
    const nuevaLista = favoritos.filter(p => p.id !== id);
    setFavoritos(nuevaLista);
    const idsActualizados = nuevaLista.map(p => p.id);
    localStorage.setItem(clave, JSON.stringify(idsActualizados));
    actualizarFavoritos();
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem', padding: '2rem' }}>
      {favoritos.map((producto) => (
        <div key={producto.id} style={{ width: '250px', backgroundColor: '#fff', padding: '1rem', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', textAlign: 'center' }}>
          <model-viewer
            src={producto.modelo}
            alt={`Modelo de ${producto.nombre}`}
            auto-rotate
            camera-controls
            style={{ width: '100%', height: '200px', marginBottom: '1rem' }}
          ></model-viewer>
          <h3>{producto.nombre}</h3>
          <p>${producto.precio.toFixed(2)}</p>
          <div style={{ marginTop: '1rem' }}>
            <button onClick={() => handleAgregarAlCarrito(producto)} style={{ marginRight: '0.5rem' }}>
              Agregar al carrito 🛒
            </button>
            <button onClick={() => navigate(`/producto/${producto.id}`)} style={{ marginRight: '0.5rem' }}>
              Ver más
            </button>
            <button onClick={() => handleEliminarFavorito(producto.id)} style={{ backgroundColor: '#e74c3c', color: '#fff', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '5px' }}>
              Quitar ❌
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
