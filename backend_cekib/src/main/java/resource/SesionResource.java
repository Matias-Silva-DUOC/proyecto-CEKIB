package resource;

import entities.Sesiones;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;
import java.util.List;

@Path("/sesiones")
@Produces("application/json")
@Consumes("application/json")
public class SesionResource {

    // Obtener todas las sesiones
    @GET
    public Response obtenerTodasLasSesiones() {
        try {
            List<Sesiones> sesiones = Sesiones.listAll(); // Usamos PanacheEntityBase para listar todas las sesiones
            return Response.ok(sesiones).build(); // Devuelve la lista de sesiones en formato JSON
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Error al obtener las sesiones: " + e.getMessage())
                    .build();
        }
    }
}
