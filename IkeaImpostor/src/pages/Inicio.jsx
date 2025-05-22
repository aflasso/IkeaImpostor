// src/pages/Inicio.jsx
import productos from '../../data';
import { useNavigate } from 'react-router-dom';

export default function Inicio() {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
      {productos.map((producto) => (
        <div key={producto.id} style={{ border: '1px solid #ccc', padding: '1rem', width: 200 }}>
          <img src={producto.imagen} alt={producto.nombre} style={{ width: '100%' }} />
          <h3>{producto.nombre}</h3>
          <p>${producto.precio.toFixed(2)}</p>
          <button onClick={() => navigate(`/producto/${producto.id}`)}>
            Ver más
          </button>
        </div>
      ))}
    </div>
  );
}