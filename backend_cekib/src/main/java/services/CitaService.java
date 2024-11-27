package services;

import entities.Cita;
import entities.Paciente;
import entities.Profesional;
import dto.CitaRequest;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import java.util.Optional;

@ApplicationScoped
public class CitaService {

    @Transactional
    public void guardarCita(CitaRequest request) {
        // Verificar si el paciente existe
        Optional<Paciente> pacienteOptional = Paciente.find("rutPac", request.rutPaciente).firstResultOptional();

        Paciente paciente;
        if (pacienteOptional.isEmpty()) {
            // Crear nuevo paciente
            paciente = new Paciente();
            paciente.setRutPac(request.rutPaciente);
            paciente.setNombrePac(request.nombrePaciente);
            paciente.setApellidoPac(request.apellidoPaciente);
            paciente.setCorreoPac(request.correoPaciente);
            paciente.setFonoPac(request.telefonoPaciente);
            paciente.setOcupacion(""); // Vacío por ahora
            paciente.setPrevision(""); // Vacío por ahora
            paciente.persist();
        } else {
            paciente = pacienteOptional.get();
        }

        // Verificar que el profesional exista
        Profesional profesional = Profesional.find("rutPro", request.rutProfesional).firstResult();
        if (profesional == null) {
            throw new IllegalArgumentException("El profesional con RUT " + request.rutProfesional + " no existe.");
        }

        // Crear nueva cita
        Cita cita = new Cita();
        cita.setFechaCita(request.citaAgendada);
        cita.setEstadoCita("Pendiente");
        cita.setPaciente(paciente);
        cita.setProfesional(profesional);
        cita.persist();
    }
}
