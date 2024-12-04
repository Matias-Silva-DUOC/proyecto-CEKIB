import React, { useState } from 'react';
import Sidebar from '../../components/Admin/Sidebar';

export default function HomeAdmin() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const profesionales = [
        { name: "Tiare Castro Correa", job: "Kinesióloga", image: "https://placehold.co/100x100" },
        { name: "Jessamine Castro Novoa", job: "Kinesióloga", image: "https://placehold.co/100x100" },
        { name: "Daniela Baeza C.", job: "Masoterapeuta", image: "https://placehold.co/100x100" },
    ];

    const visitas = [
        { title: "La importancia de la terapia física", visits: 120 },
        { title: "Nutrición para una mejor salud", visits: 75 },
        { title: "Ejercicios para fortalecer la espalda", visits: 90 },
    ];

    const tratamientos = [
        { fecha: "2024-10-29", paciente: "Juan Pérez", tipo: "Terapia Respiratoria" },
        { fecha: "2024-10-28", paciente: "Ana González", tipo: "Terapia Física" },
    ];

    const feedbacks = [
        { paciente: "María López", comentario: "Excelente atención y resultados en mi terapia." },
        { paciente: "Carlos Ruiz", comentario: "Me ayudaron a mejorar mi movilidad rápidamente." },
    ];

    return (
        <main>
            <div className="flex h-screen">
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            </div>
            <div className="hidden lg:fixed lg:inset-y-0 lg:inset-x-0 lg:flex border border-teal-400 rounded-lg my-2 mr-6 ml-40 mx-40 overflow-y-auto">
                <div className="flex-1">
                    <div className="card border border-teal-400 rounded m-2 p-4">
                        <h2 className="text-center text-xl font-bold">Profesionales Destacados</h2>
                        <div className="flex flex-wrap justify-around">
                            {profesionales.map((prof) => (
                                <div key={prof.name} className="flex flex-col items-center m-2">
                                    <img src={prof.image} alt={`${prof.name}`} className="rounded-full w-16 h-16 mb-2" />
                                    <p className="font-semibold">{prof.name}</p>
                                    <p className="text-gray-500">{prof.job}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="card border border-teal-400 rounded m-2 p-4">
                        <h2 className="text-center text-xl font-bold">Visitas del Blog</h2>
                        <ul className="list-disc pl-5">
                            {visitas.map((item) => (
                                <li key={item.title} className="flex justify-between py-1">
                                    <span>{item.title}</span>
                                    <span className="font-semibold">{item.visits} visitas</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="card border border-teal-400 rounded m-2 p-4">
                        <h2 className="text-center text-xl font-bold">Últimos Tratamientos</h2>
                        <table className="w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className="border p-2 text-left">Fecha</th>
                                    <th className="border p-2 text-left">Paciente</th>
                                    <th className="border p-2 text-left">Tipo de Tratamiento</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tratamientos.map((item) => (
                                    <tr key={item.fecha + item.paciente} className="border-t">
                                        <td className="border p-2">{item.fecha}</td>
                                        <td className="border p-2">{item.paciente}</td>
                                        <td className="border p-2">{item.tipo}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="card border border-teal-400 rounded m-2 p-4">
                        <h2 className="text-center text-xl font-bold">Feedback de Pacientes</h2>
                        <div>
                            {feedbacks.map((item, index) => (
                                <div key={index} className="border-b border-teal-400 py-2">
                                    <p className="font-semibold">{item.paciente}</p>
                                    <p>"{item.comentario}"</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main >
    );
}