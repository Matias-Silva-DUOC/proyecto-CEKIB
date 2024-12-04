package services;

import entities.Pago;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.List;

@ApplicationScoped
public class PagoService {

    /**
     * Obtiene todos los pagos almacenados en la base de datos.
     *
     * @return Una lista de objetos Pago.
     */
    public List<Pago> obtenerTodosLosPagos() {
        // Utiliza PanacheEntityBase para listar todos los registros de la entidad Pago
        return Pago.listAll();
    }
}
