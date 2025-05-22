import { useParams } from 'react-router-dom';
import productos from '../../data';
import '@google/model-viewer';

export default function Producto() {
  const { id } = useParams();
  const producto = productos.find((p) => p.id === parseInt(id));
  const usuario = localStorage.getItem('usuario');

  if (!producto) return <p>Producto no encontrado</p>;

  const handleAgregarAlCarrito = () => {
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

  const handleAgregarAFavoritos = () => {
    const clave = `favoritos_${usuario}`;
    const favoritos = JSON.parse(localStorage.getItem(clave)) || [];

    if (favoritos.includes(producto.id)) {
      alert("Este producto ya está en favoritos");
      return;
    }

    favoritos.push(producto.id);
    localStorage.setItem(clave, JSON.stringify(favoritos));
    alert("Agregado a favoritos");
  };

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', textAlign: 'center' }}>
      <h2>{producto.nombre}</h2>
      <model-viewer
        src={producto.modelo}
        alt={`Modelo de ${producto.nombre}`}
        auto-rotate
        camera-controls
        style={{ width: '100%', height: '500px' }}
      ></model-viewer>
      <p>{producto.descripcion}</p>
      <h3>${producto.precio.toFixed(2)}</h3>

      <div style={{ marginTop: '1rem' }}>
        <button onClick={handleAgregarAlCarrito} style={{ marginRight: '1rem' }}>
          Agregar al carrito 🛒
        </button>
        <button onClick={handleAgregarAFavoritos}>
          Agregar a favoritos ❤️
        </button>
      </div>
    </div>
  );
}