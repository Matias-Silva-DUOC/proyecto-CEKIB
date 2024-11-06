import React from "react";

export function ContactInfo() {
    return (
        <div className="w-full bg-gray-300 flex justify-center items-center h-24">
            <div className="text-xs text-center">
                <div className="flex justify-center items-center space-x-2">
                    <span className="text-md">📍</span>
                    <span>Profesora Julieta Valenzuela 602, Buin</span>
                    <span>|</span>
                    <span className="text-md">📅</span>
                    <span>Lunes a Viernes de 9:00 a 19:00</span>
                </div>
                <div className="flex justify-center items-center space-x-2 mt-2">
                    <span className="text-md">📞</span>
                    <span>Contacto:</span>
                    <a href="tel:+56945971970" className="text-teal-400 hover:underline">+56 9 4597 1970</a>
                    <span>|</span>
                    <span className="text-md">📧</span>
                    <span>Correo:</span>
                    <a href="mailto:cekib.cl@gmail.com" className="text-teal-400 hover:underline">cekib.cl@gmail.com</a>
                </div>
            </div>
        </div>
    );
};
