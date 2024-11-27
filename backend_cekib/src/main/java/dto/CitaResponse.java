package dto;

import entities.Cita;

import java.time.LocalDateTime;

public class CitaResponse {
    private Long id;
    private LocalDateTime fechaCita;
    private String estadoCita;
    private String rutPaciente;
    private String nombrePaciente;
    private String apellidoPaciente;
    private String rutProfesional;
    private String nombreProfesional;

    // Constructor vacío
    public CitaResponse() {
    }

    // Constructor que recibe una entidad Cita
    public CitaResponse(Cita cita) {
        this.id = cita.id;
        this.fechaCita = cita.getFechaCita();
        this.estadoCita = cita.getEstadoCita();
        this.rutPaciente = cita.getPaciente().getRutPac();
        this.nombrePaciente = cita.getPaciente().getNombrePac();
        this.apellidoPaciente = cita.getPaciente().getApellidoPac();
        this.rutProfesional = cita.getProfesional().getRutPro();
        this.nombreProfesional = cita.getProfesional().getNombrePro();
    }

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getFechaCita() {
        return fechaCita;
    }

    public void setFechaCita(LocalDateTime fechaCita) {
        this.fechaCita = fechaCita;
    }

    public String getEstadoCita() {
        return estadoCita;
    }

    public void setEstadoCita(String estadoCita) {
        this.estadoCita = estadoCita;
    }

    public String getRutPaciente() {
        return rutPaciente;
    }

    public void setRutPaciente(String rutPaciente) {
        this.rutPaciente = rutPaciente;
    }

    public String getNombrePaciente() {
        return nombrePaciente;
    }

    public void setNombrePaciente(String nombrePaciente) {
        this.nombrePaciente = nombrePaciente;
    }

    public String getApellidoPaciente() {
        return apellidoPaciente;
    }

    public void setApellidoPaciente(String apellidoPaciente) {
        this.apellidoPaciente = apellidoPaciente;
    }

    public String getRutProfesional() {
        return rutProfesional;
    }

    public void setRutProfesional(String rutProfesional) {
        this.rutProfesional = rutProfesional;
    }

    public String getNombreProfesional() {
        return nombreProfesional;
    }

    public void setNombreProfesional(String nombreProfesional) {
        this.nombreProfesional = nombreProfesional;
    }
}
