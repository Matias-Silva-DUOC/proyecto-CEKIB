import React, { useState, useEffect } from "react";
import axios from "axios";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { es } from "date-fns/locale";
import { Button } from "@material-tailwind/react";

export default function AgendarCita({ rutProfesional, setActiveStep, setCitaAgendada }) {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [horaSeleccionada, setHoraSeleccionada] = useState("");
  const [infoProfesional, setInfoProfesional] = useState(null);
  const [diasDisponibles, setDiasDisponibles] = useState([]);
  const [horariosDisponibles, setHorariosDisponibles] = useState([]);
  const [citasProfesional, setCitasProfesional] = useState([]);

  useEffect(() => {
    const fetchInfoProfesional = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/profesionales/${rutProfesional}`
        );
        setInfoProfesional(response.data);

        if (response.data.horario) {
          const diasSemana = {
            Lunes: 1,
            Martes: 2,
            Miércoles: 3,
            Jueves: 4,
            Viernes: 5,
            Sábado: 6,
            Domingo: 0,
          };

          const dias = Object.keys(response.data.horario)
            .map((dia) => diasSemana[dia] ?? null)
            .filter((dia) => dia !== null);
          setDiasDisponibles(dias);

          if (fechaSeleccionada) {
            const diaSemana = fechaSeleccionada.getDay();
            const diaNombre = Object.keys(response.data.horario).find(
              (dia) => diasSemana[dia] === diaSemana
            );
            if (diaNombre) {
              const { inicio, fin } = response.data.horario[diaNombre];
              const horarios = generarHorarios(inicio, fin);
              setHorariosDisponibles(horarios);
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

  useEffect(() => {
    const fetchCitasProfesional = async () => {
      try {
        const response = await axios.get("http://localhost:8080/citas");
        const citas = response.data.filter(
          (cita) =>
            cita.rutProfesional === rutProfesional &&
            new Date(cita.fechaCita).toLocaleDateString("es-ES") ===
            fechaSeleccionada?.toLocaleDateString("es-ES")
        );
        setCitasProfesional(citas);
      } catch (error) {
        console.error("Error al obtener las citas del profesional:", error);
      }
    };

    if (fechaSeleccionada) {
      fetchCitasProfesional();
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

  const estaHorarioOcupado = (horario) => {
    return citasProfesional.some((cita) => {
      const citaFecha = new Date(cita.fechaCita); // Fecha original del backend
  
      // Restar 3 horas a la fecha y hora de la cita
      citaFecha.setHours(citaFecha.getHours());
  
      const citaHoraLocal = citaFecha
        .getHours()
        .toString()
        .padStart(2, "0") + ":00"; // Hora ajustada (restadas 3 horas)
  
      // Comparar la fecha seleccionada y la hora seleccionada con la hora ajustada
      return (
        citaFecha.toLocaleDateString("es-ES") ===
          fechaSeleccionada?.toLocaleDateString("es-ES") &&
        citaHoraLocal === horario
      );
    });
  };
  

  const confirmarCita = () => {
    if (fechaSeleccionada && horaSeleccionada) {
      const citaAgendadaISO = new Date(
        `${fechaSeleccionada.toISOString().split("T")[0]}T${horaSeleccionada}:00`
      ).toISOString();

      const nuevaCita = {
        fecha: fechaSeleccionada.toLocaleDateString("es-ES"),
        hora: horaSeleccionada,
      };

      setCitaAgendada({
        citaAgendadaISO,
        ...nuevaCita,
      });

      setActiveStep((prevStep) => prevStep + 1);
    } else {
      alert("Por favor selecciona una fecha y un horario.");
    }
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
                      disabled={estaHorarioOcupado(horario)} // Bloqueo de horarios ocupados
                      className={`px-3 py-1 rounded-md ${estaHorarioOcupado(horario)
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : horaSeleccionada === horario
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
                  onClick={confirmarCita}
                  className="bg-white text-teal-400 border border-teal-400 px-4 py-2 rounded-md hover:bg-teal-400 hover:text-white"
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

