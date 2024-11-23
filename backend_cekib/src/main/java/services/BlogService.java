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

    // Obtener un blog por ID
    public Blog getBlogById(Long id) { // Cambiado de Integer a Long
        return blogRepository.findById(id);
    }

    // Crear un nuevo blog
    public void createBlog(Blog blog) {
        blogRepository.persist(blog);
    }

    // Actualizar un blog existente
    public void updateBlog(Long id, Blog updatedBlog) { // Cambiado de Integer a Long
        Blog existingBlog = blogRepository.findById(id);
        if (existingBlog != null) {
            existingBlog.setTitulo(updatedBlog.getTitulo());
            existingBlog.setContenido(updatedBlog.getContenido());
            existingBlog.setFechaBlog(updatedBlog.getFechaBlog());
            existingBlog.setFoto(updatedBlog.getFoto());
            existingBlog.setUsuario(updatedBlog.getUsuario());
            blogRepository.persist(existingBlog);
        }
    }

    // Eliminar un blog por ID
    public void deleteBlog(Long id) { // Cambiado de Integer a Long
        Blog blog = blogRepository.findById(id);
        if (blog != null) {
            blogRepository.delete(blog);
        }
    }
}