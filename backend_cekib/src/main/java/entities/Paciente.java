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

    @Column(name = "edad", nullable = false, length = 64)
    private String edadPac;

    @Column(name = "correo_pac", length = 64)
    private String correoPac;

    @Column(name = "fono_pac", length = 64)
    private String fonoPac;

    @Column(name = "ocupacion", nullable = false, length = 64)
    private String ocupacion;

    @Column(name = "prevision", nullable = false, length = 64)
    private String prevision;

    @OneToMany(mappedBy = "paciente", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Cita> citas = new ArrayList<>();

    // Constructor vacío
    public Paciente() {
    }

    // Constructor completo
    public Paciente(String rutPac, String nombrePac, String apellidoPac, String edadPac, String correoPac,
            String fonoPac, String ocupacion, String prevision) {
        this.rutPac = rutPac;
        this.nombrePac = nombrePac;
        this.apellidoPac = apellidoPac;
        this.edadPac = edadPac;
        this.correoPac = correoPac;
        this.fonoPac = fonoPac;
        this.ocupacion = ocupacion;
        this.prevision = prevision;
        this.citas = new ArrayList<>();
    }

    // Getters y setters
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

    public String getEdadPac() {
        return edadPac;
    }

    public void setEdadPac(String edadPac) {
        this.edadPac = edadPac;
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

    public List<Cita> getCitas() {
        return citas;
    }

    public void addCita(Cita cita) {
        citas.add(cita);
        cita.setPaciente(this);
    }

    public void removeCita(Cita cita) {
        citas.remove(cita);
        cita.setPaciente(null);
    }
}