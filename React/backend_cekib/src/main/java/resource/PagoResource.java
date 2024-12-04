package resource;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;

import entities.Pago;
import services.PagoService;

import java.util.List;

@Path("/pagos")
@Consumes("application/json")
@Produces("application/json")
public class PagoResource {

    @Inject
    PagoService pagoService;

    @GET
    public Response obtenerPagos() {
        try {
            List<Pago> pagos = pagoService.obtenerTodosLosPagos();
            return Response.ok(pagos).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }
    }
}
