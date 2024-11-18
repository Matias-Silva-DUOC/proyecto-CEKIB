package resource;

import entities.Paciente;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/pacientes")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class PacienteResource {

    @Inject
    EntityManager em;

    @POST
    @Transactional
    public Response createPaciente(Paciente paciente) {
        em.persist(paciente);
        return Response.status(Response.Status.CREATED).entity(paciente).build();
    }
}
