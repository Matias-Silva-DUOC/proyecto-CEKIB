package entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "blog")
public class Blog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_blog")
    private Integer idBlog;

    @Column(name = "titulo", nullable = false, length = 64)
    private String titulo;

    @Column(name = "contenido", nullable = false, columnDefinition = "TEXT")
    private String contenido;


    @Column(name = "fecha_blog", nullable = false)
    private LocalDateTime fechaBlog;

    @Column(name = "image_path", length = 255)
    private String imagePath; // Nueva columna para almacenar la ruta de la imagen

    // Relación con usuario marcada como opcional
    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "id_usuario", referencedColumnName = "id_usuario", nullable = true)
    private Usuario usuario;

    // Constructor vacío
    public Blog() {
    }

    // Constructor con solo campos obligatorios
    public Blog(String titulo, String contenido, LocalDateTime fechaBlog) {
        this.titulo = titulo;
        this.contenido = contenido;
        this.fechaBlog = fechaBlog;
    }

    // Constructor completo
    public Blog(String titulo, String contenido, LocalDateTime fechaBlog, String imagePath, Usuario usuario) {
        this.titulo = titulo;
        this.contenido = contenido;
        this.fechaBlog = fechaBlog;
        this.imagePath = imagePath;
        this.usuario = usuario;
    }

    // Getters y Setters
    public Integer getIdBlog() {
        return idBlog;
    }

    public void setIdBlog(Integer idBlog) {
        this.idBlog = idBlog;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getContenido() {
        return contenido;
    }

    public void setContenido(String contenido) {
        this.contenido = contenido;
    }

    public LocalDateTime getFechaBlog() {
        return fechaBlog;
    }

    public void setFechaBlog(LocalDateTime fechaBlog) {
        this.fechaBlog = fechaBlog;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
}
