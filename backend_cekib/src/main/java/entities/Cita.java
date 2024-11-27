package entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

@Entity
@Table(name = "cita")
public class Cita extends PanacheEntity {

    @Column(name = "fecha_cita", nullable = false)
    private LocalDateTime fechaCita;

    @Column(name = "estado_cita", nullable = false, length = 64)
    private String estadoCita;

    @ManyToOne
    @JoinColumn(name = "rut_pac", referencedColumnName = "rut_pac", nullable = false)
    private Paciente paciente;

    @ManyToOne
    @JoinColumn(name = "rut_pro", referencedColumnName = "rut_pro", nullable = false)
    private Profesional profesional;

    // Getters y setters
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

    public Paciente getPaciente() {
        return paciente;
    }

    public void setPaciente(Paciente paciente) {
        this.paciente = paciente;
    }

    public Profesional getProfesional() {
        return profesional;
    }

    public void setProfesional(Profesional profesional) {
        this.profesional = profesional;
    }
}
