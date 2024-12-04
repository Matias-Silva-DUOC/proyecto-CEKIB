package entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

@Entity
@Table(name = "sesiones")
public class Sesiones extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_sesion", nullable = false)
    private Long idSesion;

    @Column(name = "nro_sesion", nullable = false)
    private Integer numeroSesion;

    @Column(name = "fecha_sesion", nullable = false)
    private LocalDateTime fechaSesion;

    @Column(name = "estado_sesion", nullable = false, length = 64)
    private String estadoSesion;

    @ManyToOne
    @JoinColumn(name = "id_tratamiento", referencedColumnName = "id_tratamiento", nullable = false)
    private Tratamiento tratamiento;

    // Constructor vacío
    public Sesiones() {
    }

    // Constructor completo
    public Sesiones(Integer numeroSesion, LocalDateTime fechaSesion, String estadoSesion, Tratamiento tratamiento) {
        this.numeroSesion = numeroSesion;
        this.fechaSesion = fechaSesion;
        this.estadoSesion = estadoSesion;
        this.tratamiento = tratamiento;
    }

    // Getters y Setters
    public Long getIdSesion() {
        return idSesion;
    }

    public void setIdSesion(Long idSesion) {
        this.idSesion = idSesion;
    }

    public Integer getNumeroSesion() {
        return numeroSesion;
    }

    public void setNumeroSesion(Integer numeroSesion) {
        this.numeroSesion = numeroSesion;
    }

    public LocalDateTime getFechaSesion() {
        return fechaSesion;
    }

    public void setFechaSesion(LocalDateTime fechaSesion) {
        this.fechaSesion = fechaSesion;
    }

    public String getEstadoSesion() {
        return estadoSesion;
    }

    public void setEstadoSesion(String estadoSesion) {
        this.estadoSesion = estadoSesion;
    }

    public Tratamiento getTratamiento() {
        return tratamiento;
    }

    public void setTratamiento(Tratamiento tratamiento) {
        this.tratamiento = tratamiento;
    }
}
