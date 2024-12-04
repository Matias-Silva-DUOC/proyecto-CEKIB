import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Pie, Line } from 'react-chartjs-2';
import 'chart.js/auto';

const GraficosDashboard = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [profesionales, setProfesionales] = useState([]);
    const [pacientes, setPacientes] = useState([]);
    const [pagos, setPagos] = useState([]);
    const [tratamientos, setTratamientos] = useState([]);
    const [citasPorEspecialidad, setCitasPorEspecialidad] = useState([]);
    const [citasPorEstado, setCitasPorEstado] = useState([]);
    const [ingresosPorProfesional, setIngresosPorProfesional] = useState([]);
    const [ingresosPorEspecialidad, setIngresosPorEspecialidad] = useState([]);
    const [tendenciaMensual, setTendenciaMensual] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const citasResponse = await fetch('http://localhost:8080/citas');
                const pagosResponse = await fetch('http://localhost:8080/pagos');
                const profesionalesResponse = await fetch('http://localhost:8080/profesionales');

                const citasData = await citasResponse.json();
                const pagosData = await pagosResponse.json();
                const profesionalesData = await profesionalesResponse.json();

                // Process data here
                const especialidades = {};
                const estados = { Confirmada: 0, Pendiente: 0, Anulada: 0 };
                const ingresosProfesionales = {};
                const ingresosEspecialidades = {};
                const ingresosMensuales = Array(12).fill(0);

                citasData.forEach(cita => {
                    const especialidad = profesionalesData.find(
                        prof => prof.rutPro === cita.rutPro
                    )?.especialidadPro;

                    if (especialidad) {
                        especialidades[especialidad] = (especialidades[especialidad] || 0) + 1;
                    }

                    estados[cita.estado_cita]++;
                });

                pagosData.forEach(pago => {
                    const profesional = profesionalesData.find(
                        prof => prof.rutPro === pago.rutPro
                    );

                    if (profesional) {
                        ingresosProfesionales[profesional.nombrePro] =
                            (ingresosProfesionales[profesional.nombrePro] || 0) + pago.monto;

                        ingresosEspecialidades[profesional.especialidadPro] =
                            (ingresosEspecialidades[profesional.especialidadPro] || 0) + pago.monto;
                    }

                    const month = new Date(pago.fechaPago).getMonth();
                    ingresosMensuales[month] += pago.monto;
                });

                setCitasPorEspecialidad(especialidades);
                setCitasPorEstado(estados);
                setIngresosPorProfesional(ingresosProfesionales);
                setIngresosPorEspecialidad(ingresosEspecialidades);
                setTendenciaMensual(ingresosMensuales);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const generateChartData = (labels, data) => ({
        labels,
        datasets: [
            {
                label: 'Cantidad',
                data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    });

    useEffect(() => {
        axios.get('http://localhost:8080/users').then((res) => setUsuarios(res.data));
        axios.get('http://localhost:8080/profesionales').then((res) => setProfesionales(res.data));
        axios.get('http://localhost:8080/pacientes').then((res) => setPacientes(res.data));
        axios.get('http://localhost:8080/pagos').then((res) => setPagos(res.data));
        axios.get('http://localhost:8080/tratamientos').then((res) => setTratamientos(res.data));
    }, []);

    const totalPagosCompletados = pagos.filter(p => p.estadoPago === 'Completado').length;
    const totalPagosPendientes = pagos.filter(p => p.estadoPago === 'Pendiente').length;

    const pagosPorMetodo = pagos.reduce((acc, pago) => {
        acc[pago.metodoPago] = (acc[pago.metodoPago] || 0) + 1;
        return acc;
    }, {});

    const tratamientosPorTipo = tratamientos.reduce((acc, tratamiento) => {
        acc[tratamiento.tipoTratamiento] = (acc[tratamiento.tipoTratamiento] || 0) + 1;
        return acc;
    }, {});

    // Agrupación por rangos de edad
    const pacientesPorRangoEdad = pacientes.reduce((acc, paciente) => {
        const edad = paciente.edadPac;
        if (edad < 18) acc['Menores de 18']++;
        else if (edad >= 18 && edad <= 30) acc['18-30']++;
        else if (edad >= 31 && edad <= 45) acc['31-45']++;
        else if (edad >= 46 && edad <= 60) acc['46-60']++;
        else acc['Mayores de 60']++;
        return acc;
    }, { 'Menores de 18': 0, '18-30': 0, '31-45': 0, '46-60': 0, 'Mayores de 60': 0 })

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <header className="bg-teal-400 text-white p-4 rounded shadow">
                <h1 className="text-2xl font-bold">Dashboard - Estadísticas</h1>
            </header>

            <section className="flex justify-between items-stretch gap-4 mt-6">
                <div className="bg-white p-4 rounded shadow border border-teal-400 text-center flex-1">
                    <h2 className="text-lg font-semibold">Total de Usuarios</h2>
                    <p className="text-2xl mt-2 font-bold">{usuarios.length}</p>
                </div>

                <div className="bg-white p-4 rounded shadow border border-teal-400 text-center flex-1">
                    <h2 className="text-lg font-semibold">Profesionales</h2>
                    <p className="text-2xl mt-2 font-bold">{profesionales.length}</p>
                </div>

                <div className="bg-white p-4 rounded shadow border border-teal-400 text-center flex-1">
                    <h2 className="text-lg font-semibold">Pacientes</h2>
                    <p className="text-2xl mt-2 font-bold">{pacientes.length}</p>
                </div>

                <div className="bg-white p-4 rounded shadow border border-teal-400 text-center flex-1">
                    <h2 className="text-lg font-semibold">Pagos Completados</h2>
                    <p className="text-2xl mt-2 font-bold">{totalPagosCompletados}</p>
                </div>

                <div className="bg-white p-4 rounded shadow border border-teal-400 text-center flex-1">
                    <h2 className="text-lg font-semibold">Pagos Pendientes</h2>
                    <p className="text-2xl mt-2 font-bold">{totalPagosPendientes}</p>
                </div>
            </section>

            <section className="flex justify-between items-stretch mt-8 space-x-4">
                <div className="bg-white p-6 rounded shadow flex-1">
                    <h2 className="text-xl font-bold text-teal-400 mb-4">Pagos por Método</h2>
                    <Pie
                        data={{
                            labels: Object.keys(pagosPorMetodo),
                            datasets: [
                                {
                                    data: Object.values(pagosPorMetodo),
                                    backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe'],
                                },
                            ],
                        }}
                    />
                </div>

                <div className="bg-white p-6 rounded shadow flex-1">
                    <h2 className="text-xl font-bold text-teal-400 mb-4">Tratamientos por Tipo</h2>
                    <Bar
                        data={{
                            labels: Object.keys(tratamientosPorTipo),
                            datasets: [
                                {
                                    label: 'Cantidad',
                                    data: Object.values(tratamientosPorTipo),
                                    backgroundColor: '#36a2eb',
                                },
                            ],
                        }}
                    />
                </div>

                <div className="bg-white p-6 rounded shadow flex-1">
                    <h2 className="text-xl font-bold text-teal-400 mb-4">Pacientes por Rango de Edad</h2>
                    <Bar
                        data={{
                            labels: Object.keys(pacientesPorRangoEdad),
                            datasets: [
                                {
                                    label: 'Cantidad de Pacientes',
                                    data: Object.values(pacientesPorRangoEdad),
                                    backgroundColor: '#4caf50',
                                },
                            ],
                        }}
                        options={{
                            scales: {
                                y: {
                                    beginAtZero: true,
                                },
                            },
                        }}
                    />
                </div>
            </section>

            <div className="bg-white p-6 rounded shadow w-full">
                <h2 className="text-xl font-bold text-teal-400 mb-4 text-center">Estadísticas Generales</h2>
                <ul className="flex justify-between items-center border rounded-xl border-teal-300">
                    <li className="flex-1 text-center">
                        <p className="text-lg font-semibold">Total de Tratamientos</p>
                        <p className="text-2xl font-bold mt-2">{tratamientos.length}</p>
                    </li>
                    <li className="flex-1 text-center">
                        <p className="text-lg font-semibold">Total de Pagos</p>
                        <p className="text-2xl font-bold mt-2">{pagos.length}</p>
                    </li>
                    <li className="flex-1 text-center">
                        <p className="text-lg font-semibold">Total de Sesiones</p>
                        <p className="text-2xl font-bold mt-2">
                            {tratamientos.reduce((sum, t) => sum + t.duracionSesiones, 0)}
                        </p>
                    </li>
                </ul>
            </div>

            <div className="bg-white p-4 shadow-md rounded-md text-center flex items-center justify-center">
                <div className="w-full max-w-4xl">
                    <h2 className="text-xl font-bold text-teal-400 mb-4 text-center">Tendencia de Ingresos Mensuales</h2>
                    <div className="h-96">
                        <Line
                            data={generateChartData(
                                [
                                    'Enero',
                                    'Febrero',
                                    'Marzo',
                                    'Abril',
                                    'Mayo',
                                    'Junio',
                                    'Julio',
                                    'Agosto',
                                    'Septiembre',
                                    'Octubre',
                                    'Noviembre',
                                    'Diciembre',
                                ],
                                tendenciaMensual
                            )}
                            options={{
                                maintainAspectRatio: false,
                            }}
                        />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default GraficosDashboard;
