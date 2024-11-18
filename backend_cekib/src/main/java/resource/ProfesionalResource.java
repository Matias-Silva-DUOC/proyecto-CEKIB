package resource;

import entities.Profesional;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

@Path("/profesionales")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProfesionalResource {

    @Inject
    EntityManager em;

    @GET
    public Response getProfesionales(@QueryParam("especialidad") String especialidad) {
        List<Profesional> profesionales = em.createQuery(
            "SELECT p FROM Profesional p WHERE p.especialidadPro LIKE :especialidad", Profesional.class)
            .setParameter("especialidad", "%" + especialidad + "%")
            .getResultList();

        return Response.ok(profesionales).build();
    }
}
