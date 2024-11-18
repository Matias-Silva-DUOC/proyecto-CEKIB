package resource;

import entities.Cita;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

@Path("/citas")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class CitaResource {

    @Inject
    EntityManager em;

    @POST
    @Transactional
    public Response createCita(Cita cita) {
        em.persist(cita);
        return Response.status(Response.Status.CREATED).entity(cita).build();
    }

    @GET
    public Response getCitas() {
        List<Cita> citas = em.createQuery("SELECT c FROM Cita c", Cita.class).getResultList();
        return Response.ok(citas).build();
    }
}