package resource;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import entities.Profesional;
import repositories.ProfesionalRepository;

@Path("/validation")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ValidationResource {

    @Inject
    ProfesionalRepository profesionalRepository;

    @GET
    @Path("/validate-professional/{rutPro}")
    public Response validateProfessional(@PathParam("rutPro") String rutPro) {
        Profesional pro = profesionalRepository.findById(rutPro); // Usamos el repositorio
        if (pro == null) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("El profesional con RUT " + rutPro + " no fue encontrado.")
                    .build();
        }
        return Response.ok(pro).build();
    }
}
