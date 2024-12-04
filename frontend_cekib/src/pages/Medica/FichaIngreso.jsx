import React, { useState } from 'react';
import SidebarMed from '../../components/Medica/SidebarMed';

export default function FichaIngreso() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <main>
            <div className="flex h-screen">
                <SidebarMed sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            </div>
            <div className="hidden lg:fixed lg:inset-y-0 lg:inset-x-0 lg:flex border border-teal-400 rounded-lg my-2 mr-6 ml-40 mx-40 overflow-y-auto">
                <div className="flex-1">
                    <div className="p-6 space-y-8">

                        {/* Datos Personales */}
                        <div className="border border-teal-400 rounded p-4 space-y-4">
                            <h2 className="text-lg font-bold">Datos Personales</h2>
                            {["Nombre", "RUT", "Edad", "Fecha nacimiento", "Teléfono", "Dirección", "Ocupación", "Grupo Familiar", "Cirugías"].map((label) => (
                                <div key={label} className="flex items-center justify-between">
                                    <label>{label}:</label>
                                    <input type="text" className="border rounded px-2 py-1 w-2/3" />
                                </div>
                            ))}
                        </div>

                        {/* Hábitos */}
                        <div className="border border-teal-400 rounded p-4 space-y-4">
                            <h2 className="text-lg font-bold">Hábitos</h2>
                            {["Ejercicio físico", "Alimentación", "Sueño", "Alcohol", "Tabaco", "Otros", "Experiencias Kinesiológicas previas"].map((label) => (
                                <div key={label} className="flex items-center justify-between">
                                    <label>{label}:</label>
                                    <input type="text" className="border rounded px-2 py-1 w-2/3" />
                                </div>
                            ))}
                        </div>

                        {/* Comorbilidades */}
                        <div className="border border-teal-400 rounded p-4 space-y-4">
                            <h2 className="text-lg font-bold">1. Comorbilidades</h2>
                            {["Musculoesqueléticos", "Neurológicos", "Endocrino", "Cardiopulmonar", "Otros"].map((category, index) => (
                                <div key={index}>
                                    <h3 className="font-semibold">{category}</h3>
                                    {[
                                        ["Artrosis", "Cefaleas", "Diabetes", "Arritmias", "Ansiedad"],
                                        ["Artritis Reumatoidea", "Accidente Vascular", "Problemas Renales", "Colesterol Alto", "Depresión"],
                                        ["Fibromialgia", "Hormigueos/adormecimiento", "Problemas de Vejiga", "Marcapasos", "Cáncer"],
                                        ["Osteoporosis", "Adormecimiento", "Problemas de Hígado", "Anemia"],
                                        ["Historia de Caídas", "Parkinson", "Alteración de Tiroides", "Hipertensión"],
                                        ["Dolor Mandibular", "Epilepsia", "Asma"],
                                        ["Hernias o Discopatías", "Esclerosis Múltiple", "VIH"]
                                    ][index].map((condition) => (
                                        <div key={condition} className="flex items-center justify-between">
                                            <label>{condition}</label>
                                            <input type="checkbox" className="w-5 h-5" />
                                        </div>
                                    ))}
                                </div>
                            ))}
                            <div className="flex items-center justify-between">
                                <label>Otro(s):</label>
                                <input type="text" className="border rounded px-2 py-1 w-2/3" />
                            </div>
                            <div className="flex items-center justify-between">
                                <label>Fármaco(s):</label>
                                <input type="text" className="border rounded px-2 py-1 w-2/3" />
                            </div>
                        </div>

                        {/* Kinesióloga Tratante */}
                        <div className="border border-teal-400 rounded p-4 space-y-4">
                            <h2 className="text-lg font-bold">Kinesióloga Tratante</h2>
                            {["Kinesióloga Tratante", "Dg Médico", "Fecha Ingreso"].map((label) => (
                                <div key={label} className="flex items-center justify-between">
                                    <label>{label}:</label>
                                    <input type="text" className="border rounded px-2 py-1 w-2/3" />
                                </div>
                            ))}
                        </div>

                        {/* Motivo de Consulta */}
                        <div className="border border-teal-400 rounded p-4">
                            <h2 className="text-lg font-bold">2. Motivo de Consulta / Anamnesis</h2>
                        </div>

                        {/* Dolor */}
                        <div className="border border-teal-400 rounded p-4 space-y-4">
                            <h2 className="text-lg font-bold">3. Dolor</h2>
                            <p>Marque/pinte las zonas donde se ubica su dolor</p>
                            <p>Cuantifique su dolor (Marque el número que corresponda)</p>
                        </div>

                        {/* Expectativas */}
                        <div className="border border-teal-400 rounded p-4 space-y-4">
                            <h2 className="text-lg font-bold">ALICIA</h2>
                            <p>Expectativas Tratamiento, metas u objetivos.</p>
                            <p>Expectativas y/o objetivos del paciente</p>
                        </div>

                        {/* Encuestas FPS */}
                        <div className="border border-teal-400 rounded p-4">
                            <h2 className="text-lg font-bold">4. Encuestas FPS</h2>
                            <p>PHQ-2, TAMPA (TSK), PCS, FABQ, OREBRO</p>
                        </div>

                        {/* Medidas de Resultado */}
                        <div className="border border-teal-400 rounded p-4">
                            <h2 className="text-lg font-bold">5. Medidas de Resultado</h2>
                            <p>Quick-DASH, OSWESTRY, WOMAC, LEFS</p>
                        </div>

                        {/* PSFS */}
                        <div className="border border-teal-400 rounded p-4 space-y-4">
                            <h2 className="text-lg font-bold">PSFS (Patient Specific Functional Scale)</h2>
                            <p>“Le voy a pedir que identifique 3 actividades importantes que no sea capaz de realizar o en las que tenga dificultades debido a su problema de _______________________”</p>
                            <div className="space-y-2">
                                {[1, 2, 3].map((item) => (
                                    <div key={item} className="flex items-center justify-between">
                                        <label>No Actividad {item}:</label>
                                        <input type="text" className="border rounded px-2 py-1 w-2/3" placeholder="Descripción de actividad" />
                                        <label>Puntuación:</label>
                                        <input type="number" min="0" max="10" className="border rounded px-2 py-1 w-16" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* SANE */}
                        <div className="border border-teal-400 rounded p-4">
                            <h2 className="text-lg font-bold">SANE (Single Assessment Numerical Evaluation)</h2>
                            <p>“En una escala de 0 a 100% (siendo 100% lo normal o lo mejor para ti), ¿cómo puntuarías el estado actual de tu ______________________________?” = ________________</p>
                        </div>

                        {/* Screening */}
                        <div className="border border-teal-400 rounded p-4">
                            <h2 className="text-lg font-bold">6. Screening (Obs, Inspección, Palpación)</h2>
                        </div>

                        {/* Examen de Movimiento */}
                        <div className="border border-teal-400 rounded p-4">
                            <h2 className="text-lg font-bold">7. Examen de Movimiento (AROM/PROM)</h2>
                        </div>

                        {/* Pruebas de Fuerza Muscular */}
                        <div className="border border-teal-400 rounded p-4">
                            <h2 className="text-lg font-bold">8. Pruebas de Fuerza Muscular</h2>
                        </div>

                        {/* Test Ortopédicos */}
                        <div className="border border-teal-400 rounded p-4">
                            <h2 className="text-lg font-bold">9. Test Ortopédicos</h2>
                        </div>

                        {/* Balance/ Equilibrio/ Marcha */}
                        <div className="border border-teal-400 rounded p-4">
                            <h2 className="text-lg font-bold">10. Balance / Equilibrio / Marcha</h2>
                        </div>

                        {/* Pruebas de Rendimiento Funcional */}
                        <div className="border border-teal-400 rounded p-4 space-y-2">
                            <h2 className="text-lg font-bold">11. Pruebas de Rendimiento Funcional</h2>
                            {["Ejercicio", "Tiempo", "Carga Externa", "REP ENA"].map((label) => (
                                <div key={label} className="flex items-center justify-between">
                                    <label>{label}:</label>
                                    <input type="text" className="border rounded px-2 py-1 w-2/3" />
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </main >
    );
}