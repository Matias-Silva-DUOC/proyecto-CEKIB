import React, { useState, useEffect } from "react";
import { Doughnut, Bar, Line } from "react-chartjs-2";
import axios from "axios";
import { ArcElement } from "chart.js";
import Chart from "chart.js/auto";

export function GraficosDashboard() {
    const [kpiData, setKpiData] = useState({});
    const [donutData, setDonutData] = useState({});
    const [barData, setBarData] = useState({});
    const [lineData, setLineData] = useState({});
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                // Obtener datos de las APIs
                const citasResponse = await axios.get("http://localhost:8080/citas");
                const pagosResponse = await axios.get("http://localhost:8080/pagos");

                const citas = citasResponse.data;
                const pagos = pagosResponse.data;

                // Procesar los datos
                const processedData = processDashboardData(citas, pagos);

                // Actualizar los estados
                setKpiData(processedData.kpiData);
                setDonutData(processedData.donutData);
                setBarData(processedData.barData);
                setLineData(processedData.lineData);
                setTableData(processedData.tableData);
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        }

        fetchData();
    }, []);

    return (
        <div className="dashboard p-4">
            {/* KPIs */}
            <div className="grid grid-cols-3 gap-4 mb-8">
                <KpiCard title="Ingresos [Año Actual]" value={`$${kpiData.ingresosActual || 0}`} />
                <KpiCard title="Ingresos [Año Anterior]" value={`$${kpiData.ingresosAnterior || 0}`} />
                <KpiCard title="Ticket Promedio" value={`$${kpiData.ticketPromedio || 0}`} />
            </div>

            {/* Gráficos Donut */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                <DonutChart title="Citas por Especialidad" data={donutData.citasPorEspecialidad} />
                <DonutChart title="Citas por Estado" data={donutData.citasPorEstado} />
            </div>

            {/* Gráficos de Barras */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                <BarChart title="Ingresos por Profesional" data={barData.ingresosPorProfesional} />
                <BarChart title="Ingresos por Especialidad" data={barData.ingresosPorEspecialidad} />
            </div>
            <div className="grid mb-8">
                <BarChart
                    title="Sesiones Programadas vs Completadas por Especialidad"
                    data={barData.sesionesPorEspecialidad}
                />
            </div>

            {/* Gráfico de Línea */}
            <div className="grid mb-8">
                <LineChart title="Tendencia de Ingresos Mensuales" data={lineData.tendenciaMensual} />
            </div>

            {/* Tabla Resumen */}
            <div className="grid mb-8">
                <SummaryTable data={tableData} />
            </div>
        </div>
    );
}

function KpiCard({ title, value }) {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 text-center border">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-2xl font-bold">{value}</p>
        </div>
    );
}

function DonutChart({ title, data }) {
    if (!data) return null;
    return (
        <div className="bg-white shadow-md rounded-lg p-4 border">
            <h3 className="text-lg font-semibold mb-4">{title}</h3>
            <Doughnut data={data} />
        </div>
    );
}

function BarChart({ title, data }) {
    if (!data) return null;
    return (
        <div className="bg-white shadow-md rounded-lg p-4 border">
            <h3 className="text-lg font-semibold mb-4">{title}</h3>
            <Bar data={data} />
        </div>
    );
}

function LineChart({ title, data }) {
    if (!data) return null;
    return (
        <div className="bg-white shadow-md rounded-lg p-4 border">
            <h3 className="text-lg font-semibold mb-4">{title}</h3>
            <Line data={data} />
        </div>
    );
}

