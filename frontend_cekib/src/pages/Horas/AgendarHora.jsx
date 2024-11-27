import React, { useState, useEffect } from "react";
import axios from 'axios';
import { NavbarHoras } from "../../components/Horas/NavBarHoras";
import { Footer } from "../../components/Horas/Footer";
import { Button, Input } from "@material-tailwind/react";
import { FaUserDoctor } from "react-icons/fa6";
import { IoBody } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import Jessamine from "../../assets/img/Profesionales/prof2.jpg"
import Tiare from "../../assets/img/Profesionales/prof1.jpg"
import Nicolas from "../../assets/img/Profesionales/prof7.jpg"
import Johana from "../../assets/img/Profesionales/prof8.jpg"
import Daniela from "../../assets/img/Profesionales/prof3.jpg"
import Dagmar from "../../assets/img/Profesionales/prof4.jpg"
import Almendra from "../../assets/img/Profesionales/prof5.jpg"
import AgendarCita from "../../components/Horas/AgendarCita";

const profesionalMap = {
    '18087793-2': { image: Jessamine },
    '18325499-5': { image: Tiare },
    '20631644-6': { image: Nicolas },
    '16562439-4': { image: Johana },
    '18294319-3': { image: Daniela },
    '19385455-9': { image: Dagmar },
    '20420510-8': { image: Almendra },
};

