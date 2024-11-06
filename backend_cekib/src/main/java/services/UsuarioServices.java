package services;

import entities.Usuario;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;

// Clase que maneja la lógica de negocio relacionada con los usuarios
@ApplicationScoped
public class UsuarioServices {

    @PersistenceContext
    EntityManager em; // Maneja la conexión a la base de datos

    // Método que autentica al usuario
    public boolean authenticate(String username, String password) {
        // Crea una consulta para buscar un usuario que coincida con el nombre de
        // usuario y la contraseña
        TypedQuery<Usuario> query = em.createQuery(
                "SELECT u FROM Usuario u WHERE u.username = :username AND u.password = :password", Usuario.class);
        query.setParameter("username", username);
        query.setParameter("password", password);

        // Obtiene el primer usuario que coincide con los criterios de búsqueda
        Usuario user = query.getResultList().stream().findFirst().orElse(null);

        // Retorna verdadero si el usuario existe
        return user != null; // Simplifica la autenticación
    }
}