import productos from '../../../data';
import { useNavigate } from 'react-router-dom';
import './Inicio.css';

export default function Inicio() {
  const navigate = useNavigate();

  return (
    <div className="inicio-contenedor">
  {productos.map((producto) => (
    <div key={producto.id} className="producto-card">
      <model-viewer
        src={producto.modelo}
        alt={`Modelo de ${producto.nombre}`}
        auto-rotate
        camera-controls
      ></model-viewer>
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
