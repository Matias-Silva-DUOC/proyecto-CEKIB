package resource;

import entities.Profesional;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.util.List;


@Path("/profesionales")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProfesionalResource {

    @Inject
    EntityManager em;

    /**
     * Obtiene todos los profesionales.
     */
    @GET
    public Response getProfesionales() {
        try {
            List<Profesional> profesionales = em.createQuery("SELECT p FROM Profesional p", Profesional.class)
                    .getResultList();
            return Response.ok(profesionales).build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.serverError().entity("Error al obtener profesionales").build();
        }
    }

    /**
     * Obtiene un profesional específico por su RUT.
     * 
     * @param rutProfesional RUT del profesional a buscar.
     * @return Profesional encontrado o un error 404 si no existe.
     */
    @GET
    @Path("/{rutProfesional}")
    public Response getProfesionalPorRut(@PathParam("rutProfesional") String rutProfesional) {
        try {
            Profesional profesional = em.find(Profesional.class, rutProfesional);
            if (profesional == null) {
                return Response.status(Response.Status.NOT_FOUND)
                        .entity("Profesional con RUT " + rutProfesional + " no encontrado.")
                        .build();
            }
            return Response.ok(profesional).build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.serverError()
                    .entity("Error al obtener el profesional con RUT " + rutProfesional)
                    .build();
        }
    }



/**
     * Actualizar profesional
     * 
     * @param rutPro
     * @param profesional
     * @return
     */
    @PUT
    @Path("/{rutPro}")
    public Response updateProfesioanl(@PathParam("rutPro") String rutPro, Profesional profesional) {
        try {
            Profesional existingProfesional = em.find(Profesional.class, rutPro);
            if (existingProfesional == null) {
                return Response.status(Response.Status.NOT_FOUND)
                        .entity("Profesional con rut " + rutPro + " no encontrado.")
                        .build();
            }
            em.getTransaction().begin();
            existingProfesional.setRutPro(profesional.getRutPro());
            existingProfesional.setNombrePro(profesional.getNombrePro());
            existingProfesional.setEspecialidadPro(profesional.getEspecialidadPro());
            existingProfesional.setCorreoPro(profesional.getCorreoPro());
            existingProfesional.setFonoPro(profesional.getFonoPro());
            existingProfesional.setHorario(profesional.getHorario()); 
            em.merge(existingProfesional);
            em.getTransaction().commit();
            return Response.ok("Profesional actualizado exitosamente").build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.serverError().entity("Error al actualizar profesional").build();
        }
    }

}
