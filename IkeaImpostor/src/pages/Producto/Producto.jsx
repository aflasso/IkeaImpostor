import { useParams } from 'react-router-dom';
import productos from '../../../data';
import '@google/model-viewer';
import { useOutletContext } from 'react-router-dom';
import './Producto.css';


export default function Producto() {
  const { id } = useParams();
  const producto = productos.find((p) => p.id === parseInt(id));
  const usuario = localStorage.getItem('usuario');
  const { actualizarCarrito, actualizarFavoritos } = useOutletContext();

  if (!producto) return <p>Producto no encontrado</p>;

  // Agregar producto al carrito en localStorage
  const handleAgregarAlCarrito = () => {
    if (!usuario) {
      alert("Debe iniciar sesión para agregar productos al carrito");
      return;
    }
    const clave = `carrito_${usuario}`;
    const carrito = JSON.parse(localStorage.getItem(clave)) || [];

    const index = carrito.findIndex((item) => item.id === producto.id);
    if (index !== -1) {
      carrito[index].cantidad += 1; // Incrementa cantidad si ya existe
    } else {
      carrito.push({ id: producto.id, cantidad: 1 }); // Nuevo producto
    }

    localStorage.setItem(clave, JSON.stringify(carrito));
    alert("Producto agregado al carrito");
    actualizarCarrito();
  };

  // Agregar producto a favoritos en localStorage
  const handleAgregarAFavoritos = () => {
    if (!usuario) {
      alert("Debe iniciar sesión para agregar favoritos");
      return;
    }
    const clave = `favoritos_${usuario}`;
    const favoritos = JSON.parse(localStorage.getItem(clave)) || [];
    

    if (favoritos.includes(producto.id)) {
      alert("Este producto ya está en favoritos");
      return;

    
    }

    favoritos.push(producto.id);
    localStorage.setItem(clave, JSON.stringify(favoritos));
    alert("Agregado a favoritos");
    actualizarFavoritos();
  };

  return (
  <div className="producto-container">
    <h2>{producto.nombre}</h2>
    <model-viewer
      src={producto.modelo}
      alt={`Modelo de ${producto.nombre}`}
      auto-rotate
      camera-controls
    ></model-viewer>
    <p>{producto.descripcion}</p>
    <h3>${producto.precio.toFixed(2)}</h3>

    <div className="botones">
      <button onClick={handleAgregarAlCarrito}>
        Agregar al carrito 🛒
      </button>
      <button onClick={handleAgregarAFavoritos}>
        Agregar a favoritos ❤️
      </button>
    </div>
  </div>
);
}
