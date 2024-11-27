package entities;

import java.util.List;
import java.util.ArrayList;

import jakarta.persistence.*;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

@Entity
@Table(name = "paciente")
public class Paciente extends PanacheEntityBase {

    @Id
    @Column(name = "rut_pac", nullable = false)
    private String rutPac;

    @Column(name = "nombre_pac", nullable = false, length = 64)
    private String nombrePac;

    @Column(name = "apellido_pac", nullable = false, length = 64)
    private String apellidoPac;

    @Column(name = "correo_pac", length = 64)
    private String correoPac;

    @Column(name = "fono_pac", length = 64)
    private String fonoPac;

    @Column(name = "ocupacion", nullable = false, length = 64)
    private String ocupacion;

    @Column(name = "prevision", nullable = false, length = 64)
    private String prevision;

    @OneToOne
    @JoinColumn(name = "id_ficha", referencedColumnName = "id_ficha", unique = true)
    private Ficha ficha;

    @OneToMany(mappedBy = "paciente", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Cita> citas = new ArrayList<>();

    // Constructor vacío
    public Paciente() {
    }

    // Constructor completo
    public Paciente(String rutPac, String nombrePac, String apellidoPac, String correoPac, String fonoPac,
            String ocupacion, String prevision, Ficha ficha) {
        this.rutPac = rutPac;
        this.nombrePac = nombrePac;
        this.apellidoPac = apellidoPac;
        this.correoPac = correoPac;
        this.fonoPac = fonoPac;
        this.ocupacion = ocupacion;
        this.prevision = prevision;
        this.ficha = ficha;
    }

    // Getters y Setters
    public String getRutPac() {
        return rutPac;
    }

    public void setRutPac(String rutPac) {
        this.rutPac = rutPac;
    }

    public String getNombrePac() {
        return nombrePac;
    }

    public void setNombrePac(String nombrePac) {
        this.nombrePac = nombrePac;
    }

    public String getApellidoPac() {
        return apellidoPac;
    }

    public void setApellidoPac(String apellidoPac) {
        this.apellidoPac = apellidoPac;
    }

    public String getCorreoPac() {
        return correoPac;
    }

    public void setCorreoPac(String correoPac) {
        this.correoPac = correoPac;
    }

    public String getFonoPac() {
        return fonoPac;
    }

    public void setFonoPac(String fonoPac) {
        this.fonoPac = fonoPac;
    }

    public String getOcupacion() {
        return ocupacion;
    }

    public void setOcupacion(String ocupacion) {
        this.ocupacion = ocupacion;
    }

    public String getPrevision() {
        return prevision;
    }

    public void setPrevision(String prevision) {
        this.prevision = prevision;
    }

    public Ficha getFicha() {
        return ficha;
    }

    public void setFicha(Ficha ficha) {
        this.ficha = ficha;
    }
}
