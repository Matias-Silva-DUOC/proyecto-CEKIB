package resource;

import entities.Profesional;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import jakarta.transaction.Transactional;
import java.util.List;

@Path("/profesionales")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProfesionalResource {

    @Inject
    EntityManager em;

    /**
     * Obtiene todos los profesionales.
     */
    @GET
    public Response getProfesionales() {
        try {
            List<Profesional> profesionales = em.createQuery("SELECT p FROM Profesional p", Profesional.class)
                    .getResultList();
            return Response.ok(profesionales).build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.serverError().entity("Error al obtener profesionales").build();
        }
    }

    /**
     * Obtiene un profesional específico por su RUT.
     * 
     * @param rutProfesional RUT del profesional a buscar.
     * @return Profesional encontrado o un error 404 si no existe.
     */
    @GET
    @Path("/{rutProfesional}")
    public Response getProfesionalPorRut(@PathParam("rutProfesional") String rutProfesional) {
        try {
            Profesional profesional = em.find(Profesional.class, rutProfesional);
            if (profesional == null) {
                return Response.status(Response.Status.NOT_FOUND)
                        .entity("Profesional con RUT " + rutProfesional + " no encontrado.")
                        .build();
            }
            return Response.ok(profesional).build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.serverError()
                    .entity("Error al obtener el profesional con RUT " + rutProfesional)
                    .build();
        }
    }

    /**
     * Actualiza un profesional existente por su RUT.
     * 
     * @param rutPro      RUT del profesional a actualizar.
     * @param profesional Datos del profesional actualizados.
     * @return Mensaje de éxito o error.
     */
    @PUT
    @Path("/{rutPro}")
    @Transactional // Esto habilita el manejo automático de transacciones
    public Response updateProfesional(@PathParam("rutPro") String rutPro, Profesional profesional) {
        try {
            // Limpia el RUT recibido
            rutPro = rutPro.trim();
            System.out.println("RUT recibido para actualizar (limpiado): [" + rutPro + "]");

            // Consulta SQL nativa para actualizar los datos del profesional
            em.createNativeQuery("UPDATE profesional SET " +
                    "nombre_pro = :nombrePro, " +
                    "apellido_pro = :apellidoPro, " +
                    "especialidad_pro = :especialidadPro, " +
                    "correo_pro = :correoPro, " +
                    "fono_pro = :fonoPro, " +
                    "recordatorio = :recordatorio, " +
                    "tipo_usuario = :tipoUsuario, " +
                    "id_usuario = :idUsuario, " +
                    "horario = CAST(:horario AS JSONB) " +
                    "WHERE rut_pro = :rutPro")
                    .setParameter("rutPro", rutPro)
                    .setParameter("nombrePro", profesional.getNombrePro())
                    .setParameter("apellidoPro", profesional.getApellidoPro())
                    .setParameter("especialidadPro", profesional.getEspecialidadPro())
                    .setParameter("correoPro", profesional.getCorreoPro())
                    .setParameter("fonoPro", profesional.getFonoPro())
                    .setParameter("recordatorio", profesional.getRecordatorio())
                    .setParameter("tipoUsuario", profesional.getTipoUsuario())
                    .setParameter("idUsuario", profesional.getUsuario().getIdUsuario()) // Getter correcto
                    .setParameter("horario", profesional.getHorario().toString()) // Para manejar el JSON
                    .executeUpdate();

            return Response.ok("Profesional actualizado exitosamente con RUT: " + rutPro).build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.serverError().entity("Error al actualizar el profesional").build();
        }
    }

    @POST
    @Transactional // Esto habilita el manejo automático de transacciones
    public Response createProfesional(Profesional profesional) {
        try {
            // Limpia el RUT recibido
            profesional.setRutPro(profesional.getRutPro().trim());
            System.out.println("Creando profesional con RUT: " + profesional.getRutPro());

            // Consulta nativa para insertar el nuevo profesional
            em.createNativeQuery(
                    "INSERT INTO profesional (rut_pro, nombre_pro, apellido_pro, especialidad_pro, correo_pro, fono_pro, recordatorio, tipo_usuario, id_usuario, horario) "
                            +
                            "VALUES (:rutPro, :nombrePro, :apellidoPro, :especialidadPro, :correoPro, :fonoPro, :recordatorio, :tipoUsuario, :idUsuario, CAST(:horario AS JSONB))")
                    .setParameter("rutPro", profesional.getRutPro())
                    .setParameter("nombrePro", profesional.getNombrePro())
                    .setParameter("apellidoPro", profesional.getApellidoPro())
                    .setParameter("especialidadPro", profesional.getEspecialidadPro())
                    .setParameter("correoPro", profesional.getCorreoPro())
                    .setParameter("fonoPro", profesional.getFonoPro())
                    .setParameter("recordatorio", profesional.getRecordatorio())
                    .setParameter("tipoUsuario", profesional.getTipoUsuario())
                    .setParameter("idUsuario", profesional.getUsuario().getIdUsuario()) // Getter correcto
                    .setParameter("horario", profesional.getHorario().toString())
                    .executeUpdate();

            return Response.status(Response.Status.CREATED)
                    .entity("Profesional creado exitosamente con RUT: " + profesional.getRutPro())
                    .build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.serverError().entity("Error al crear el profesional").build();
        }
    }
}