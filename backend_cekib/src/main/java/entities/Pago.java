package entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "pago")
public class Pago {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_pago")
    private Integer idPago;

    @Column(name = "fecha_pago", nullable = false)
    private LocalDateTime fechaPago;

    @Column(name = "monto", nullable = false)
    private Integer monto;

    @Column(name = "metodo_pago", nullable = false, length = 64)
    private String metodoPago;

    @Column(name = "estado_pago", nullable = false, length = 64)
    private String estadoPago;

    @Column(name = "descuento")
    private Integer descuento;

    @ManyToOne
    @JoinColumn(name = "id_cita", referencedColumnName = "id_cita", unique = true)
    private Cita cita;

    // Constructor vacío
    public Pago() {}

    // Constructor completo
    public Pago(LocalDateTime fechaPago, Integer monto, String metodoPago, String estadoPago, Integer descuento, Cita cita) {
        this.fechaPago = fechaPago;
        this.monto = monto;
        this.metodoPago = metodoPago;
        this.estadoPago = estadoPago;
        this.descuento = descuento;
        this.cita = cita;
    }

    // Getters y Setters
    public Integer getIdPago() {
        return idPago;
    }

    public void setIdPago(Integer idPago) {
        this.idPago = idPago;
    }

    public LocalDateTime getFechaPago() {
        return fechaPago;
    }

    public void setFechaPago(LocalDateTime fechaPago) {
        this.fechaPago = fechaPago;
    }

    public Integer getMonto() {
        return monto;
    }

    public void setMonto(Integer monto) {
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

    public Integer getDescuento() {
        return descuento;
    }

    public void setDescuento(Integer descuento) {
        this.descuento = descuento;
    }

    public Cita getCita() {
        return cita;
    }

    public void setCita(Cita cita) {
        this.cita = cita;
    }
}
