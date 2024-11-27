package resource;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;

import services.CitaService;
import dto.CitaRequest;
import dto.CitaResponse;
import entities.Cita;

import java.util.List;

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

    @GET
    public Response obtenerCitas() {
        try {
            List<CitaResponse> citas = citaService.obtenerTodasLasCitas();
            return Response.ok(citas).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }
    }

    @GET
    @Path("/{rutPaciente}")
    public Response obtenerCitasPorRutPaciente(@PathParam("rutPaciente") String rutPaciente) {
        try {
            List<CitaResponse> citas = citaService.obtenerCitasPorRutPaciente(rutPaciente);
            if (citas.isEmpty()) {
                return Response.status(Response.Status.NOT_FOUND)
                        .entity("No se encontraron citas para el RUT especificado: " + rutPaciente)
                        .build();
            }
            return Response.ok(citas).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Error al obtener las citas: " + e.getMessage())
                    .build();
        }
    }

    @PUT
    @Path("/{citaId}/confirmar")
    @Transactional
    public Response confirmarCita(@PathParam("citaId") Long citaId) {
        // Busca la cita por ID
        Cita cita = Cita.findById(citaId);

        if (cita == null) {
            return Response.status(Response.Status.NOT_FOUND).entity("Cita no encontrada").build();
        }

        // Actualiza el estado de la cita
        cita.setEstadoCita("Confirmada");
        return Response.ok("Cita confirmada exitosamente").build();
    }

    @PUT
    @Path("/{citaId}/anular")
    @Transactional
    public Response anularCita(@PathParam("citaId") Long citaId) {
        // Busca la cita por ID
        Cita cita = Cita.findById(citaId);

        if (cita == null) {
            return Response.status(Response.Status.NOT_FOUND).entity("Cita no encontrada").build();
        }

        // Actualiza el estado de la cita
        cita.setEstadoCita("Anulada");
        return Response.ok("Cita anulada exitosamente").build();
    }

}
