package entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "horario_fijo")
public class HorarioFijo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_horario")
    private Integer idHorario;

    @Column(name = "diasemana", nullable = false)
    private String diaSemana;

    @Column(name = "horario_inicio", nullable = false)
    private LocalDateTime horarioInicio;

    @Column(name = "horario_fin", nullable = false)
    private LocalDateTime horarioFin;

    @OneToOne
    @JoinColumn(name = "rut_pro", referencedColumnName = "rut_pro", unique = true)
    private Profesional profesional;

    // Getters y Setters
    public Integer getIdHorario() {
        return idHorario;
    }

    public void setIdHorario(Integer idHorario) {
        this.idHorario = idHorario;
    }

    public String getDiaSemana() {
        return diaSemana;
    }

    public void setDiaSemana(String diaSemana) {
        this.diaSemana = diaSemana;
    }

    public LocalDateTime getHorarioInicio() {
        return horarioInicio;
    }

    public void setHorarioInicio(LocalDateTime horarioInicio) {
        this.horarioInicio = horarioInicio;
    }

    public LocalDateTime getHorarioFin() {
        return horarioFin;
    }

    public void setHorarioFin(LocalDateTime horarioFin) {
        this.horarioFin = horarioFin;
    }

    public Profesional getProfesional() {
        return profesional;
    }

    public void setProfesional(Profesional profesional) {
        this.profesional = profesional;
    }
}