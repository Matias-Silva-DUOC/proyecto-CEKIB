import React from "react";
import Servicios0 from '../../assets/img/Servicios/servicios0.jpg';

export function VisionCekib() {
    return (
        <div className="flex flex-wrap items-center justify-center p-4 h-96">
            <div className="flex flex-col w-full md:w-1/2 h-full items-center justify-center p-4 text-center">
                <div className="my-2">
                    <h1 className="text-2xl text-teal-400">¡Mirada CEKIB!</h1>
                </div>
                <div className="my-2">
                    <p className="mb-4 text-lg text-gray-600">
                        Nuestro equipo en CEKIB está compuesto por profesionales comprometidos en brindar soluciones efectivas
                        y personalizadas a cada paciente. Especialistas en kinesiología músculo-esquelética, respiratoria y neurológica,
                        junto a nutricionistas y terapeutas ocupacionales, colaboran para abordar de manera integral las necesidades
                        de nuestros pacientes. Nos enfocamos no solo en tratar síntomas, sino en acompañar a la persona en su proceso
                        de recuperación con un enfoque humano y cercano.
                    </p>
                </div>
            </div>
            <div className="w-full md:w-1/2 h-full hidden md:flex items-center justify-center p-4">
                <img src={Servicios0} className="h-64 w-full object-cover rounded-lg" alt="Servicios ofrecidos" />
            </div>
        </div>

    );
};