import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

// Page Imports
import Home from './pages/Home';
import Nosotros from './pages/Nosotros';
import Contacto from './pages/Contacto';
import Servicios from './pages/Servicios';
import AgendarHora from './pages/Horas/AgendarHora';
import ConsultarHora from './pages/Horas/ConsultarHora';
import ConfirmarHora from './pages/Horas/ConfirmarHora';
import AnularHora from './pages/Horas/AnularHora';
import CambiarHora from './pages/Horas/CambiarHora';
import Login from './pages/Login';
import HomeAdmin from './pages/Admin/HomeAdmin';
import Dashboard from './pages/Admin/Dashboard';
import Usuarios from './pages/Admin/Usuarios';
import BlogAdmin from './pages/Admin/BlogAdmin';
import HomeMedico from './pages/Medica/HomeMedico';
import FichaIngreso from './pages/Medica/FichaIngreso';
import Consultas from './pages/Medica/Consultas';
import Tratamientos from './pages/Medica/Tratamientos';
import Blog from './pages/Blog'; // Página para listar publicaciones
import BlogPost from './pages/BlogPost'; // Página para detalles de una publicación


function App() {
  return (
    <div>
      <Routes>
        {/* Navbar Routes */}
        <Route path='/' element={<Home />} />
        <Route path='/nosotros' element={<Nosotros />} />
        <Route path='/contacto' element={<Contacto />} />
        <Route path='/servicios' element={<Servicios />} />

        {/* Horas Routes */}
        <Route path='/agendarhora' element={<AgendarHora />} />
        <Route path='/consultarhora' element={<ConsultarHora />} />
        <Route path='/confirmarhora' element={<ConfirmarHora />} />
        <Route path='/anularhora' element={<AnularHora />} />
        <Route path='/cambiarhora' element={<CambiarHora />} />

        {/* Login Route */}
        <Route path='/login' element={<Login />} />

        {/* Admin Routes */}
        <Route path='/homeadmin' element={<HomeAdmin />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/usuarios' element={<Usuarios />} />
        <Route path='/blogadmin' element={<BlogAdmin />} />

        {/* Medica Routes */}
        <Route path='/homemedico' element={<HomeMedico />} />
        <Route path='/fichaingreso' element={<FichaIngreso />} />
        <Route path='/consultas' element={<Consultas />} />
        <Route path='/tratamientos' element={<Tratamientos />} />

        <Route path="/blog" element={<Blog />} /> {/* Ruta para lista de publicaciones */}
        <Route path="/blog/:id" element={<BlogPost />} /> {/* Ruta para detalles de publicación */}

        {/* Redirect any unmatched path to the Home page */}
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
