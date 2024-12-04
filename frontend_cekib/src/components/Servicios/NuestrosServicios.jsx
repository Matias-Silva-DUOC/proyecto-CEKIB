import React from "react";
import Servicio1 from '../../assets/img/Servicios/musculoesq.png';
import Servicio2 from '../../assets/img/Servicios/respiratoria.png';
import Servicio3 from '../../assets/img/Servicios/neurologica.png';
import Servicio4 from '../../assets/img/Servicios/deportiva.png';
import Servicio5 from '../../assets/img/Servicios/nutricion.png';
import Servicio6 from '../../assets/img/Servicios/terapia.png';

export function NuestrosServicios() {
    return (
        <div className="flex flex-col items-center p-12 bg-white">
            <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-20">
                {/* Servicio 1 */}
                <div className="flex flex-col items-center space-y-4">
                    <img src={Servicio1} alt="Icon Kinesiología músculo-esquelética" className="w-24 h-24 mx-auto" />
                    <h2 className="text-lg font-bold text-teal-400 text-center">Kinesiología<br />músculo-esquelética</h2>
                </div>
                {/* Servicio 2 */}
                <div className="flex flex-col items-center space-y-4">
                    <img src={Servicio2} alt="Icon Kinesiología respiratoria" className="w-24 h-24 mx-auto" />
                    <h2 className="text-lg font-bold text-teal-400 text-center">Kinesiología<br />respiratoria</h2>
                </div>
                {/* Servicio 3 */}
                <div className="flex flex-col items-center space-y-4">
                    <img src={Servicio3} alt="Icon Kinesiología neurológica" className="w-24 h-24 mx-auto" />
                    <h2 className="text-lg font-bold text-teal-400 text-center">Kinesiología<br />neurológica</h2>
                </div>
                {/* Servicio 4 */}
                <div className="flex flex-col items-center space-y-4">
                    <img src={Servicio4} alt="Icon Kinesiología deportiva" className="w-24 h-24 mx-auto" />
                    <h2 className="text-lg font-bold text-teal-400 text-center">Kinesiología<br />deportiva</h2>
                </div>
                {/* Servicio 5 */}
                <div className="flex flex-col items-center space-y-4">
                    <img src={Servicio5} alt="Icon Nutrición clínica" className="w-24 h-24 mx-auto" />
                    <h2 className="text-lg font-bold text-teal-400 text-center">Nutrición<br />clínica</h2>
                </div>
                {/* Servicio 6 */}
                <div className="flex flex-col items-center space-y-4">
                    <img src={Servicio6} alt="Icon Terapia ocupacional" className="w-24 h-24 mx-auto" />
                    <h2 className="text-lg font-bold text-teal-400 text-center">Terapia<br />ocupacional</h2>
                </div>
            </div>
        </div>
    );
};