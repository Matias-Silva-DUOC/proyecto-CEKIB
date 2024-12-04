package services;

import entities.Blog;
import repositories.BlogRepository;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.List;

@ApplicationScoped
public class BlogService {

    @Inject
    BlogRepository blogRepository;

    // Obtener todos los blogs
    public List<Blog> getAllBlogs() {
        return blogRepository.listAll();
    }

    // Obtener un blog por su ID
    public Blog getBlogById(Long id) { // Cambiado a Long
        return blogRepository.findById(id);
    }

    // Crear un nuevo blog
    public void createBlog(Blog blog) {
        blogRepository.persist(blog);
    }

    // Actualizar un blog existente
    public void updateBlog(Long id, Blog updatedBlog) { // Cambiado a Long
        Blog existingBlog = blogRepository.findById(id);
        if (existingBlog != null) {
            // Actualizar los campos relevantes
            existingBlog.setTitulo(updatedBlog.getTitulo());
            existingBlog.setContenido(updatedBlog.getContenido());
            existingBlog.setFechaBlog(updatedBlog.getFechaBlog());
            existingBlog.setImagePath(updatedBlog.getImagePath());
            existingBlog.setUsuario(updatedBlog.getUsuario());
            // No se requiere persist si el objeto ya estÃ¡ gestionado
        }
    }

    // Eliminar un blog por su ID
    public void deleteBlog(Long id) { // Cambiado a Long
        Blog blog = blogRepository.findById(id);
        if (blog != null) {
            blogRepository.delete(blog);
        }
    }
}