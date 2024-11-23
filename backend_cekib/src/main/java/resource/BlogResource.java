package resource;

import entities.Blog;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/blog")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class BlogResource {

    @Inject
    EntityManager em;

    /**
     * Obtiene todos los blogs.
     */
    @GET
    public Response getAllBlogs() {
        try {
            List<Blog> blogs = em.createQuery("SELECT b FROM Blog b", Blog.class).getResultList();
            return Response.ok(blogs).build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.serverError().entity("Error al obtener los blogs").build();
        }
    }

    /**
     * Obtiene un blog específico por su ID.
     * 
     * @param idBlog ID del blog a buscar.
     * @return Blog encontrado o un error 404 si no existe.
     */
    @GET
    @Path("/{idBlog}")
    public Response getBlogById(@PathParam("idBlog") Integer idBlog) {
        try {
            Blog blog = em.find(Blog.class, idBlog);
            if (blog == null) {
                return Response.status(Response.Status.NOT_FOUND)
                        .entity("Blog con ID " + idBlog + " no encontrado.")
                        .build();
            }
            return Response.ok(blog).build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.serverError()
                    .entity("Error al obtener el blog con ID " + idBlog)
                    .build();
        }
    }

    /**
     * Crea un nuevo blog.
     * 
     * @param blog Objeto del blog a crear.
     * @return Respuesta con el estado de la creación.
     */
    @POST
    public Response createBlog(Blog blog) {
        try {
            em.getTransaction().begin();
            em.persist(blog);
            em.getTransaction().commit();
            return Response.status(Response.Status.CREATED)
                    .entity("Blog creado exitosamente con ID " + blog.getIdBlog())
                    .build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.serverError().entity("Error al crear el blog").build();
        }
    }

    /**
     * Actualiza un blog existente.
     * 
     * @param idBlog ID del blog a actualizar.
     * @param blog   Objeto con los datos actualizados.
     * @return Respuesta con el estado de la actualización.
     */
    @PUT
    @Path("/{idBlog}")
    public Response updateBlog(@PathParam("idBlog") Integer idBlog, Blog blog) {
        try {
            Blog existingBlog = em.find(Blog.class, idBlog);
            if (existingBlog == null) {
                return Response.status(Response.Status.NOT_FOUND)
                        .entity("Blog con ID " + idBlog + " no encontrado.")
                        .build();
            }
            em.getTransaction().begin();
            existingBlog.setTitulo(blog.getTitulo());
            existingBlog.setContenido(blog.getContenido());
            existingBlog.setFechaBlog(blog.getFechaBlog());
            existingBlog.setFoto(blog.getFoto());
            existingBlog.setUsuario(blog.getUsuario());
            em.merge(existingBlog);
            em.getTransaction().commit();
            return Response.ok("Blog actualizado exitosamente").build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.serverError().entity("Error al actualizar el blog").build();
        }
    }

    /**
     * Elimina un blog por su ID.
     * 
     * @param idBlog ID del blog a eliminar.
     * @return Respuesta con el estado de la eliminación.
     */
    @DELETE
    @Path("/{idBlog}")
    public Response deleteBlog(@PathParam("idBlog") Integer idBlog) {
        try {
            Blog blog = em.find(Blog.class, idBlog);
            if (blog == null) {
                return Response.status(Response.Status.NOT_FOUND)
                        .entity("Blog con ID " + idBlog + " no encontrado.")
                        .build();
            }
            em.getTransaction().begin();
            em.remove(blog);
            em.getTransaction().commit();
            return Response.ok("Blog eliminado exitosamente").build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.serverError().entity("Error al eliminar el blog").build();
        }
    }
}