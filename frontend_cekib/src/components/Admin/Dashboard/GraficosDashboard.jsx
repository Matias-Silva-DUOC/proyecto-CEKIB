import React from "react";
import { Doughnut, Bar } from "react-chartjs-2"; // Importamos gráficos de donut y de barras
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Registra los componentes que vas a usar
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement, // Registra ArcElement para gráficos de tipo donut
    Title,
    Tooltip,
    Legend
);

export function GraficosDashboard() {
    // Datos del gráfico de donut
    const donutData = {
        labels: ['Cumplidas', 'No Cumplidas'],
        datasets: [
            {
                data: [232, 103], // Cambia estos valores según tus datos
                backgroundColor: ['#36A2EB', '#FF6384'],
                hoverBackgroundColor: ['#36A2EB', '#FF6384']
            }
        ]
    };

    // Datos del gráfico de barras
    const barData = {
        labels: ['Respiratoria', 'Músculo-Esquelética'], // Cambia esto según tus especialidades
        datasets: [
            {
                label: 'Sesiones Completas',
                data: [232, 93], // Cambia esto según tus datos
                backgroundColor: '#36A2EB'
            },
            {
                label: 'Sesiones Programadas',
                data: [335, 135], // Cambia esto según tus datos
                backgroundColor: '#FF6384'
            }
        ]
    };

    return (
        <div className="p-4">
            <div className="header mb-4">
                <div className="flex flex-col m-2">
                    <label>Fecha</label>
                    <select className="border border-teal-400 rounded p-2">
                        <option>2024 (Año) + octubre (Mes)</option>
                    </select>
                </div>
                <div className="flex flex-col m-2">
                    <label>Profesional</label>
                    <select className="border border-teal-400 rounded p-2">
                        <option>Todas</option>
                    </select>
                </div>
                <button className="bg-blue-500 text-white px-4 py-2 m-2 border border-teal-400 rounded">
                    VER PACIENTES
                </button>
            </div>

            {/* Grids de datos */}
            <div className="grid grid-cols-2 gap-4">
                {/* KPI Venta V/S Meta */}
                <div className="card border border-teal-400 rounded m-2 p-4">
                    <h2 className="text-center text-xl font-bold">KPI Venta V/S Meta</h2>
                    <p className="text-center text-4xl text-red-500">$22.315.916</p>
                    <p className="text-center">Meta: 24.993.825,81 (-10.71 %)</p>
                </div>

                {/* Ticket Promedio */}
                <div className="card border border-teal-400 rounded m-2 p-4">
                    <h2 className="text-center text-xl font-bold">Ticket Promedio</h2>
                    <p className="text-center text-4xl">$242.564</p>
                </div>
            </div>

            {/* Gráficos Donut y Tab */}
            <div className="grid grid-cols-2 gap-4">
                {/* Gráfico Donut */}
                <div className="card border border-teal-400 rounded m-2 p-4">
                    <h2 className="text-center text-xl font-bold">Cumplimiento de Sesiones</h2>
                    <Doughnut data={donutData} />
                </div>

                {/* Gráfico de Barras */}
                <div className="card border border-teal-400 rounded m-2 p-4">
                    <h2 className="text-center text-xl font-bold">Sesiones Completas vs Programadas</h2>
                    <Bar data={barData} options={{ responsive: true }} />
                </div>
            </div>

            {/* Tabla de Especialidades */}
            <div className="card border border-teal-400 rounded m-2 p-4">
                <h2 className="text-center text-xl font-bold">Especialidad</h2>
                <div className="table-container overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="border border-teal-400 p-2">Especialidad</th>
                                <th className="border border-teal-400 p-2">Cantidad de Tratamientos</th>
                                <th className="border border-teal-400 p-2">Cantidad de Sesiones Programadas</th>
                                <th className="border border-teal-400 p-2">Cantidad de Sesiones Completas</th>
                                <th className="border border-teal-400 p-2">% Cumplimiento Tratamiento</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Filas de datos de especialidades */}
                            <tr className="m-2">
                                <td className="border border-teal-400 p-2">Respiratoria</td>
                                <td className="border border-teal-400 p-2">28</td>
                                <td className="border border-teal-400 p-2">335</td>
                                <td className="border border-teal-400 p-2">232</td>
                                <td className="border border-teal-400 p-2">69.3 %</td>
                            </tr>
                            <tr className="m-2">
                                <td className="border border-teal-400 p-2">Músculo-Esquelética</td>
                                <td className="border border-teal-400 p-2">11</td>
                                <td className="border border-teal-400 p-2">135</td>
                                <td className="border border-teal-400 p-2">93</td>
                                <td className="border border-teal-400 p-2">68.9 %</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
