import { useEffect, useState } from 'react';
import productos from '../../../data';
import '@google/model-viewer';
import { useOutletContext, useNavigate } from 'react-router-dom';
import './Carrito.css';

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

  if (!usuario) return (
    <div className="mensaje-vacio">
      <h2>Inicia sesión para ver tu carrito</h2>
      <p>Por favor, inicia sesión para poder agregar productos y realizar compras.</p>
    </div>
  );

  if (productosEnCarrito.length === 0) return (
    <div className="mensaje-vacio">
      <h2>Tu carrito está vacío</h2>
      <p>Añade productos y aquí los verás para que puedas comprarlos ❤️</p>
    </div>
  );

  return (
    <div className="carrito-container">
      <h2 className="carrito-titulo">Carrito de compras</h2>
      <div className="carrito-items">
        {productosEnCarrito.map((item) => (
          <div key={item.id} className="carrito-card">
            <h3>{item.nombre}</h3>
            <model-viewer
              src={item.modelo}
              alt={`Modelo de ${item.nombre}`}
              auto-rotate
              camera-controls
              className="carrito-modelo"
            ></model-viewer>
            <p>
              Cantidad:
              <input
                type="number"
                min="1"
                value={item.cantidad}
                onChange={(e) => modificarCantidad(item.id, parseInt(e.target.value))}
                className="carrito-input-cantidad"
              />
            </p>
            <p>Precio unitario: ${item.precio.toFixed(2)}</p>
            <p>Total: ${(item.precio * item.cantidad).toFixed(2)}</p>
            <button onClick={() => eliminarDelCarrito(item.id)} className="carrito-quitar-btn">
              ❌ Quitar del carrito
            </button>
          </div>
        ))}
      </div>
      <div className="carrito-resumen">
        <p>Subtotal: ${subtotal.toFixed(2)}</p>
        <p>IVA (19%): ${iva.toFixed(2)}</p>
        <h3>Total general: ${total.toFixed(2)}</h3>
        <button onClick={irAFinalizarCompra} className="carrito-pagar-btn">
          💳 Pagar
        </button>
      </div>
    </div>
  );
}
