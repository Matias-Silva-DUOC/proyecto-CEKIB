package repositories;

import entities.Profesional;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@ApplicationScoped
public class ProfesionalRepository {

    @PersistenceContext
    EntityManager em;

    public Profesional findById(String rutPro) {
        return em.find(Profesional.class, rutPro);
    }
}
