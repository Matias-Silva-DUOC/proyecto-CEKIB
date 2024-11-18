import React from "react";
import { NavbarHoras } from "../../components/Horas/NavBarHoras";
import { Footer } from "../../components/Horas/Footer";

export default function ConstularHora() {

    return (
        <div className="flex flex-col min-h-screen">
            <NavbarHoras />
            <div className="flex-grow flex justify-center items-start lg:justify-center bg-gray-50">
                <div className="w-1/2 h-96 lg:m-0 m-4 bg-white rounded flex flex-col">
                    <h2 className="text-2xl text-teal-400 font-bold mt-4">Consulta de hora</h2>
                </div>
            </div>
            <Footer />
        </div>
    );
}