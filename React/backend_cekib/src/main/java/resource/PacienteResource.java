package resource;

import entities.Paciente;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

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

    @GET
    public Response getAllPacientes() {
        List<Paciente> pacientes = em.createQuery("SELECT p FROM Paciente p", Paciente.class).getResultList();
        return Response.ok(pacientes).build();
    }
}

