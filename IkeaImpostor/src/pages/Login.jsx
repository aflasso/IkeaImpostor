// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ onLogin }) {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [esRegistro, setEsRegistro] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || {};

    if (esRegistro) {
      if (usuariosGuardados[usuario]) {
        alert("Ese usuario ya existe");
        return;
      }

      usuariosGuardados[usuario] = password;
      localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));
      alert("Registro exitoso. Ahora puedes iniciar sesión.");
      setEsRegistro(false);
      return;
    }

    // Validación de login
    if (!usuariosGuardados[usuario] || usuariosGuardados[usuario] !== password) {
      alert("Usuario o contraseña incorrectos");
      return;
    }

    // Guardar sesión
    localStorage.setItem("usuario", usuario);
    onLogin(usuario);
    navigate("/inicio");
}

  return (
    <div>
      <h2>{esRegistro ? "Registrarse" : "Iniciar sesión"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{esRegistro ? "Registrar" : "Ingresar"}</button>
      </form>
      <button onClick={() => setEsRegistro(!esRegistro)}>
        {esRegistro ? "Ya tengo cuenta" : "Quiero registrarme"}
      </button>
    </div>
  );
}