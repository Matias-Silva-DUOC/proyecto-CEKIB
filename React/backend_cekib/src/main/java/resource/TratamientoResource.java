package resource;

import services.TratamientoService;
import entities.Tratamiento;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/tratamientos")
@Consumes("application/json")
@Produces("application/json")
public class TratamientoResource {

    @Inject
    TratamientoService tratamientoService;

    @GET
    public Response obtenerTratamientos() {
        try {
            List<Tratamiento> tratamientos = tratamientoService.obtenerTodosLosTratamientos();
            return Response.ok(tratamientos).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }
    }
}
