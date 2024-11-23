import React, { useState, useEffect } from "react";
import axios from "axios";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { es } from "date-fns/locale";
import { Button } from "@material-tailwind/react";

export default function AgendarCita({ rutProfesional }) {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [horaSeleccionada, setHoraSeleccionada] = useState("");
  const [infoProfesional, setInfoProfesional] = useState(null);
  const [diasDisponibles, setDiasDisponibles] = useState([]);
  const [horariosDisponibles, setHorariosDisponibles] = useState([]);

  useEffect(() => {
    const fetchInfoProfesional = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/profesionales/${rutProfesional}`
        );
        setInfoProfesional(response.data);

        if (response.data.horario) {
          // Definir el mapeo de días de la semana dentro del ámbito correcto
          const diasSemana = {
            Lunes: 1,
            Martes: 2,
            Miércoles: 3,
            Jueves: 4,
            Viernes: 5,
            Sábado: 6,
            Domingo: 0,
          };

          // Procesar días disponibles
          const dias = Object.keys(response.data.horario)
            .map((dia) => diasSemana[dia] ?? null)
            .filter((dia) => dia !== null);
          setDiasDisponibles(dias);

          // Generar horarios dinámicos para el día seleccionado
          if (fechaSeleccionada) {
            const diaSemana = fechaSeleccionada.getDay();
            const diaNombre = Object.keys(response.data.horario).find(
              (dia) => diasSemana[dia] === diaSemana
            );
            if (diaNombre) {
              const { inicio, fin } = response.data.horario[diaNombre];
              setHorariosDisponibles(generarHorarios(inicio, fin));
            } else {
              setHorariosDisponibles([]);
            }
          }
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
  }, [rutProfesional, fechaSeleccionada]);

  const generarHorarios = (inicio, fin) => {
    const horarios = [];
    let horaActual = parseInt(inicio.split(":")[0], 10);
    const horaFin = parseInt(fin.split(":")[0], 10);

    while (horaActual < horaFin) {
      horarios.push(`${horaActual.toString().padStart(2, "0")}:00`);
      horaActual++;
    }

    return horarios;
  };

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
        <div className="flex flex-col items-center ml-64">
          <h2 className="text-lg text-teal-400 mb-4 font-semibold">Selecciona un horario</h2>
          {fechaSeleccionada ? (
            <div>
              <div className="grid grid-cols-2 gap-2 bg-gray-200 border border-teal-400 w-80 px-4 rounded-md p-2">
                {horariosDisponibles.length > 0 ? (
                  horariosDisponibles.map((horario) => (
                    <button
                      key={horario}
                      onClick={() => setHoraSeleccionada(horario)}
                      className={`px-3 py-1 rounded-md ${horaSeleccionada === horario
                        ? "bg-teal-500 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                        }`}
                    >
                      {horario}
                    </button>
                  ))
                ) : (
                  <p className="col-span-2 text-center text-gray-500 text-sm">
                    Sin horarios disponibles
                  </p>
                )}
              </div>

              {horaSeleccionada && (
                <p className="my-2 text-sm">
                  Cita seleccionada:{" "}
                  <strong className="text-deep-purple-300">{fechaSeleccionada.toLocaleDateString("es-ES")}</strong> a las{" "}
                  <strong className="text-deep-purple-300">{horaSeleccionada}</strong>
                </p>
              )}

              <div className="flex justify-end m-2">
                <Button
                  color="teal"
                  className="bg-white text-teal-400 border border-rounded border-teal-400 mb-2"
                >
                  CONFIRMAR
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-sm text-center">
              Primero selecciona una fecha.
            </p>
          )}
        </div>

      </div>
    </div>
  );
}
