package resource;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;

import services.CitaService;
import dto.CitaRequest;

@Path("/citas")
@Consumes("application/json")
@Produces("application/json")
public class CitaResource {

    @Inject
    CitaService citaService;

    @POST
    public Response crearCita(CitaRequest request) {
        try {
            citaService.guardarCita(request);
            return Response.status(Response.Status.CREATED).build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST).entity(e.getMessage()).build();
        }
    }
}
