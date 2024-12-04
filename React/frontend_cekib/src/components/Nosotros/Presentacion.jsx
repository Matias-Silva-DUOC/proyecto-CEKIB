import React from "react";

export function Presentacion() {
    return (
        <div className="text-center my-8 mx-4 sm:mx-8 md:mx-16 lg:mx-64"> {/* Ajustes de margen responsivo */}
            <h1 className="text-2xl text-teal-400 font-semibold">¿Quiénes somos?</h1>
            <div className="my-3"></div>
            <p className="mb-3 text-sm text-gray-600">
                El Centro Kinésico Integral (Cekib), fundado en noviembre de 2019 por las profesionales Tiare y Jessamine Castro, ha evolucionado de un simple centro kinésico a un destacado espacio interdisciplinario. Contamos con un equipo de kinesiólogos especializados en diversas áreas, como kinesiología músculo-esqueletica y respiratoria, complementado por una nutricionista clínica y una terapeuta ocupacional.
            </p>
            <p className="mb-3 text-sm text-gray-600">
                Atendemos a pacientes de todas las edades, brindando un enfoque personalizado que promueve la salud y el bienestar integral.
            </p>
            <p className="mb-3 text-md text-deep-purple-300 font-semibold">
                ¡Tu bienestar es nuestra prioridad!
            </p>
        </div>
    );
};
