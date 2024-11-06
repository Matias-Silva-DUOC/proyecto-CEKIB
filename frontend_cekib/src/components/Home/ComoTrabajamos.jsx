import React from "react";

export function ComoTrabajamos() {
    return (
        <div className="flex items-center justify-center bg-gray-200 m-0">
            <div className="flex flex-col items-center">
                <h1 className="text-2xl font-semibold text-gray-600 mb-8">¿Cómo trabajamos?</h1>
                <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-10 mb-8">
                    <div className="relative flex flex-col items-start">
                        <div className="absolute top-4 left-0 bg-deep-purple-300 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-semibold">1</div>
                        <div className="bg-teal-400 text-white rounded-lg w-64 h-24 mx-8 flex items-center justify-center text-2xl font-semibold">Consulta</div>
                    </div>
                    <div className="relative flex flex-col items-start">
                        <div className="absolute top-4 left-0 bg-deep-purple-300 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-semibold">2</div>
                        <div className="bg-teal-400 text-white rounded-lg w-64 h-24 mx-8 flex items-center justify-center text-2xl font-semibold">Evaluación</div>
                    </div>
                    <div className="relative flex flex-col items-start">
                        <div className="absolute top-4 left-0 bg-deep-purple-300 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-semibold">3</div>
                        <div className="bg-teal-400 text-white rounded-lg w-64 h-24 mx-8 flex items-center justify-center text-2xl font-semibold">Tratamiento</div>
                    </div>
                </div>
            </div>
            <div className="my-2"></div>
        </div>
    );
};