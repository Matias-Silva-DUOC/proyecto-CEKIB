package entities;

import jakarta.persistence.*;

// Clase que representa la entidad Usuario
@Entity
@Table(name = "usuario") // Mapea la clase a la tabla 'usuario' en la base de datos
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Genera un ID automáticamente
    private Long id; // ID del usuario

    @Column(nullable = false, unique = true) // Asegura que el nombre de usuario sea único
    private String username;

    @Column(nullable = false) // La contraseña no puede ser nula
    private String password;

    // Constructor vacío requerido por JPA
    public Usuario() {
    }

    // Constructor que recibe username y password
    public Usuario(String username, String password) {
        this.username = username;
        this.password = password;
    }

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
