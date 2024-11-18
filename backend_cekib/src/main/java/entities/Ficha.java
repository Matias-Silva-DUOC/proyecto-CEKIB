package entities;

import jakarta.persistence.*;

@Entity
@Table(name = "ficha")
public class Ficha {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_ficha")
    private Integer idFicha;

    @Column(name = "fecha_ficha", nullable = false)
    private String fechaFicha;

    @Column(name = "cirugias", nullable = false)
    private String cirugias;

    @Column(name = "ejercicio", nullable = false)
    private String ejercicio;

    @Column(name = "alimentacion", nullable = false)
    private String alimentacion;

    @Column(name = "sueno", nullable = false)
    private String sueno;

    @Column(name = "habitos", nullable = false)
    private String habitos;

    @Column(name = "dolor", nullable = false)
    private String dolor;

    @Column(name = "expectativas", nullable = false)
    private String expectativas;

    // Constructor vacío
    public Ficha() {}

    // Constructor completo
    public Ficha(String fechaFicha, String cirugias, String ejercicio, String alimentacion, String sueno,
                 String habitos, String dolor, String expectativas) {
        this.fechaFicha = fechaFicha;
        this.cirugias = cirugias;
        this.ejercicio = ejercicio;
        this.alimentacion = alimentacion;
        this.sueno = sueno;
        this.habitos = habitos;
        this.dolor = dolor;
        this.expectativas = expectativas;
    }

    // Getters y Setters
    public Integer getIdFicha() {
        return idFicha;
    }

    public void setIdFicha(Integer idFicha) {
        this.idFicha = idFicha;
    }

    public String getFechaFicha() {
        return fechaFicha;
    }

    public void setFechaFicha(String fechaFicha) {
        this.fechaFicha = fechaFicha;
    }

    public String getCirugias() {
        return cirugias;
    }

    public void setCirugias(String cirugias) {
        this.cirugias = cirugias;
    }

    public String getEjercicio() {
        return ejercicio;
    }

    public void setEjercicio(String ejercicio) {
        this.ejercicio = ejercicio;
    }

    public String getAlimentacion() {
        return alimentacion;
    }

    public void setAlimentacion(String alimentacion) {
        this.alimentacion = alimentacion;
    }

    public String getSueno() {
        return sueno;
    }

    public void setSueno(String sueno) {
        this.sueno = sueno;
    }

    public String getHabitos() {
        return habitos;
    }

    public void setHabitos(String habitos) {
        this.habitos = habitos;
    }

    public String getDolor() {
        return dolor;
    }

    public void setDolor(String dolor) {
        this.dolor = dolor;
    }

    public String getExpectativas() {
        return expectativas;
    }

    public void setExpectativas(String expectativas) {
        this.expectativas = expectativas;
    }
}