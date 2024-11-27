package entities;

import jakarta.persistence.*;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnore;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

@Entity
@Table(name = "pago")
public class Pago extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_pago")
    private Long idPago;

    @Column(name = "fecha_pago", nullable = false)
    private LocalDate fechaPago;

    @Column(name = "monto", nullable = false)
    private Double monto;

    @Column(name = "metodo_pago", nullable = false, length = 50)
    private String metodoPago;

    @Column(name = "estado_pago", nullable = false, length = 50)
    private String estadoPago;

    @Column(name = "descuento")
    private Double descuento;

    @ManyToOne
    @JoinColumn(name = "id_cita", referencedColumnName = "id_cita")
    @JsonIgnore
    private Cita cita;

    // Constructor vacío
    public Pago() {}

    // Constructor completo
    public Pago(LocalDate fechaPago, Double monto, String metodoPago, String estadoPago, Double descuento, Cita cita) {
        this.fechaPago = fechaPago;
        this.monto = monto;
        this.metodoPago = metodoPago;
        this.estadoPago = estadoPago;
        this.descuento = descuento;
        this.cita = cita;
    }

    // Getters y Setters
    public Long getIdPago() {
        return idPago;
    }

    public void setIdPago(Long idPago) {
        this.idPago = idPago;
    }

    public LocalDate getFechaPago() {
        return fechaPago;
    }

    public void setFechaPago(LocalDate fechaPago) {
        this.fechaPago = fechaPago;
    }

    public Double getMonto() {
        return monto;
    }

    public void setMonto(Double monto) {
        this.monto = monto;
    }

    public String getMetodoPago() {
        return metodoPago;
    }

    public void setMetodoPago(String metodoPago) {
        this.metodoPago = metodoPago;
    }

    public String getEstadoPago() {
        return estadoPago;
    }

    public void setEstadoPago(String estadoPago) {
        this.estadoPago = estadoPago;
    }

    public Double getDescuento() {
        return descuento;
    }

    public void setDescuento(Double descuento) {
        this.descuento = descuento;
    }

    public Cita getCita() {
        return cita;
    }

    public void setCita(Cita cita) {
        this.cita = cita;
    }
}
