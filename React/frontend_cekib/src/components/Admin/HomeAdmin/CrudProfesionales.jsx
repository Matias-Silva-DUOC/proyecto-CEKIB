import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';

export function CrudProfesionales() {
    const [profesionales, setProfesionales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingProfesional, setEditingProfesional] = useState(null);
    const [formData, setFormData] = useState({
        rutPro: '',
        nombrePro: '',
        apellidoPro: '',
        especialidadPro: '',
        correoPro: '',
        fonoPro: '',
        horario: {},
    });
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const API_URL = 'http://localhost:8080/profesionales';

    useEffect(() => {
        fetchProfesionales();
    }, []);

    const fetchProfesionales = async () => {
        try {
            const response = await axios.get(API_URL);
            setProfesionales(response.data);
        } catch (err) {
            setError('No se pudieron cargar los profesionales.');
        } finally {
            setLoading(false);
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.nombrePro || formData.nombrePro.length > 64) {
            errors.nombrePro = 'El nombre es obligatorio y no puede superar los 64 caracteres.';
        }
        if (!formData.apellidoPro || formData.apellidoPro.length > 64) {
            errors.apellidoPro = 'El apellido es obligatorio y no puede superar los 64 caracteres.';
        }
        if (!formData.rutPro) {
            errors.rutPro = 'El RUT es obligatorio.';
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, checked } = e.target;

        if (name.includes("horario")) {
            const day = name.split('-')[1];  // Lunes, Martes, etc.
            setFormData(prevState => {
                const updatedHorario = { ...prevState.horario };
                if (checked) {
                    updatedHorario[day] = { inicio: "09:00", fin: "18:00" }; // Por defecto, se asignan los horarios
                } else {
                    delete updatedHorario[day];  // Si no está seleccionado, eliminamos el día
                }
                return { ...prevState, horario: updatedHorario };
            });
        } else {
            setFormData({ ...formData, [name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            // Si estamos editando, actualizamos, si no, creamos un nuevo profesional
            if (editingProfesional) {
                await axios.put(`${API_URL}/${editingProfesional.rutPro}`, formData);
            } else {
                await axios.post(API_URL, formData);
            }
            fetchProfesionales();
            resetForm();
        } catch (err) {
            setError('Hubo un error al guardar el profesional.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEdit = (profesional) => {
        setEditingProfesional(profesional);
        setFormData({ ...profesional });
    };

    const handleDelete = async (rutPro) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este profesional?')) {
            try {
                await axios.delete(`${API_URL}/${rutPro}`);
                fetchProfesionales();
            } catch (err) {
                setError('Hubo un error al eliminar el profesional.');
            }
        }
    };

    const resetForm = () => {
        setEditingProfesional(null);
        setFormData({
            rutPro: '',
            nombrePro: '',
            apellidoPro: '',
            especialidadPro: '',
            correoPro: '',
            fonoPro: '',
            horario: {},
        });
        setFormErrors({});
    };

    if (loading) return <p>Cargando profesionales...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="mx-auto p-6 flex flex-col h-screen">
            <header className="rounded shadow">
                <h1 className="text-3xl text-center text-teal-400 font-bold">Gestión de Profesionales</h1>
            </header>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="mb-2 bg-white p-4 shadow-md rounded-lg border">
                <h2 className="text-lg text-deep-purple-300 font-semibold mb-4">{editingProfesional ? 'Editar Profesional' : 'Crear Profesional'}</h2>

                {/* RUT */}
                <div className="mb-4">
                    <label className="block font-base">RUT:</label>
                    <input
                        type="text"
                        name="rutPro"
                        value={formData.rutPro}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                        placeholder="Ingresa el RUT"
                    />
                    {formErrors.rutPro && <p className="text-red-500 text-sm">{formErrors.rutPro}</p>}
                </div>

                {/* Nombre */}
                <div className="mb-4">
                    <label className="block font-base">Nombre:</label>
                    <input
                        type="text"
                        name="nombrePro"
                        value={formData.nombrePro}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                        placeholder="Ingresa el nombre"
                    />
                    {formErrors.nombrePro && <p className="text-red-500 text-sm">{formErrors.nombrePro}</p>}
                </div>

                {/* Apellido */}
                <div className="mb-4">
                    <label className="block font-base">Apellido:</label>
                    <input
                        type="text"
                        name="apellidoPro"
                        value={formData.apellidoPro}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                        placeholder="Ingresa el apellido"
                    />
                    {formErrors.apellidoPro && <p className="text-red-500 text-sm">{formErrors.apellidoPro}</p>}
                </div>

                {/* Horario */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium">Horario:</label>
                    <div className="flex space-x-6">
                        {['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'].map((day) => (
                            <label key={day} className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    name={`horario-${day}`}
                                    checked={formData.horario[day] ? true : false}
                                    onChange={handleInputChange}
                                    className="form-checkbox"
                                />
                                <span className="ml-2 capitalize">{day}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Botones */}
                <button
                    type="submit"
                    className={`bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition ${isSubmitting && 'opacity-50 cursor-not-allowed'}`}
                    disabled={isSubmitting}
                >
                    {editingProfesional ? 'Actualizar Profesional' : 'Crear Profesional'}
                </button>

                {editingProfesional && (
                    <button
                        type="button"
                        onClick={resetForm}
                        className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                    >
                        Cancelar
                    </button>
                )}
            </form>

            {/* Tabla */}
            <div className="flex-grow overflow-y-auto border border-gray-300 rounded-md shadow-md">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2 text-left">RUT</th>
                            <th className="border p-2 text-left">Nombre</th>
                            <th className="border p-2 text-left">Especialidad</th>
                            <th className="border p-2 text-left">Correo</th>
                            <th className="border p-2 text-left">Teléfono</th>
                            <th className="border p-2 text-left">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {profesionales.map((profesional) => (
                            <tr key={profesional.rutPro} className="hover:bg-gray-50">
                                <td className="border p-2">{profesional.rutPro}</td>
                                <td className="border p-2">{profesional.nombrePro} {profesional.apellidoPro}</td>
                                <td className="border p-2">{profesional.especialidadPro}</td>
                                <td className="border p-2">{profesional.correoPro}</td>
                                <td className="border p-2">{profesional.fonoPro}</td>
                                <td className="border p-2 flex space-x-2">
                                    <button
                                        onClick={() => handleEdit(profesional)}
                                        className="text-blue-500 hover:text-blue-700"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(profesional.rutPro)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}


export default CrudProfesionales;