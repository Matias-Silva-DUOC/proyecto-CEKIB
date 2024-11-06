import React, { useState } from 'react';
import SidebarMed from '../../components/Medica/SidebarMed';

export default function HomeMedico() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

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
                            <h2 className="text-xl font-bold text-teal-600">¡Bienvenido, Dr. [Nombre del Médico]!</h2>
                            <p className="text-gray-600">Aquí está un resumen de tu día y recordatorios importantes.</p>
                        </div>

                        {/* Pacientes del Día */}
                        <div className="border-t pt-4 space-y-3">
                            <h3 className="font-semibold text-teal-500">Pacientes del Día</h3>
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
                                <li className="text-gray-700">Revisar resultados de laboratorio pendientes</li>
                                <li className="text-gray-700">Actualizar la ficha del paciente [Nombre]</li>
                                <li className="text-gray-700">Enviar notas a [Nombre del paciente]</li>
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
        </main >
    );
}