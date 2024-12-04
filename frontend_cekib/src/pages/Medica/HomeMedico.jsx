import React, { useState, useEffect } from 'react';
import SidebarMed from '../../components/Medica/SidebarMed';
import { useLocation } from "react-router-dom";
import axios from 'axios';

export default function HomeMedico() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [profesional, setProfesional] = useState(null); // Estado para guardar los datos del profesional
    const [currentIdUsuario, setCurrentIdUsuario] = useState(null); // Estado para guardar el idUsuario actual
    const [citas, setCitas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [recordatorios, setRecordatorios] = useState([]); // Estado para los recordatorios
    const [nuevoRecordatorio, setNuevoRecordatorio] = useState(""); // Estado para el nuevo recordatorio
    const location = useLocation();
    const { idUsuario } = location.state || {}; // Accede al idUsuario desde el estado

    // Actualizar el idUsuario si cambia
    useEffect(() => {
        if (idUsuario && idUsuario !== currentIdUsuario) {
            setCurrentIdUsuario(idUsuario);
        }
    }, [idUsuario, currentIdUsuario]);

    // Fetch de datos del profesional
    useEffect(() => {
        const fetchProfesional = async () => {
            try {
                const response = await axios.get("http://localhost:8080/profesionales");
                const profesionales = response.data;

                // Filtrar el profesional según el currentIdUsuario
                const profesionalFiltrado = profesionales.find((pro) => pro.idUsuario === currentIdUsuario);
                setProfesional(profesionalFiltrado);
                setRecordatorios(profesionalFiltrado?.recordatorios || []);
            } catch (error) {
                console.error("Error al obtener los datos del profesional:", error);
            }
        };

        if (currentIdUsuario) {
            fetchProfesional();
        }
    }, [currentIdUsuario]);

    // Manejar la creación de un nuevo recordatorio
    const handleCrearRecordatorio = () => {
        if (nuevoRecordatorio.trim() === "") return;
        const nuevo = {
            id: Date.now(),
            texto: nuevoRecordatorio,
        };
        setRecordatorios([...recordatorios, nuevo]);
        setNuevoRecordatorio("");
    };

    // Manejar la eliminación de un recordatorio
    const handleEliminarRecordatorio = (id) => {
        setRecordatorios(recordatorios.filter((rec) => rec.id !== id));
    };

    // Manejar la edición de un recordatorio
    const handleEditarRecordatorio = (id, nuevoTexto) => {
        setRecordatorios(
            recordatorios.map((rec) => (rec.id === id ? { ...rec, texto: nuevoTexto } : rec))
        );
    };

    useEffect(() => {
        // Llamada a la API para obtener las citas
        fetch('http://localhost:8080/citas')
            .then((response) => response.json())
            .then((data) => {
                // Filtrar citas por rutProfesional
                const citasFiltradas = data.filter(
                    (cita) => cita.rutProfesional === '18325499-5'
                );
                setCitas(citasFiltradas);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error al cargar las citas:', error);
                setIsLoading(false);
            });
    }, []);

    return (
        <main>
            <div className="flex h-screen">
                <SidebarMed sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            </div>
            <div className="hidden lg:fixed lg:inset-y-0 lg:inset-x-0 lg:flex border border-teal-400 rounded-lg my-2 mr-6 ml-40">
                <div className="flex-1">
                    <div className="bg-white shadow-md rounded p-6 space-y-4">
                        {/* Bienvenida */}
                        <div className="text-center">
                            <h2 className="text-xl font-bold text-teal-600">
                                ¡Bienvenido al Home Médico, Dr/a. {profesional ? `${profesional.nombrePro} ${profesional.apellidoPro}` : "Cargando..."}!
                            </h2>
                            <p className="text-gray-600">Aquí está un resumen de tu día y recordatorios importantes.</p>
                        </div>

                        {/* Próximos pacientes */}
                        <div className="border-t pt-4 space-y-3">
                            <h3 className="font-semibold text-teal-500">Próximas citas</h3>
                            <table border="1" style={{ width: '100%', textAlign: 'left' }}>
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Rut Paciente</th>
                                        <th>Fecha</th>
                                        <th>Hora</th>
                                        <th>Estado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {citas.map((cita) => (
                                        <tr key={cita.idCita}>
                                            <td>{`${cita.nombrePaciente} ${cita.apellidoPaciente}`}</td>
                                            <td>{cita.rutPaciente}</td>
                                            <td>{new Date(cita.fechaCita).toLocaleDateString()}</td>
                                            <td>{new Date(cita.fechaCita).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                                            <td>{cita.estadoCita}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Gestión de recordatorios */}
                        <div className="border-t pt-4">
                            <h3 className="font-semibold text-teal-500">Gestión de Recordatorios</h3>
                            <div className="space-y-3">
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Nuevo recordatorio"
                                        value={nuevoRecordatorio}
                                        onChange={(e) => setNuevoRecordatorio(e.target.value)}
                                        className="border p-2 rounded w-full"
                                    />
                                    <button
                                        onClick={handleCrearRecordatorio}
                                        className="mt-2 bg-teal-500 text-white px-4 py-2 rounded"
                                    >
                                        Crear Recordatorio
                                    </button>
                                </div>
                                <ul className="space-y-2">
                                    {recordatorios.map((rec) => (
                                        <li key={rec.id} className="flex justify-between items-center border p-2 rounded">
                                            <input
                                                type="text"
                                                value={rec.texto}
                                                onChange={(e) => handleEditarRecordatorio(rec.id, e.target.value)}
                                                className="flex-grow border-none"
                                            />
                                            <button
                                                onClick={() => handleEliminarRecordatorio(rec.id)}
                                                className="ml-2 bg-red-500 text-white px-4 py-2 rounded"
                                            >
                                                Eliminar
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}