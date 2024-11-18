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

    @Column(name = "contenido", nullable = false, length = 255)
    private String contenido;

    @Column(name = "fecha_blog", nullable = false)
    private LocalDateTime fechaBlog;

    @Lob
    @Column(name = "foto")
    private byte[] foto;

    @ManyToOne
    @JoinColumn(name = "id_usuario", referencedColumnName = "id_usuario")
    private Usuario usuario;

    // Constructor vacío
    public Blog() {}

    // Constructor completo
    public Blog(String titulo, String contenido, LocalDateTime fechaBlog, byte[] foto, Usuario usuario) {
        this.titulo = titulo;
        this.contenido = contenido;
        this.fechaBlog = fechaBlog;
        this.foto = foto;
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

    public byte[] getFoto() {
        return foto;
    }

    public void setFoto(byte[] foto) {
        this.foto = foto;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
}
