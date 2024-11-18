package entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "cita")
public class Cita {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_cita")
    private Integer idCita;

    @Column(name = "fecha_cita", nullable = false)
    private LocalDateTime fechaCita;

    @Column(name = "estado_cita", nullable = false, length = 64)
    private String estadoCita;

    @OneToOne
    @JoinColumn(name = "rut_pac", referencedColumnName = "rut_pac", unique = true)
    private Paciente paciente;

    @OneToOne
    @JoinColumn(name = "rut_pro", referencedColumnName = "rut_pro", unique = true)
    private Profesional profesional;

    // Constructor vacío
    public Cita() {}

    // Constructor completo
    public Cita(LocalDateTime fechaCita, String estadoCita, Paciente paciente, Profesional profesional) {
        this.fechaCita = fechaCita;
        this.estadoCita = estadoCita;
        this.paciente = paciente;
        this.profesional = profesional;
    }

    // Getters y Setters
    public Integer getIdCita() {
        return idCita;
    }

    public void setIdCita(Integer idCita) {
        this.idCita = idCita;
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
