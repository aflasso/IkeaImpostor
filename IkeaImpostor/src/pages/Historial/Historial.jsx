import { useEffect, useState } from 'react';
import './Historial.css'; 

export default function Historial() {
  const usuario = localStorage.getItem('usuario');
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    const clave = `compras_${usuario}`;
    const data = JSON.parse(localStorage.getItem(clave)) || [];
    setHistorial(data);
  }, [usuario]);

  return (
    <div className="historial-container">
  <h2>Historial de Compras</h2>
  {historial.map((compra, index) => (
    <div key={index} className="compra-card">
      <p><strong>Fecha:</strong> {compra.fecha}</p>
      <p><strong>Comprador:</strong> {compra.nombre}, {compra.direccion}, {compra.ciudad}, {compra.telefono}</p>
      <ul>
        {compra.productos.map(p => (
          <li key={p.id}>{p.nombre} - {p.cantidad} x ${p.precio.toFixed(2)}</li>
        ))}
      </ul>
      <p>Subtotal: ${compra.subtotal.toFixed(2)}</p>
      <p>IVA: ${compra.iva.toFixed(2)}</p>
      <p><strong>Total: ${compra.total.toFixed(2)}</strong></p>
    </div>
  ))}
</div>

  );
}
