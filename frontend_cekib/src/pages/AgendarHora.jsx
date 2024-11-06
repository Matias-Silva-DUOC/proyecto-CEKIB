import { useState } from 'react';

export default function AgendarHora() {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        fecha: '',
        profesional: '',
    });

    const [agendarVisible, setAgendarVisible] = useState(false);

    const profesionales = [
        { id: 1, nombre: "Tiare Castro Correa", especialidad: "Kinesióloga" },
        { id: 2, nombre: "Jessamine Castro Novoa", especialidad: "Kinesióloga" },
        { id: 3, nombre: "Daniela Baeza C.", especialidad: "Masoterapeuta" },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes agregar la lógica para enviar los datos a la API
        console.log("Datos enviados: ", formData);
        // Restablecer el formulario después de enviar
        setFormData({
            nombre: '',
            apellido: '',
            email: '',
            telefono: '',
            fecha: '',
            profesional: '',
        });
        setAgendarVisible(false); // Ocultar el formulario después de enviar
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Bienvenido al Panel de Administración</h1>
            <button
                onClick={() => setAgendarVisible(!agendarVisible)}
                className="bg-teal-500 text-white p-2 rounded mb-4 hover:bg-teal-600 transition"
            >
                {agendarVisible ? 'Cerrar formulario' : 'Agendar hora'}
            </button>
            {agendarVisible && (
                <div className="card border border-teal-400 rounded m-4 p-4">
                    <h2 className="text-center text-xl font-bold">Agendar Hora</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col">
                        <input
                            type="text"
                            name="nombre"
                            placeholder="Nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            className="border p-2 mb-2 rounded"
                            required
                        />
                        <input
                            type="text"
                            name="apellido"
                            placeholder="Apellido"
                            value={formData.apellido}
                            onChange={handleChange}
                            className="border p-2 mb-2 rounded"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="border p-2 mb-2 rounded"
                            required
                        />
                        <input
                            type="tel"
                            name="telefono"
                            placeholder="Teléfono"
                            value={formData.telefono}
                            onChange={handleChange}
                            className="border p-2 mb-2 rounded"
                            required
                        />
                        <input
                            type="date"
                            name="fecha"
                            value={formData.fecha}
                            onChange={handleChange}
                            className="border p-2 mb-2 rounded"
                            required
                        />
                        <select
                            name="profesional"
                            value={formData.profesional}
                            onChange={handleChange}
                            className="border p-2 mb-2 rounded"
                            required
                        >
                            <option value="" disabled>Select un profesional</option>
                            {profesionales.map((prof) => (
                                <option key={prof.id} value={prof.nombre}>{prof.nombre} - {prof.especialidad}</option>
                            ))}
                        </select>
                        <button
                            type="submit"
                            className="bg-teal-500 text-white p-2 rounded hover:bg-teal-600 transition"
                        >
                            Agendar
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}