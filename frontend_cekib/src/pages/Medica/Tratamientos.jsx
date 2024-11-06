import React, { useState } from 'react';
import SidebarMed from '../../components/Medica/SidebarMed';

export default function Tratamientos() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <main>
            <div className="flex h-screen">
                <SidebarMed sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            </div>
            <div className="hidden lg:fixed lg:inset-y-0 lg:inset-x-0 lg:flex border border-teal-400 rounded-lg my-2 mr-6 ml-40 mx-40 overflow-y-auto">
                <div className="flex-1">
                    <div className="bg-white shadow-lg rounded-lg p-6 space-y-6">

                        {/* Título de la Pestaña Tratamientos */}
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-bold text-teal-600">Gestión de Tratamientos</h2>
                            <p className="text-gray-600">Registra y actualiza información de tratamientos en curso</p>
                        </div>

                        {/* Información del Paciente */}
                        <div className="border border-teal-400 rounded-lg p-4 space-y-4">
                            <h3 className="font-semibold text-teal-500">Información del Paciente</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col">
                                    <label className="font-medium text-gray-700">Nombre:</label>
                                    <input type="text" className="border rounded-lg px-3 py-2" placeholder="Nombre del paciente" />
                                </div>
                                <div className="flex flex-col">
                                    <label className="font-medium text-gray-700">Edad:</label>
                                    <input type="number" className="border rounded-lg px-3 py-2" placeholder="Edad del paciente" />
                                </div>
                            </div>
                        </div>

                        {/* Selección de Tratamiento */}
                        <div className="border border-teal-400 rounded-lg p-4 space-y-4">
                            <h3 className="font-semibold text-teal-500">Tipo de Tratamiento</h3>
                            <select className="w-full border rounded-lg px-3 py-2">
                                <option value="">Seleccionar tratamiento...</option>
                                <option value="musculoesqueletico">Kinesiología Musculoesquelética</option>
                                <option value="respiratorio">Kinesiología Respiratoria</option>
                                <option value="piso_pelvico">Piso Pélvico</option>
                                <option value="masoterapia">Masoterapia</option>
                            </select>
                        </div>

                        {/* Descripción del Tratamiento */}
                        <div className="border border-teal-400 rounded-lg p-4 space-y-4">
                            <h3 className="font-semibold text-teal-500">Descripción del Tratamiento</h3>
                            <textarea className="w-full border rounded-lg px-3 py-2" rows="4" placeholder="Detalles del tratamiento..."></textarea>
                        </div>

                        {/* Frecuencia y Sesiones */}
                        <div className="border border-teal-400 rounded-lg p-4 space-y-4">
                            <h3 className="font-semibold text-teal-500">Frecuencia y Sesiones</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col">
                                    <label className="font-medium text-gray-700">Frecuencia (veces por semana):</label>
                                    <input type="number" className="border rounded-lg px-3 py-2" placeholder="Ej. 3" />
                                </div>
                                <div className="flex flex-col">
                                    <label className="font-medium text-gray-700">Número de sesiones:</label>
                                    <input type="number" className="border rounded-lg px-3 py-2" placeholder="Ej. 10" />
                                </div>
                            </div>
                        </div>

                        {/* Botón para Guardar */}
                        <div className="flex justify-center">
                            <button className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md">
                                Guardar Tratamiento
                            </button>
                        </div>

                    </div>

                </div>
            </div>
        </main >
    );
}