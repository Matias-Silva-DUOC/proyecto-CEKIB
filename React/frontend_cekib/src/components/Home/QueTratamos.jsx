import React from "react";
import Img0 from "../../assets/img/img0.jpg";

export function QueTratamos() {
    return (
        <div className="relative ">
            <div className="h-96 text-center">
            <img
                src={Img0}
                alt="Person receiving therapy with a massage gun"
                className="w-full h-96 object-cover md:block hidden"
            />
                <div className="absolute top-1/2 left-0 sm:left-16 transform -translate-y-1/2 bg-white p-6 rounded-lg mx-auto">
                    <h2 className="text-2xl text-teal-400 mb-4 text-center md:text-left">
                        ¿Qué Tratamos?
                    </h2>
                    <p className="mb-4 text-lg text-gray-600 text-center md:text-left">
                        Algunos de los principales servicios que ofrecemos son:
                    </p>
                    <ul className="list-disc list-inside text-lg text-gray-600 text-center md:text-left">
                        <li>Kinesiología músculo-esquelética</li>
                        <li>Kinesiología respiratoria</li>
                        <li>Kinesiología neurológica</li>
                        <li>Kinesiología deportiva</li>
                        <li>Nutrición clínica</li>
                        <li>Terapia ocupacional</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};