import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';

export default function FinalizarCompra() {
  const location = useLocation();
  const navigate = useNavigate();
  const usuario = localStorage.getItem('usuario');
  const { actualizarCarrito } = useOutletContext();
  // Extraer los datos enviados desde el carrito
  const { productosEnCarrito = [], subtotal = 0, iva = 0, total = 0 } = location.state || {};

  const [formulario, setFormulario] = useState({
    nombre: '',
    direccion: '',
    ciudad: '',
    telefono: ''
  });

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const handleConfirmar = () => {
    const nuevaCompra = {
      usuario,
      ...formulario,
      fecha: new Date().toLocaleString(),
      productos: productosEnCarrito,
      subtotal,
      iva,
      total
    };

    const clave = `compras_${usuario}`;
    const historial = JSON.parse(localStorage.getItem(clave)) || [];
    historial.push(nuevaCompra);
    localStorage.setItem(clave, JSON.stringify(historial));

    localStorage.removeItem(`carrito_${usuario}`);
    alert("Compra finalizada. Gracias por tu compra!");
    navigate("/historial");
    actualizarCarrito();
  };

  if (!usuario) return <p>Inicia sesión para finalizar la compra.</p>;
  if (productosEnCarrito.length === 0) return <p>No hay productos para finalizar la compra.</p>;

  return (
    <div className="finalizar-container">
      <h2>Formulario de Envío</h2>
      <input name="nombre" onChange={handleChange} placeholder="Nombre completo" required />
      <input name="direccion" onChange={handleChange} placeholder="Dirección" required />
      <input name="ciudad" onChange={handleChange} placeholder="Ciudad" required />
      <input name="telefono" type='number' onChange={handleChange} placeholder="Teléfono" required />

      <h3 style={{ marginTop: '2rem' }}>Factura</h3>
      <ul>
        {productosEnCarrito.map(p => (
          <li key={p.id}>
            {p.nombre} - {p.cantidad} x ${p.precio.toFixed(2)} = ${(p.cantidad * p.precio).toFixed(2)}
          </li>
        ))}
      </ul>
      <p>Subtotal: ${subtotal.toFixed(2)}</p>
      <p>IVA (19%): ${iva.toFixed(2)}</p>
      <p><strong>Total: ${total.toFixed(2)}</strong></p>

      <button
        onClick={handleConfirmar}
        className="btn-confirmar"
      >
        Confirmar compra
      </button>
    </div>
  );
}
