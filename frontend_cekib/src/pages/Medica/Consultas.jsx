import React, { useState } from 'react';
import SidebarMed from '../../components/Medica/SidebarMed';

export default function Consultas() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <main>
            <div className="flex h-screen">
                <SidebarMed sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            </div>
            <div className="hidden lg:fixed lg:inset-y-0 lg:inset-x-0 lg:flex border border-teal-400 rounded-lg my-2 mr-6 ml-40 mx-40 overflow-y-auto">
                <div className="flex-1">
                    <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
                        {/* Título de Consultas */}
                        <div className="text-center">
                            <h2 className="text-xl font-bold text-teal-600">Consultas Médicas</h2>
                            <p className="text-gray-600">Gestión de las consultas recientes y programadas</p>
                        </div>

                        {/* Consultas del Día */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-teal-500">Consultas del Día</h3>
                            <ul className="space-y-3">
                                {[...Array(3)].map((_, idx) => (
                                    <li key={idx} className="border p-3 rounded-md flex justify-between items-center">
                                        <div>
                                            <p className="text-gray-800 font-medium">Paciente {idx + 1}</p>
                                            <p className="text-gray-500 text-sm">Hora: {`${9 + idx}:00 AM`}</p>
                                        </div>
                                        <button className="text-sm text-teal-600 hover:underline">Detalles</button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Consultas Recientes */}
                        <div className="border-t pt-4 space-y-4">
                            <h3 className="font-semibold text-teal-500">Consultas Recientes</h3>
                            <ul className="space-y-3">
                                {[...Array(3)].map((_, idx) => (
                                    <li key={idx} className="border p-3 rounded-md flex justify-between items-center">
                                        <div>
                                            <p className="text-gray-800 font-medium">Paciente {idx + 4}</p>
                                            <p className="text-gray-500 text-sm">Fecha: {`2024-10-${26 + idx}`}</p>
                                        </div>
                                        <button className="text-sm text-teal-600 hover:underline">Ver Consulta</button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Buscador de Consultas */}
                        <div className="border-t pt-4">
                            <h3 className="font-semibold text-teal-500 mb-2">Buscar Consulta</h3>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="text"
                                    placeholder="Buscar por nombre o fecha..."
                                    className="border rounded w-full px-2 py-1"
                                />
                                <button className="bg-teal-600 text-white px-4 py-1 rounded hover:bg-teal-700">Buscar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main >
    );
}