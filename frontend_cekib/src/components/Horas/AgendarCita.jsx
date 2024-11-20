import React, { useState, useEffect } from "react";
import axios from "axios";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { es } from "date-fns/locale";

const horariosDisponibles = ["09:00", "10:00", "11:00", "14:00", "15:00"];

export default function AgendarCita({ rutProfesional }) {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [horaSeleccionada, setHoraSeleccionada] = useState("");
  const [infoProfesional, setInfoProfesional] = useState(null);
  const [diasDisponibles, setDiasDisponibles] = useState([]);

  useEffect(() => {
    const fetchInfoProfesional = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/profesionales/${rutProfesional}`);
        console.log("Datos del profesional obtenidos:", response.data);
        setInfoProfesional(response.data);

        if (response.data.horario) {
          const dias = Object.keys(response.data.horario)
            .map((dia) => {
              const diasSemana = {
                "Lunes": 1,
                "Martes": 2,
                "Miércoles": 3,
                "Jueves": 4,
                "Viernes": 5,
                "Sábado": 6,
                "Domingo": 0,
              };
              return diasSemana[dia] ?? null;
            })
            .filter((dia) => dia !== null);
          setDiasDisponibles(dias);
        } else {
          setDiasDisponibles([]);
        }
      } catch (error) {
        console.error("Error al obtener la información del profesional:", error);
      }
    };

    if (rutProfesional) {
      fetchInfoProfesional();
    }
  }, [rutProfesional]);

  const diasDeshabilitados = [
    { before: new Date() },
    (date) => !diasDisponibles.includes(date.getDay()),
  ];

  return (
    <div className="w-full flex justify-center items-center px-4">
      <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
        {/* Columna 1: Calendario */}
        <div className="flex flex-col items-center">
          <DayPicker
            mode="single"
            selected={fechaSeleccionada}
            onSelect={setFechaSeleccionada}
            disabled={diasDeshabilitados}
            locale={es}
            className="bg-white p-1"
            styles={{
              day: { fontSize: "0.6rem" },
              head: { fontSize: "0.6rem" },
              caption: { fontSize: "0.65rem", marginBottom: 0 },
              navButton: { fontSize: "0.65rem" },
              caption_label: { fontSize: "0.65rem" },
            }}
            modifiersClassNames={{
              selected: "bg-teal-400 text-white font-bold border-teal-800 rounded-lg",
              today: "text-deep-purple-600 font-bold",
              disabled:
                "line-through bg-gray-300 text-gray-500 border-4 border-white rounded-lg",
            }}
          />
        </div>

        {/* Columna 2: Selección de horario */}
        <div className="flex flex-col items-center">
          <h2 className="text-md font-bold mb-2">Selecciona un horario</h2>
          {fechaSeleccionada ? (
            <div>
              <div className="grid grid-cols-3 gap-1">
                {horariosDisponibles.map((horario) => (
                  <button
                    key={horario}
                    onClick={() => setHoraSeleccionada(horario)}
                    className={`px-3 py-1 rounded-md ${
                      horaSeleccionada === horario
                        ? "bg-teal-500 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    {horario}
                  </button>
                ))}
              </div>
              {horaSeleccionada && (
                <p className="mt-2 text-sm">
                  Cita seleccionada: {" "}
                  <strong>{fechaSeleccionada.toLocaleDateString("es-ES")}</strong> a las {" "}
                  <strong>{horaSeleccionada}</strong>
                </p>
              )}
            </div>
          ) : (
            <p className="text-gray-500 text-xs text-center">
              Primero selecciona una fecha.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