function SummaryTable({ data }) {
    if (!data || data.length === 0) return null;
    return (
        <div className="bg-white shadow-md rounded-lg p-4 border overflow-x-auto">
            <h3 className="text-lg font-semibold mb-4">Resumen</h3>
            <table className="min-w-full text-left border-collapse border border-gray-200">
                <thead>
                    <tr>
                        <th className="border border-gray-200 p-2">Especialidad</th>
                        <th className="border border-gray-200 p-2">Tratamientos</th>
                        <th className="border border-gray-200 p-2">Sesiones Programadas</th>
                        <th className="border border-gray-200 p-2">Sesiones Completadas</th>
                        <th className="border border-gray-200 p-2">% Cumplimiento</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            <td className="border border-gray-200 p-2">{row.especialidad}</td>
                            <td className="border border-gray-200 p-2">{row.tratamientos}</td>
                            <td className="border border-gray-200 p-2">{row.sesionesProgramadas}</td>
                            <td className="border border-gray-200 p-2">{row.sesionesCompletadas}</td>
                            <td className="border border-gray-200 p-2">{row.cumplimiento}%</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function processDashboardData(citas, pagos) {
    const currentYear = new Date().getFullYear();
    const lastYear = currentYear - 1;

    const ingresosActual = pagos
        .filter((p) => new Date(p.fechaPago).getFullYear() === currentYear)
        .reduce((sum, p) => sum + p.monto, 0);

    const ingresosAnterior = pagos
        .filter((p) => new Date(p.fechaPago).getFullYear() === lastYear)
        .reduce((sum, p) => sum + p.monto, 0);

    const ticketPromedio = ingresosActual / citas.length || 0;

    const citasPorEspecialidad = citas.reduce((acc, cita) => {
        const especialidad = cita.profesional.especialidadPro;
        acc[especialidad] = (acc[especialidad] || 0) + 1;
        return acc;
    }, {});

    const citasPorEstado = citas.reduce((acc, cita) => {
        acc[cita.estadoCita] = (acc[cita.estadoCita] || 0) + 1;
        return acc;
    }, {});

    const ingresosPorProfesional = citas.reduce((acc, cita) => {
        const profesional = cita.profesional.nombrePro;
        acc[profesional] = (acc[profesional] || 0) + cita.costo;
        return acc;
    }, {});

    const ingresosPorEspecialidad = citas.reduce((acc, cita) => {
        const especialidad = cita.profesional.especialidadPro;
        acc[especialidad] = (acc[especialidad] || 0) + cita.costo;
        return acc;
    }, {});

    const sesionesPorEspecialidad = citas.reduce((acc, cita) => {
        const especialidad = cita.profesional.especialidadPro;
        if (!acc[especialidad]) {
            acc[especialidad] = { programadas: 0, completadas: 0 };
        }
        acc[especialidad].programadas += 1;
        if (cita.estadoCita === "Completada") {
            acc[especialidad].completadas += 1;
        }
        return acc;
    }, {});

    const tendenciaMensual = Array(12).fill(0);
    pagos.forEach((pago) => {
        const mes = new Date(pago.fechaPago).getMonth();
        tendenciaMensual[mes] += pago.monto;
    });

    const tableData = Object.keys(sesionesPorEspecialidad).map((especialidad) => ({
        especialidad,
        tratamientos: sesionesPorEspecialidad[especialidad].programadas,
        sesionesProgramadas: sesionesPorEspecialidad[especialidad].programadas,
        sesionesCompletadas: sesionesPorEspecialidad[especialidad].completadas,
        cumplimiento: ((sesionesPorEspecialidad[especialidad].completadas / sesionesPorEspecialidad[especialidad].programadas) * 100).toFixed(2),
    }));

    return {
        kpiData: { ingresosActual, ingresosAnterior, ticketPromedio },
        donutData: {
            citasPorEspecialidad: formatDonutData(citasPorEspecialidad),
            citasPorEstado: formatDonutData(citasPorEstado),
        },
        barData: {
            ingresosPorProfesional: formatBarData(ingresosPorProfesional),
            ingresosPorEspecialidad: formatBarData(ingresosPorEspecialidad),
            sesionesPorEspecialidad: formatBarDataSesiones(sesionesPorEspecialidad),
        },
        lineData: {
            tendenciaMensual: formatLineData(tendenciaMensual),
        },
        tableData,
    };
}

function formatBarData(data) {
    return {
        labels: Object.keys(data),
        datasets: [
            {
                label: 'Ingresos',
                data: Object.values(data),
                backgroundColor: '#36A2EB',
            },
        ],
    };
}

function formatBarDataSesiones(data) {
    return {
        labels: Object.keys(data),
        datasets: [
            {
                label: 'Programadas',
                data: Object.values(data).map((d) => d.programadas),
                backgroundColor: '#FF6384',
            },
            {
                label: 'Completadas',
                data: Object.values(data).map((d) => d.completadas),
                backgroundColor: '#4BC0C0',
            },
        ],
    };
}

function formatLineData(data) {
    return {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        datasets: [
            {
                label: 'Ingresos Mensuales',
                data,
                fill: false,
                borderColor: '#FFCE56',
            },
        ],
    };
}

function formatDonutData(data) {
    return {
        labels: Object.keys(data),
        datasets: [
            {
                data: Object.values(data),
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"],
            },
        ],
    };
}