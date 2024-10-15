import logo from './logo.svg';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';

import Seguridad from './paginas/Categorias/Seguridad';
import Monitoreo from './paginas/Categorias/Monitoreo';
import PSelecModulos from './paginas/Categorias/PSelecModulos';
import Redes from './paginas/Categorias/Redes';
import BaseDeDatos from './paginas/Categorias/BaseDeDatos';
import Deployments from './paginas/Categorias/Deployments';
import Transversalidad from './paginas/Categorias/Transversalidad';


/* Ejemplo

function App() {
        return (
                <div className="">
                        <header className="">
                                <MainApp />
                        </header>
                        <Routes>


                                {/* Category Routes /}
                                <Route path='/seguridad' element={<Seguridad/>} />
                                <Route path='/monitoreo' element={<Monitoreo/>} />
                                <Route path='/pselecmodulos' element={<PSelecModulos />} />
                                <Route path='/redes' element={<Redes/>} />
                                <Route path='/basededatos' element={<BaseDeDatos/>} />
                                <Route path='/deployments' element={<Deployments/>} />
                                <Route path='/transversalidad' element={<Transversalidad/>} />
                                {/cualquier path no registrado redireccionara a la siguiente pag/}
                                <Route path="/" element={<Navigate to="/login" />} />
                        </Routes>
                </div>
        );
}

export default App;
*/