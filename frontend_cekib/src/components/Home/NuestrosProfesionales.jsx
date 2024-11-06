import React from "react";
import { Link } from "react-router-dom";

export function NuestrosProfesionales() {
    return (
        <div className="flex items-center justify-center h-72 bg-gray-200 m-0">
            <div className="bg-gray-300 rounded-lg p-10 w-4/5 flex flex-col items-center justify-center">
                <h1 className="text-2xl text-teal-400 text-center">¡Conoce a Nuestros Profesionales!</h1>
                <div className="my-2"></div>
                <Link to="/nosotros">
                    <button className="bg-deep-purple-300 text-white py-3 px-6 rounded text-lg">
                        ¿Quiénes Somos?
                    </button>
                </Link>
            </div>
        </div>
    );
};