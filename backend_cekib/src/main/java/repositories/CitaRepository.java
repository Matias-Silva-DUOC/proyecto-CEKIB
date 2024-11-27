package repositories;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import entities.Cita;

import java.util.List;

@ApplicationScoped
public class CitaRepository {

    @PersistenceContext
    EntityManager entityManager;

    // Método para obtener todas las citas
    public List<Cita> findAll() {
        String jpql = "SELECT c FROM Cita c";
        TypedQuery<Cita> query = entityManager.createQuery(jpql, Cita.class);
        return query.getResultList();
    }

    // Método para encontrar citas por RUT del paciente
    public List<Cita> findByRutPaciente(String rutPaciente) {
      String jpql = "SELECT c FROM Cita c WHERE c.paciente.rutPac = :rutPaciente";
      TypedQuery<Cita> query = entityManager.createQuery(jpql, Cita.class);
      query.setParameter("rutPaciente", rutPaciente);
      return query.getResultList();
  }
  

    // Método para guardar una cita
    public void save(Cita cita) {
        entityManager.persist(cita);
    }

    // Método para actualizar una cita
    public void update(Cita cita) {
        entityManager.merge(cita);
    }

    // Método para eliminar una cita por ID
    public void deleteById(Long id) {
        Cita cita = entityManager.find(Cita.class, id);
        if (cita != null) {
            entityManager.remove(cita);
        }
    }
}

