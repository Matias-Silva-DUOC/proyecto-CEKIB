import React, { useState } from "react";
import { NavbarHoras } from "../../components/Horas/NavBarHoras";
import { Footer } from "../../components/Horas/Footer";
import { Input, Button } from "@material-tailwind/react";
import axios from "axios";

export default function ConsultarHora() {
    const [rut, setRut] = useState("");
    const [rutValido, setRutValido] = useState(null);
    const [citas, setCitas] = useState([]); // Estado para las citas obtenidas
    const [nombrePaciente, setNombrePaciente] = useState(""); // Estado para el nombre del paciente
    const [apellidoPaciente, setApellidoPaciente] = useState(""); // Estado para el apellido del paciente
    const [error, setError] = useState(""); // Estado para manejar errores
    const [consultaRealizada, setConsultaRealizada] = useState(false); // Indica si se presionó CONSULTAR

    const validarRut = (rut) => {
        const rutLimpio = rut.replace(/[^0-9kK]/g, "").toUpperCase();
        if (rutLimpio.length < 8) return false;
        const cuerpo = rutLimpio.slice(0, -1);
        const digitoVerificador = rutLimpio.slice(-1);
        if (!/^\d+$/.test(cuerpo)) return false;

        let suma = 0;
        let multiplicador = 2;
        for (let i = cuerpo.length - 1; i >= 0; i--) {
            suma += parseInt(cuerpo[i], 10) * multiplicador;
            multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
        }

        const resto = suma % 11;
        const dvEsperado = resto === 0 ? "0" : resto === 1 ? "K" : (11 - resto).toString();

        return digitoVerificador === dvEsperado;
    };

    const handleRutChange = (event) => {
        const nuevoRut = event.target.value;
        setRut(nuevoRut);
        if (nuevoRut.trim() === "") {
            setRutValido(null);
        } else {
            setRutValido(validarRut(nuevoRut));
        }
    };

    const handleRutKeyDown = (event) => {
        const char = event.key;
        if (!/[\dKk\-BackspaceTabArrowLeftArrowRight]/.test(char)) {
            event.preventDefault();
        }
    };

    const handleNext = async () => {
        if (rutValido) {
            try {
                setConsultaRealizada(true); // Marcar que se realizó la consulta
                setError(""); // Resetear errores anteriores

                // Llamada a la API para obtener citas
                const response = await axios.get(`http://localhost:8080/citas/${rut}`);
                const citasData = response.data;

                if (citasData.length > 0) {
                    setNombrePaciente(citasData[0].nombrePaciente); // Asigna el nombre del paciente
                    setApellidoPaciente(citasData[0].apellidoPaciente); // Asigna el apellido del paciente
                    setCitas(citasData); // Asigna las citas al estado
                } else {
                    setCitas([]);
                    setError("No tienes horas reservadas con nosotros");
                }
            } catch (err) {
                setCitas([]);
                setError("Error al consultar las citas. Verifica el RUT ingresado.");
                console.error(err);
            }
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <NavbarHoras />
            <div className="flex-grow flex flex-col justify-center items-center bg-gray-50 px-4">
                <div className="w-full max-w-md text-center">
                    <h3 className="text-teal-400 text-2xl font-bold">Consulta de hora</h3>
                    <p className="text-gray-600 mb-6">
                        Ingrese datos del <strong>Paciente</strong> que desea <u>consultar:</u>
                    </p>
                    <div className="w-full mx-auto mb-2 px-4">
                        <Input
                            color={rutValido === null ? "deep-purple" : rutValido ? "green" : "red"}
                            label="RUT del Paciente"
                            value={rut}
                            onChange={handleRutChange}
                            onKeyDown={handleRutKeyDown}
                        />
                    </div>
                    <p className="text-gray-600 text-sm text-left px-4">
                        Ingrese <strong>RUT</strong> del paciente, sin puntos y con guion.
                    </p>
                    <hr className="my-4" />
                    <div className="text-right px-4">
                        <Button
                            color="teal"
                            className="bg-teal-400 text-white rounded"
                            onClick={handleNext}
                            disabled={!rutValido}
                        >
                            CONSULTAR
                        </Button>
                    </div>
                </div>

                {/* Mostrar citas solo si se realizó la consulta */}
                {consultaRealizada && (
                    <div className="w-full max-w-lg mt-8">
                        {error && <p className="text-red-500 text-center">{error}</p>}
                        {citas.length > 0 && (
                            <div>
                                <h4 className="text-teal-400 text-xl font-bold mb-4">
                                    Tus próximas horas {nombrePaciente} {apellidoPaciente}:
                                </h4>
                                <table className="w-full rounded-xl text-center overflow-hidden">
                                    <thead className="bg-deep-purple-100">
                                        <tr>
                                            <th className="px-4 py-2 align-middle border-b border-deep-purple-500">Hora Cita</th>
                                            <th className="px-4 py-2 align-middle border-b border-deep-purple-500">Fecha Cita</th>
                                            <th className="px-4 py-2 align-middle border-b border-deep-purple-500">Nombre Profesional</th>
                                            <th className="px-4 py-2 align-middle border-b border-deep-purple-500">Estado Cita</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {citas.map((cita) => (
                                            <tr key={cita.id}>
                                                <td className="border border-gray-300 px-4 py-2 align-middle">
                                                    {new Date(cita.fechaCita).toLocaleTimeString("es-ES", {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                    })}
                                                </td>
                                                <td className="border border-gray-300 px-4 py-2 align-middle">
                                                    {new Date(cita.fechaCita).toLocaleDateString("es-ES")}
                                                </td>
                                                <td className="border border-gray-300 px-4 py-2 align-middle">
                                                    {cita.nombreProfesional}
                                                </td>
                                                <td className="border border-gray-300 px-4 py-2 align-middle">
                                                    {cita.estadoCita}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}
