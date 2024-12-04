import React, { useState, useEffect } from 'react';
import SidebarMed from '../../components/Medica/SidebarMed';
import axios from 'axios';

export default function Consultas() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [tratamientos, setTratamientos] = useState([]); // Lista de tratamientos
    const [consultas, setConsultas] = useState([]); // Lista de consultas
    const [nuevaConsulta, setNuevaConsulta] = useState({
        idConsulta: '',
        tratamientoSeleccionado: '',
        descripcionConsulta: '',
        rutPaciente: '',
    }); // Estado para nueva consulta

    // Fetch de tratamientos
    useEffect(() => {
        const fetchTratamientos = async () => {
            try {
                const response = await axios.get("http://localhost:8080/tratamientos");
                const tratamientosUnicos = response.data.filter(
                    (tratamiento, index, self) =>
                        index === self.findIndex((t) => t.tipoTratamiento === tratamiento.tipoTratamiento)
                );
                setTratamientos(tratamientosUnicos);
            } catch (error) {
                console.error("Error al obtener los tratamientos:", error);
            }
        };

        fetchTratamientos();
    }, []);

    // Manejar el cambio en los campos de nueva consulta
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNuevaConsulta({ ...nuevaConsulta, [name]: value });
    };

    // Crear una nueva consulta
    const handleCrearConsulta = () => {
        if (!nuevaConsulta.tratamientoSeleccionado || !nuevaConsulta.descripcionConsulta || !nuevaConsulta.rutPaciente) {
            alert("Por favor, complete todos los campos de la consulta.");
            return;
        }

        const nueva = {
            idConsulta: Date.now(),
            tratamientoSeleccionado: nuevaConsulta.tratamientoSeleccionado,
            descripcionConsulta: nuevaConsulta.descripcionConsulta,
            rutPaciente: nuevaConsulta.rutPaciente,
        };

        setConsultas([...consultas, nueva]);
        setNuevaConsulta({
            idConsulta: '',
            tratamientoSeleccionado: '',
            descripcionConsulta: '',
            rutPaciente: '',
        });
    };

    // Editar una consulta existente
    const handleEditarConsulta = (idConsulta, campo, valor) => {
        setConsultas(
            consultas.map((consulta) =>
                consulta.idConsulta === idConsulta ? { ...consulta, [campo]: valor } : consulta
            )
        );
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
                            <h2 className="text-xl font-bold text-teal-600">Gestión de Consultas</h2>
                            <p className="text-gray-600">Cree, edite y gestione consultas para sus pacientes</p>
                        </div>

                        {/* Formulario para nueva consulta */}
                        <div className="border-t pt-4">
                            <h3 className="font-semibold text-teal-500">Crear Nueva Consulta</h3>
                            <div className="space-y-3">
                                <input
                                    type="text"
                                    name="rutPaciente"
                                    placeholder="RUT del Paciente"
                                    value={nuevaConsulta.rutPaciente}
                                    onChange={handleInputChange}
                                    className="border rounded w-full px-2 py-1"
                                />
                                <select
                                    name="tratamientoSeleccionado"
                                    className="border rounded w-full px-2 py-1"
                                    value={nuevaConsulta.tratamientoSeleccionado}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Seleccione un tratamiento</option>
                                    {tratamientos.map((tratamiento) => (
                                        <option key={tratamiento.idTratamiento} value={tratamiento.tipoTratamiento}>
                                            {tratamiento.tipoTratamiento}
                                        </option>
                                    ))}
                                </select>
                                <textarea
                                    name="descripcionConsulta"
                                    placeholder="Descripción de la consulta"
                                    value={nuevaConsulta.descripcionConsulta}
                                    onChange={handleInputChange}
                                    className="border rounded w-full px-2 py-1"
                                ></textarea>
                                <button
                                    onClick={handleCrearConsulta}
                                    className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
                                >
                                    Crear Consulta
                                </button>
                            </div>
                        </div>

                        {/* Lista de Consultas */}
                        <div className="border-t pt-4">
                            <h3 className="font-semibold text-teal-500">Consultas Realizadas</h3>
                            <ul className="space-y-3">
                                {consultas.map((consulta) => (
                                    <li key={consulta.idConsulta} className="border p-3 rounded-md">
                                        <div className="space-y-2">
                                            <div>
                                                <strong>RUT Paciente:</strong> {consulta.rutPaciente}
                                            </div>
                                            <div>
                                                <strong>Tratamiento:</strong> {consulta.tratamientoSeleccionado}
                                            </div>
                                            <div>
                                                <strong>Descripción:</strong>
                                                <input
                                                    type="text"
                                                    value={consulta.descripcionConsulta}
                                                    onChange={(e) =>
                                                        handleEditarConsulta(consulta.idConsulta, 'descripcionConsulta', e.target.value)
                                                    }
                                                    className="border rounded w-full px-2 py-1"
                                                />
                                            </div>
                                            <button
                                                onClick={() =>
                                                    setConsultas(
                                                        consultas.filter((c) => c.idConsulta !== consulta.idConsulta)
                                                    )
                                                }
                                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                            >
                                                Eliminar Consulta
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