export default function AgendarHora() {
    const [activeStep, setActiveStep] = useState(1);
    const [rut, setRut] = useState("");
    const [rutValido, setRutValido] = useState(null); // null: no validado, true: válido, false: inválido
    const [rutPac, setRutPac] = useState(""); // Para almacenar el RUT del paciente
    const [tipoTratamiento, setTipoTratamiento] = useState(""); // Para almacenar el Tipo de Tratamiento
    const [profesionales, setProfesionales] = useState([]);
    const [rutProSeleccionado, setRutProSeleccionado] = useState(null);
    const [profesionalSeleccionado, setProfesionalSeleccionado] = useState(null);
    const [citaAgendada, setCitaAgendada] = useState(null);
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        telefono: "",
        correo: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        if (!formData.nombre || !formData.apellido || !formData.telefono || !formData.correo) {
            alert("Por favor completa todos los campos.");
            return;
        }
    
        // Validar que citaAgendada tenga el formato correcto
        if (!citaAgendada?.citaAgendadaISO) {
            alert("Por favor selecciona una fecha y hora válidas.");
            return;
        }
    
        const payload = {
            rutPaciente: rutPac,
            tipoTratamiento,
            rutProfesional: rutProSeleccionado,
            citaAgendada: citaAgendada.citaAgendadaISO, // Enviar el formato correcto
            nombrePaciente: formData.nombre,
            apellidoPaciente: formData.apellido,
            telefonoPaciente: formData.telefono,
            correoPaciente: formData.correo,
        };
    
        try {
            const response = await axios.post('http://localhost:8080/citas', payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.status === 201) {
                alert("¡Reserva confirmada con éxito!");
                setActiveStep(1); // Reiniciar el flujo de pasos si es necesario
            } else {
                alert("Hubo un problema al confirmar la reserva. Por favor, inténtalo de nuevo.");
            }
        } catch (error) {
            console.error("Error al guardar la reserva:", error);
            alert("Ocurrió un error al intentar guardar la reserva. Revisa la consola para más detalles.");
        }
    };
    

    useEffect(() => {
        const fetchProfesionales = async () => {
            try {
                const response = await axios.get('http://localhost:8080/profesionales');
                setProfesionales(response.data);
            } catch (error) {
                console.error('Error al obtener los profesionales:', error);
            }
        };

        fetchProfesionales();
    }, []);

    useEffect(() => {
        if (rutProSeleccionado) {
            const fetchProfesionalInfo = async () => {
                try {
                    // Llamada a la API
                    const response = await axios.get(`http://localhost:8080/profesionales`);

                    // Filtrar el profesional por rutPro
                    const profesional = response.data.find(
                        (prof) => prof.rutPro === rutProSeleccionado
                    );

                    if (profesional) {
                        // Guardar el profesional seleccionado en el estado
                        setProfesionalSeleccionado(profesional);
                    } else {
                        console.error("No se encontró un profesional con el RUT proporcionado.");
                    }
                } catch (error) {
                    console.error("Error al obtener los datos del profesional:", error);
                }
            };

            fetchProfesionalInfo();
        }
    }, [rutProSeleccionado]);



    const paginationItems = [1, 2, 3, 4, 5];

    // Función para calcular el dígito verificador
    const calcularDV = (rutSinDV) => {
        let suma = 0;
        let multiplicador = 2;

        for (let i = rutSinDV.length - 1; i >= 0; i--) {
            suma += parseInt(rutSinDV[i], 10) * multiplicador;
            multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
        }

        const resto = suma % 11;
        const dvCalculado = 11 - resto;

        if (dvCalculado === 11) return "0";
        if (dvCalculado === 10) return "K";
        return dvCalculado.toString();
    };

    // Validar el RUT ingresado
    const validarRut = (valor) => {
        const rutRegex = /^[0-9]+-[0-9Kk]$/; // Formato válido: números, guión, DV
        if (!rutRegex.test(valor)) {
            setRutValido(false);
            return;
        }

        const [cuerpo, dvIngresado] = valor.split("-");
        const dvCalculado = calcularDV(cuerpo);

        if (dvIngresado.toUpperCase() === dvCalculado) {
            setRutValido(true);
        } else {
            setRutValido(false);
        }
    };

    const handleRutChange = (e) => {
        const valor = e.target.value;
        setRut(valor);
        if (valor.includes("-")) {
            validarRut(valor);
        } else {
            setRutValido(null); // No evaluar hasta que haya un "-"
        }
    };

    // Teclas permitidas
    const handleRutKeyDown = (e) => {
        const allowedKeys = ["Backspace", "ArrowLeft", "ArrowRight", "Tab"]; // Teclas permitidas
        const allowedChars = /^[0-9Kk-]$/; // Números, k/K, guion

        if (
            !allowedKeys.includes(e.key) && // Permitir teclas especiales
            !allowedChars.test(e.key) // Restringir a caracteres permitidos
        ) {
            e.preventDefault();
        }
    };

    // Seleccionar tipo de tratamiento
    const seleccionarTratamiento = (tratamiento) => {
        setTipoTratamiento(tratamiento); // Guardar tratamiento
        console.log(`Tipo de servicio seleccionado: ${tratamiento}`); // Mostrar en consola
        setActiveStep(activeStep + 1); // Avanzar al siguiente paso
    };

    // Seleccionar profesional
    const seleccionarProfesional = async (rutPro) => {
        try {
            // Opcional: Si necesitas consultar al servidor con el rutPro
            const response = await axios.get(`http://localhost:8080/profesionales`, {
                params: { rutPro },
            });

            // Guardar el rut seleccionado en el estado
            setRutProSeleccionado(rutPro);

            // Mostrar en consola el rut seleccionado
            console.log(`Rut del profesional seleccionado: ${rutPro}`);

            // Pasar al siguiente case
            setActiveStep(activeStep + 1); // Avanzar al siguiente paso
        } catch (error) {
            console.error('Error buscando profesional:', error);
        }
    };

    const handleCitaAgendada = (cita) => {
        setCitaAgendada(cita); // Actualiza la cita en el padre
        console.log("Cita agendada:", cita);
    };

    // Avanzar
    const handleNext = () => {
        if (rutValido) {
            setRutPac(rut); // Guardar el RUT válido
            console.log(`Rut ingresado por el cliente: ${rut}`); // Mostrar en consola
            if (activeStep < paginationItems.length) setActiveStep(activeStep + 1);
        }
    };

    // Retroceder
    const handlePrev = () => {
        if (activeStep > 1) setActiveStep(activeStep - 1);
    };

    // Paso a paso
    const renderStepContent = () => {
        switch (activeStep) {
            case 1:
                return (
                    <div className="w-1/2 text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <h3 className="text-teal-400 text-xl font-bold">¿PARA QUIÉN ES LA HORA?</h3>
                        <p className="text-gray-600 mb-6">
                            Complete los datos del <strong>Paciente</strong> que será <u>atendido:</u>
                        </p>
                        <div className="w-full mx-auto mb-2 px-8">
                            <Input
                                color={rutValido === null ? "teal" : rutValido ? "green" : "red"}
                                label="RUT del Paciente"
                                value={rut}
                                onChange={handleRutChange}
                                onKeyDown={handleRutKeyDown} // Filtrar caracteres
                            />
                        </div>
                        <p className="text-gray-600 text-sm text-left px-8">Ingrese <strong>RUT</strong> del paciente, sin puntos y con guíon.</p>
                        <hr className="my-4" />
                        <div className="text-right">
                            <Button
                                color="teal"
                                className="bg-teal-400 text-white rounded"
                                onClick={handleNext}
                                disabled={!rutValido} // Solo permite avanzar si el RUT es válido
                            >
                                CONTINUAR
                            </Button>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="w-1/2 text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <h3 className="text-teal-400 text-xl font-bold">¿QUÉ SERVICIO NECESITA AGENDAR?</h3>
                        <p className="text-gray-600 mb-6">Elige el servicio que necesita agendar</p>
                        <div className="flex justify-center gap-4">
                            <Button
                                color="purple"
                                className="bg-deep-purple-300 text-white rounded flex flex-col items-center"
                                onClick={() => seleccionarTratamiento("Consulta")}
                            >
                                <FaUserDoctor className="h-12 w-12 mb-2" />
                                <span>Consultas</span>
                            </Button>
                            <Button
                                color="purple"
                                className="bg-deep-purple-300 text-white rounded flex flex-col items-center"
                                onClick={() => seleccionarTratamiento("Tratamiento")}
                            >
                                <IoBody className="h-12 w-12 mb-2" />
                                <span>Tratamientos</span>
                            </Button>
                        </div>
                        <div className="flex justify-between mt-6">
                            <Button
                                color="teal"
                                className="bg-white text-teal-400 border border-rounded border-teal-400"
                                onClick={handlePrev}
                            >
                                VOLVER ATRÁS
                            </Button>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div>
                        <div className="border rounded-lg border-teal-500 mb-8 bg-white">
                            <div className="overflow-x-auto rounded-lg">
                                {profesionales.length > 0 ? (
                                    <table className="min-w-full divide-y divide-gray-300">
                                        <thead className="bg-teal-500">
                                            <tr>
                                                {['Nombre', 'Especialidad', 'Seleccionar'].map((header) => (
                                                    <th
                                                        key={header}
                                                        scope="col"
                                                        className="px-4 py-2 text-center font-bold text-white text-sm uppercase tracking-wider"
                                                    >
                                                        {header}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {profesionales.map((prof, index) => (
                                                <tr
                                                    key={prof.rutPro}
                                                    className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                                                        } hover:bg-teal-100`}
                                                >
                                                    <td className="px-4 py-1 text-sm text-gray-700 text-center">
                                                        {`${prof.nombrePro} ${prof.apellidoPro}`}
                                                    </td>
                                                    <td className="px-4 py-1 text-sm text-gray-700 text-center">
                                                        {prof.especialidadPro}
                                                    </td>
                                                    <td className="px-4 py-1 text-center">
                                                        <button
                                                            className="bg-teal-500 text-white text-sm px-3 py-1 rounded-lg hover:bg-teal-600 transition"
                                                            onClick={() => seleccionarProfesional(prof.rutPro)}
                                                        >
                                                            <FaSearch />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p className="text-gray-600 mt-4 text-center">No se encontraron profesionales.</p>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <Button
                                color="teal"
                                className="bg-white text-teal-400 border border-rounded border-teal-400"
                                onClick={handlePrev}
                            >
                                VOLVER ATRÁS
                            </Button>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div>
                        <div className="flex w-full h-full border border-teal-500 rounded p-4">
                            {/* Columna 1 */}
                            <div className="flex flex-col items-center w-56 border-r border-gray-300 pr-4">
                                <h2 className="text-sm text-teal-400 mb-4">Profesional seleccionado</h2>
                                {/* Mostrar la imagen del profesional seleccionada si coincide con el rut */}
                                {rutProSeleccionado && profesionalMap[rutProSeleccionado]?.image ? (
                                    <img
                                        src={profesionalMap[rutProSeleccionado].image}
                                        alt={`Foto de ${profesionalSeleccionado?.nombrePro || "profesional"}`}
                                        className="w-32 h-32 rounded-full border border-gray-300"
                                    />
                                ) : (
                                    <p className="text-gray-500">No se encontró la imagen del profesional.</p>
                                )}
                                {/* Mostrar el nombre, apellido y especialidad del profesional */}
                                <p className="text-base font-semibold text-gray-700 mt-4">
                                    {profesionalSeleccionado
                                        ? `${profesionalSeleccionado.nombrePro} ${profesionalSeleccionado.apellidoPro}`
                                        : "Cargando nombre..."}
                                </p>
                                <p className="text-sm text-deep-purple-300">
                                    {profesionalSeleccionado?.especialidadPro || "Cargando especialidad..."}
                                </p>
                            </div>

                            {/* Columna 2 */}
                            <div>
                                <AgendarCita
                                    rutProfesional={rutProSeleccionado}
                                    setActiveStep={setActiveStep}
                                    setCitaAgendada={handleCitaAgendada}
                                />
                            </div>
                        </div>

                        {/* Botón de volver atrás */}
                        <div className="flex justify-between mt-2">
                            <Button
                                color="teal"
                                className="bg-white text-teal-400 border border-rounded border-teal-400 mb-2"
                                onClick={handlePrev}
                            >
                                VOLVER ATRÁS
                            </Button>
                        </div>
                    </div>
                );
            case 5:
                return (
                    <div>
                        <div className="w-1/2 text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <h3 className="text-teal-400 text-xl font-bold mb-4">
                                ¡Ya casi terminas! Completa tus datos y finaliza la reserva:
                            </h3>
                            <div className="grid grid-cols-1 gap-4">
                                <div className="w-full">
                                    <Input
                                        label="Nombre del Paciente"
                                        color="teal"
                                        name="nombre"
                                        value={formData.nombre}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="w-full">
                                    <Input
                                        label="Apellido del Paciente"
                                        color="teal"
                                        name="apellido"
                                        value={formData.apellido}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="w-full">
                                    <Input
                                        label="Teléfono del Paciente"
                                        type="tel"
                                        color="teal"
                                        name="telefono"
                                        value={formData.telefono}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="w-full">
                                    <Input
                                        label="Correo del Paciente"
                                        type="email"
                                        color="teal"
                                        name="correo"
                                        value={formData.correo}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-between mt-6">
                                <Button
                                    color="teal"
                                    className="bg-white text-teal-400 border border-rounded border-teal-400"
                                    onClick={handlePrev}
                                >
                                    VOLVER A ELEGIR FECHA Y DÍA
                                </Button>
                                <Button
                                    color="teal"
                                    className="bg-teal-400 text-white rounded"
                                    onClick={handleSubmit}
                                >
                                    CONFIRMAR RESERVA
                                </Button>
                            </div>
                        </div>
                    </div>
                )
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <NavbarHoras />
            <div className="flex-grow flex justify-center items-start lg:justify-center bg-gray-50">
                <div className="w-3/4 h-auto lg:m-0 m-4 bg-white rounded flex flex-col">
                    <h2 className="text-2xl text-teal-400 font-bold">Reserva de hora</h2>
                    <div className="text-gray-700">
                        {activeStep === 1 && <p>Paso 1: Identificar paciente</p>}
                        {activeStep === 2 && <p>Paso 2: Seleccionar servicio</p>}
                        {activeStep === 3 && <p>Paso 3: Seleccionar profesional</p>}
                        {activeStep === 4 && <p>Paso 4: Seleccionar día y hora</p>}
                        {activeStep === 5 && <p>Paso 5: Confirmar y reservar</p>}
                    </div>
                    <div className="flex justify-center items-center relative mb-1 lg:block hidden">
                        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-teal-400 transform -translate-y-1/2"></div>
                        <div className="flex items-center justify-center w-full">
                            {paginationItems.map((item) => (
                                <div
                                    key={item}
                                    className={`flex items-center justify-center ${activeStep === item
                                        ? "w-10 h-10 bg-teal-400 text-white"
                                        : "w-6 h-6 bg-gray-500 text-white"
                                        } mx-8 rounded-full z-10`}
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                    {renderStepContent()}
                </div>
            </div>
            <Footer />
        </div>
    );
};