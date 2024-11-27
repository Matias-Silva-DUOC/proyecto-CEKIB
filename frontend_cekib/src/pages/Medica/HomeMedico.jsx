import React, { useState, useEffect } from 'react';
import SidebarMed from '../../components/Medica/SidebarMed';
import { useLocation } from "react-router-dom";
import axios from 'axios';

export default function HomeMedico() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [profesional, setProfesional] = useState(null); // Estado para guardar los datos del profesional
    const [currentIdUsuario, setCurrentIdUsuario] = useState(null); // Estado para guardar el idUsuario actual
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
            } catch (error) {
                console.error("Error al obtener los datos del profesional:", error);
            }
        };

        if (currentIdUsuario) {
            fetchProfesional();
        }
    }, [currentIdUsuario]);

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

                        {/* Pacientes del Día */}
                        <div className="border-t pt-4 space-y-3">
                            <h3 className="font-semibold text-teal-500">Pacientes de la semana</h3>
                            <ul className="space-y-2">
                                {[...Array(3)].map((_, idx) => (
                                    <li key={idx} className="flex justify-between items-center">
                                        <span className="text-gray-700">Paciente {idx + 1}</span>
                                        <button className="text-sm text-teal-600 hover:underline">Ver Consulta</button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Recordatorios */}
                        <div className="border-t pt-4">
                            <h3 className="font-semibold text-teal-500">Recordatorios</h3>
                            <ul className="space-y-2">
                                {profesional ? (
                                    <li className="text-gray-700">{profesional.recordatorio}</li>
                                ) : (
                                    <li className="text-gray-700">Cargando recordatorios...</li>
                                )}
                            </ul>
                        </div>

                        {/* Estadísticas de la Semana */}
                        <div className="border-t pt-4">
                            <h3 className="font-semibold text-teal-500">Estadísticas de la Semana</h3>
                            <div className="flex justify-around text-teal-600">
                                <div className="text-center">
                                    <p className="text-2xl font-bold">15</p>
                                    <p>Consultas</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold">5</p>
                                    <p>Tratamientos Iniciados</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold">8</p>
                                    <p>Fichas Actualizadas</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
