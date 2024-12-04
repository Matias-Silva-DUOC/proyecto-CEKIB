import React, { useState, useEffect } from 'react';
import SidebarMed from '../../components/Medica/SidebarMed';
import axios from 'axios';

export default function Tratamientos() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [tratamientos, setTratamientos] = useState([]); // Estado para almacenar los tratamientos
    const [nuevoTratamiento, setNuevoTratamiento] = useState({
        idTratamiento: '',
        tipoTratamiento: '',
        descripcionTratamiento: '',
        duracionSesiones: ''
    }); // Estado para el nuevo tratamiento
    const [consultas, setConsultas] = useState([]); // Estado para las consultas ingresadas

    // Fetch de tratamientos
    useEffect(() => {
        const fetchTratamientos = async () => {
            try {
                const response = await axios.get("http://localhost:8080/tratamientos");
                setTratamientos(response.data);
            } catch (error) {
                console.error("Error al obtener los tratamientos:", error);
            }
        };

        fetchTratamientos();
    }, []);

    // Manejar el cambio en los campos del nuevo tratamiento
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNuevoTratamiento({ ...nuevoTratamiento, [name]: value });
    };

    // Manejar la creación de un nuevo tratamiento
    const handleCrearTratamiento = () => {
        if (
            !nuevoTratamiento.tipoTratamiento ||
            !nuevoTratamiento.descripcionTratamiento ||
            !nuevoTratamiento.duracionSesiones
        ) {
            alert("Por favor, complete todos los campos del tratamiento.");
            return;
        }

        const nuevo = {
            ...nuevoTratamiento,
            idTratamiento: Date.now()
        };

        setTratamientos([...tratamientos, nuevo]);
        setNuevoTratamiento({
            idTratamiento: '',
            tipoTratamiento: '',
            descripcionTratamiento: '',
            duracionSesiones: ''
        });
    };

    // Manejar la eliminación de un tratamiento
    const handleEliminarTratamiento = (idTratamiento) => {
        setTratamientos(tratamientos.filter(tratamiento => tratamiento.idTratamiento !== idTratamiento));
    };

    // Manejar la creación de una nueva consulta
    const handleCrearConsulta = (e) => {
        e.preventDefault();
        const nuevaConsulta = {
            id: Date.now(),
            tratamiento: nuevoTratamiento,
        };
        setConsultas([...consultas, nuevaConsulta]);
    };

    return (
        <main>
            <div className="flex h-screen">
                <SidebarMed sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            </div>
            <div className="hidden lg:fixed lg:inset-y-0 lg:inset-x-0 lg:flex border border-teal-400 rounded-lg my-2 mr-6 ml-40 mx-40 overflow-y-auto">
                <div className="flex-1">
                    <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
                        {/* Título */}
                        <div className="text-center">
                            <h2 className="text-xl font-bold text-teal-600">Gestión de Tratamientos y Consultas</h2>
                            <p className="text-gray-600">Cree y gestione tratamientos y consultas para sus pacientes</p>
                        </div>

                        {/* Resumen de Tratamientos */}
                        <div className="border-t pt-4">
                            <h3 className="font-semibold text-teal-500">Resumen de Tratamientos Realizados</h3>
                            <table className="table-auto w-full text-left border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="border border-gray-300 px-4 py-2">Tipo de Tratamiento</th>
                                        <th className="border border-gray-300 px-4 py-2">Descripción</th>
                                        <th className="border border-gray-300 px-4 py-2">Duración (sesiones)</th>
                                        <th className="border border-gray-300 px-4 py-2">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tratamientos.map((tratamiento) => (
                                        <tr key={tratamiento.idTratamiento}>
                                            <td className="border border-gray-300 px-4 py-2">{tratamiento.tipoTratamiento}</td>
                                            <td className="border border-gray-300 px-4 py-2">{tratamiento.descripcionTratamiento}</td>
                                            <td className="border border-gray-300 px-4 py-2">{tratamiento.duracionSesiones}</td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                <button
                                                    onClick={() => handleEliminarTratamiento(tratamiento.idTratamiento)}
                                                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                                                >
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Formulario para nuevo tratamiento */}
                        <div className="border-t pt-4">
                            <h3 className="font-semibold text-teal-500">Crear Nuevo Tratamiento</h3>
                            <div className="space-y-3">
                                <input
                                    type="text"
                                    name="tipoTratamiento"
                                    placeholder="Tipo de Tratamiento"
                                    value={nuevoTratamiento.tipoTratamiento}
                                    onChange={handleInputChange}
                                    className="border rounded w-full px-2 py-1"
                                />
                                <textarea
                                    name="descripcionTratamiento"
                                    placeholder="Descripción del Tratamiento"
                                    value={nuevoTratamiento.descripcionTratamiento}
                                    onChange={handleInputChange}
                                    className="border rounded w-full px-2 py-1"
                                />
                                <input
                                    type="number"
                                    name="duracionSesiones"
                                    placeholder="Duración en sesiones"
                                    value={nuevoTratamiento.duracionSesiones}
                                    onChange={handleInputChange}
                                    className="border rounded w-full px-2 py-1"
                                />
                                <button
                                    onClick={handleCrearTratamiento}
                                    className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
                                >
                                    Crear Tratamiento
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
