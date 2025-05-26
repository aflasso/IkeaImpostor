import { useEffect, useState } from 'react';
import productos from '../../../data';
import '@google/model-viewer';
import { useOutletContext, useNavigate } from 'react-router-dom';

export default function Carrito() {
  const usuario = localStorage.getItem('usuario');
  const [carrito, setCarrito] = useState([]);
  const { actualizarCarrito } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (usuario) {
      const clave = `carrito_${usuario}`;
      const carritoLS = JSON.parse(localStorage.getItem(clave)) || [];
      setCarrito(carritoLS);
    }
  }, [usuario]);

  const guardarCarrito = (nuevoCarrito) => {
    setCarrito(nuevoCarrito);
    localStorage.setItem(`carrito_${usuario}`, JSON.stringify(nuevoCarrito));
    actualizarCarrito();
  };

  const eliminarDelCarrito = (id) => {
    const nuevaLista = carrito.filter(item => item.id !== id);
    guardarCarrito(nuevaLista);
  };

  const modificarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad < 1) return;
    const nuevaLista = carrito.map(item =>
      item.id === id ? { ...item, cantidad: nuevaCantidad } : item
    );
    guardarCarrito(nuevaLista);
  };

  const productosEnCarrito = carrito.map(item => {
    const producto = productos.find(p => p.id === item.id);
    return {
      ...producto,
      cantidad: item.cantidad
    };
  });

  const subtotal = productosEnCarrito.reduce(
    (sum, item) => sum + item.precio * item.cantidad,
    0
  );
  const iva = subtotal * 0.19;
  const total = subtotal + iva;

  const irAFinalizarCompra = () => {
    navigate('/finalizar', {
  state: {
    productosEnCarrito,
    subtotal,
    iva,
    total
  }
});

  };

  if (!usuario) return <p>Inicia sesión para ver tu carrito.</p>;
  if (productosEnCarrito.length === 0) return <p>Tu carrito está vacío.</p>;

  return (
    <div style={{ maxWidth: '900px', margin: '2rem auto' }}>
      <h2>Carrito de compras</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {productosEnCarrito.map((item) => (
          <div key={item.id} style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '1rem' }}>
            <h3>{item.nombre}</h3>
            <model-viewer
              src={item.modelo}
              alt={`Modelo de ${item.nombre}`}
              auto-rotate
              camera-controls
              style={{ width: '100%', height: '300px', maxWidth: '600px', margin: 'auto' }}
            ></model-viewer>
            <p>Cantidad: 
              <input
                type="number"
                min="1"
                value={item.cantidad}
                onChange={(e) => modificarCantidad(item.id, parseInt(e.target.value))}
                style={{ marginLeft: '0.5rem', width: '60px' }}
              />
            </p>
            <p>Precio unitario: ${item.precio.toFixed(2)}</p>
            <p>Total: ${(item.precio * item.cantidad).toFixed(2)}</p>
            <button
              onClick={() => eliminarDelCarrito(item.id)}
              style={{ marginTop: '1rem', backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '5px' }}
            >
              ❌ Quitar del carrito
            </button>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '2rem' }}>
        <p>Subtotal: ${subtotal.toFixed(2)}</p>
        <p>IVA (19%): ${iva.toFixed(2)}</p>
        <h3>Total general: ${total.toFixed(2)}</h3>
        <button
          onClick={irAFinalizarCompra}
          style={{ marginTop: '1rem', backgroundColor: '#27ae60', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', fontSize: '1rem' }}
        >
          💳 Pagar
        </button>
      </div>
    </div>
  );
}
