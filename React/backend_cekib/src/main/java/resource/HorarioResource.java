package resource;

import entities.HorarioFijo;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

@Path("/horarios")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class HorarioResource {

    @Inject
    EntityManager em;

    @GET
    public Response getHorariosByProfesional(@QueryParam("rutPro") String rutPro) {
        List<HorarioFijo> horarios = em.createQuery(
                "SELECT h FROM HorarioFijo h WHERE h.rutPro = :rutPro", HorarioFijo.class)
                .setParameter("rutPro", rutPro)
                .getResultList();

        if (horarios.isEmpty()) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("No se encontraron horarios para el profesional con RUT: " + rutPro)
                    .build();
        }
        return Response.ok(horarios).build();
    }
}
