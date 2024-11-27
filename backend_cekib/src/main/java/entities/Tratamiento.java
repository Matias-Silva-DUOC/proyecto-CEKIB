package entities;

import jakarta.persistence.*;

@Entity
@Table(name = "tratamiento")
public class Tratamiento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_tratamiento")
    private Integer idTratamiento;

    @Column(name = "tipo_tratamiento", nullable = false, length = 64)
    private String tipoTratamiento;

    @Column(name = "descripcion_tratamiento", nullable = false, length = 255)
    private String descripcionTratamiento;

    @Column(name = "duracion_sesiones", nullable = false)
    private Integer duracionSesiones;

    @ManyToOne
    @JoinColumn(name = "id_cita", referencedColumnName = "id_cita", unique = true)
    private Cita cita;

    // Constructor vacío
    public Tratamiento() {}

    // Constructor completo
    public Tratamiento(String tipoTratamiento, String descripcionTratamiento, Integer duracionSesiones, Cita cita) {
        this.tipoTratamiento = tipoTratamiento;
        this.descripcionTratamiento = descripcionTratamiento;
        this.duracionSesiones = duracionSesiones;
        this.cita = cita;
    }

    // Getters y Setters
    public Integer getIdTratamiento() {
        return idTratamiento;
    }

    public void setIdTratamiento(Integer idTratamiento) {
        this.idTratamiento = idTratamiento;
    }

    public String getTipoTratamiento() {
        return tipoTratamiento;
    }

    public void setTipoTratamiento(String tipoTratamiento) {
        this.tipoTratamiento = tipoTratamiento;
    }

    public String getDescripcionTratamiento() {
        return descripcionTratamiento;
    }

    public void setDescripcionTratamiento(String descripcionTratamiento) {
        this.descripcionTratamiento = descripcionTratamiento;
    }

    public Integer getDuracionSesiones() {
        return duracionSesiones;
    }

    public void setDuracionSesiones(Integer duracionSesiones) {
        this.duracionSesiones = duracionSesiones;
    }

    public Cita getCita() {
        return cita;
    }

    public void setCita(Cita cita) {
        this.cita = cita;
    }
}
