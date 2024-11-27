package services;

import entities.Tratamiento;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.List;

@ApplicationScoped
public class TratamientoService {

    /**
     * Obtiene todos los tratamientos almacenados en la base de datos.
     *
     * @return Una lista de objetos Tratamiento.
     */
    public List<Tratamiento> obtenerTodosLosTratamientos() {
        return Tratamiento.listAll(); // Utiliza Panache para listar todos los tratamientos
    }
}
