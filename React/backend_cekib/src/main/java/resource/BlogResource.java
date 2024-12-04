package resource;

import entities.Blog;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.jboss.resteasy.annotations.providers.multipart.MultipartForm;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

// DTO para Blog
class BlogDTO {
    public Integer id_blog;
    public String titulo;
    public String contenido;
    public String fecha_blog;
    public String imagePath; // Ruta de la imagen

    public BlogDTO(Integer id_blog, String titulo, String contenido, String fecha_blog, String imagePath) {
        this.id_blog = id_blog;
        this.titulo = titulo;
        this.contenido = contenido;
        this.fecha_blog = fecha_blog;
        this.imagePath = imagePath;
    }
}

@Path("/blog")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class BlogResource {

    private static final String UPLOAD_DIR = "uploads/";

    @Inject
    EntityManager em;

    // Obtener todos los blogs
    @GET
    public Response getAllBlogs() {
        try {
            List<Object[]> results = em.createQuery(
                    "SELECT b.idBlog, b.titulo, b.contenido, b.fechaBlog, b.imagePath " +
                            "FROM Blog b", Object[].class)
                    .getResultList();

            List<BlogDTO> blogs = results.stream()
                    .map(row -> new BlogDTO(
                            ((Number) row[0]).intValue(),
                            (String) row[1],
                            (String) row[2],
                            row[3] != null ? row[3].toString() : null,
                            (String) row[4]
                    ))
                    .collect(Collectors.toList());

            return Response.ok(blogs).build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.serverError().entity("Error al obtener los blogs: " + e.getMessage()).build();
        }
    }

    // Obtener un blog por ID
    @GET
    @Path("/{id}")
    public Response getBlogById(@PathParam("id") Integer id) {
        try {
            Blog blog = em.find(Blog.class, id);
            if (blog == null) {
                return Response.status(Response.Status.NOT_FOUND).entity("Blog no encontrado").build();
            }

            BlogDTO blogDTO = new BlogDTO(
                    blog.getIdBlog(),
                    blog.getTitulo(),
                    blog.getContenido(),
                    blog.getFechaBlog() != null ? blog.getFechaBlog().toString() : null,
                    blog.getImagePath()
            );

            return Response.ok(blogDTO).build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.serverError().entity("Error al obtener el blog: " + e.getMessage()).build();
        }
    }

    // Crear un nuevo blog con imagen
    @POST
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Transactional
    public Response createBlog(@MultipartForm BlogFormData formData) {
        try {
            if (formData.titulo == null || formData.titulo.isEmpty()) {
                return Response.status(Response.Status.BAD_REQUEST).entity("El título es obligatorio").build();
            }
            if (formData.contenido == null || formData.contenido.isEmpty()) {
                return Response.status(Response.Status.BAD_REQUEST).entity("El contenido es obligatorio").build();
            }

            // Guardar la imagen en el servidor
            String uploadedFilePath = null;
            if (formData.imagen != null) {
                Files.createDirectories(Paths.get(UPLOAD_DIR)); // Crear directorio si no existe
                String fileName = System.currentTimeMillis() + "_image";
                uploadedFilePath = UPLOAD_DIR + fileName;
                Files.copy(formData.imagen, Paths.get(uploadedFilePath), StandardCopyOption.REPLACE_EXISTING);
            }

            // Crear el blog
            Blog blog = new Blog();
            blog.setTitulo(formData.titulo);
            blog.setContenido(formData.contenido);
            blog.setFechaBlog(LocalDateTime.now());
            blog.setImagePath(uploadedFilePath);

            em.persist(blog);

            return Response.status(Response.Status.CREATED).entity("Blog creado exitosamente").build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.serverError().entity("Error al crear el blog: " + e.getMessage()).build();
        }
    }

    // Actualizar un blog existente con imagen
    @PUT
    @Path("/{id}")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Transactional
    public Response updateBlog(@PathParam("id") Integer id, @MultipartForm BlogFormData formData) {
        try {
            Blog blog = em.find(Blog.class, id);
            if (blog == null) {
                return Response.status(Response.Status.NOT_FOUND).entity("Blog no encontrado").build();
            }

            if (formData.titulo == null || formData.titulo.isEmpty()) {
                return Response.status(Response.Status.BAD_REQUEST).entity("El título es obligatorio").build();
            }
            if (formData.contenido == null || formData.contenido.isEmpty()) {
                return Response.status(Response.Status.BAD_REQUEST).entity("El contenido es obligatorio").build();
            }

            // Guardar la nueva imagen si existe
            String uploadedFilePath = blog.getImagePath(); // Mantener la ruta de la imagen existente
            if (formData.imagen != null) {
                Files.createDirectories(Paths.get(UPLOAD_DIR));
                String fileName = System.currentTimeMillis() + "_image";
                uploadedFilePath = UPLOAD_DIR + fileName;
                Files.copy(formData.imagen, Paths.get(uploadedFilePath), StandardCopyOption.REPLACE_EXISTING);
            }

            // Actualizar el blog
            blog.setTitulo(formData.titulo);
            blog.setContenido(formData.contenido);
            blog.setFechaBlog(LocalDateTime.now());
            blog.setImagePath(uploadedFilePath);

            em.merge(blog);

            return Response.ok("Blog actualizado exitosamente").build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.serverError().entity("Error al actualizar el blog: " + e.getMessage()).build();
        }
    }

    // Eliminar un blog
    @DELETE
    @Path("/{id}")
    @Transactional
    public Response deleteBlog(@PathParam("id") Integer id) {
        try {
            Blog blog = em.find(Blog.class, id);
            if (blog == null) {
                return Response.status(Response.Status.NOT_FOUND).entity("Blog no encontrado").build();
            }

            // Eliminar la imagen del servidor
            if (blog.getImagePath() != null) {
                Files.deleteIfExists(Paths.get(blog.getImagePath()));
            }

            em.remove(blog);

            return Response.ok("Blog eliminado exitosamente").build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.serverError().entity("Error al eliminar el blog: " + e.getMessage()).build();
        }
    }

    @GET
    @Path("/uploads/{filename}")
    @Produces({"image/png", "image/jpeg", "image/gif"})
    public Response getImage(@PathParam("filename") String filename) {
        try {
            File file = new File("uploads/" + filename); // Ruta absoluta o relativa según tu configuración
            if (!file.exists()) {
                return Response.status(Response.Status.NOT_FOUND).entity("Imagen no encontrada").build();
            }

            return Response.ok(file).build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.serverError().entity("Error al cargar la imagen").build();
        }
    }


}