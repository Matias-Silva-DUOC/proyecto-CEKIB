import React, { useState } from "react";
import { NavbarHoras } from "../../components/Horas/NavBarHoras";
import { Footer } from "../../components/Horas/Footer";
import { Button, IconButton, Input } from "@material-tailwind/react";
import { FaUserDoctor } from "react-icons/fa6";
import { IoBody } from "react-icons/io5";

export default function AgendarHora() {
    const [activeStep, setActiveStep] = useState(1);
    const paginationItems = [1, 2, 3, 4, 5];

    const handleNext = () => {
        if (activeStep < paginationItems.length) setActiveStep(activeStep + 1);
    };

    const handlePrev = () => {
        if (activeStep > 1) setActiveStep(activeStep - 1);
    };

    const renderStepContent = () => {
        switch (activeStep) {
            case 1:
                return (
                    <div className="text-center">
                        <h3 className="text-teal-400 text-xl font-bold">¿PARA QUIÉN ES LA HORA?</h3>
                        <p className="text-gray-600 mb-6">
                            Complete los datos del <strong>Paciente</strong> que será <u>atendido:</u>
                        </p>
                        <div className="w-full mx-auto mb-2 px-8">
                            <Input color="teal" label="RUT del Paciente" />
                        </div>
                        <p className="text-gray-600 text-sm text-left px-8">Ingrese <strong>RUT</strong> del paciente</p>
                        <hr className="my-4" />
                        <div className="text-right">
                            <Button
                                color="teal"
                                className="bg-teal-400 text-white rounded"
                                onClick={handleNext}
                            >
                                CONTINUAR
                            </Button>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="text-center">
                        <h3 className="text-teal-400 text-xl font-bold">¿QUÉ SERVICIO NECESITA AGENDAR?</h3>
                        <p className="text-gray-600 mb-6">Elige el servicio que necesitar agendar</p>
                        <div className="flex justify-center gap-4">
                            <Button
                                color="purple"
                                className="bg-deep-purple-300 text-white rounded flex flex-col items-center"
                            >
                                <FaUserDoctor className="h-12 w-12 mb-2" />
                                <span>Consultas</span>
                            </Button>
                            <Button
                                color="purple"
                                className="bg-deep-purple-300 text-white rounded flex flex-col items-center"
                            >
                                <IoBody className="h-12 w-12 mb-2" />
                                <span>Kinesiología</span>
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
                    <div className="text-center">
                        <h3 className="text-teal-400 text-xl font-bold mb-6">BUSQUEDA DE PROFESIONALES</h3>
                        <div className="w-full mx-auto mb-2 px-8 flex gap-2">
                            <Input color="teal" label="Buscar por profesional" placeholder="Profesional..." />
                            <Input color="teal" label="Buscar por especialidad" placeholder="Especialidad..." />
                        </div>
                        <div className="flex justify-between mt-16">
                            <Button
                                color="teal"
                                className="bg-white text-teal-400 border border-rounded border-teal-400"
                                onClick={handlePrev}
                            >
                                VOLVER ATRÁS
                            </Button>
                            <Button
                                color="teal"
                                className="bg-teal-400 text-white rounded"
                                onClick={handleNext}
                            >
                                BUSCAR HORAS
                            </Button>
                        </div>
                    </div>
                );
            default:
                return <div>Contenido para el paso {activeStep}</div>;
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <NavbarHoras />
            <div className="flex-grow flex justify-center items-start lg:justify-center bg-gray-50">
                <div className="w-1/2 h-96 lg:m-0 m-4 bg-white rounded flex flex-col">
                    <h2 className="text-2xl text-teal-400 font-bold mt-4">Reserva de hora</h2>
                    <div className="text-gray-700 mb-4">
                        {activeStep === 1 && <p>Paso 1: Identificar paciente</p>}
                        {activeStep === 2 && <p>Paso 2: Seleccionar servicio</p>}
                        {activeStep === 3 && <p>Paso 3: Seleccionar profesional</p>}
                        {activeStep === 4 && <p>Paso 4: Seleccionar día y hora</p>}
                        {activeStep === 5 && <p>Paso 5: Confirmar y reservar</p>}
                    </div>
                    <div className="flex justify-center items-center relative mb-8 lg:block hidden">
                        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-teal-400 transform -translate-y-1/2"></div>
                        <div className="flex items-center justify-center w-full">
                            {paginationItems.map((item) => (
                                <IconButton
                                    key={item}
                                    className={`${activeStep === item
                                        ? "w-10 h-10 bg-teal-400 text-white mx-2"
                                        : "w-6 h-6 bg-gray-500 text-white mx-2"
                                        } rounded-full z-10`}
                                    onClick={() => setActiveStep(item)}
                                >
                                    {item}
                                </IconButton>
                            ))}
                        </div>
                    </div>
                    {renderStepContent()}
                </div>
            </div>
            <Footer />
        </div>
    );
}

