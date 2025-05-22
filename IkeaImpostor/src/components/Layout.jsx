// src/components/Layout.jsx
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = ({ logOut, usuario }) => {
  return (
    <>
      <Navbar logOut={logOut} usuario={usuario} />
      <main style={{ padding: '1rem' }}>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;