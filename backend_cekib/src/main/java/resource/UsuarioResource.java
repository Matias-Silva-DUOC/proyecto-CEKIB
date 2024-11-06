package resource;

import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import entities.Usuario; // Importa la entidad Usuario
import services.UsuarioServices; // Importa el servicio de usuario

// Clase que maneja las solicitudes relacionadas con los usuarios
@Path("/login") // Define la ruta base para las operaciones de login
@Consumes(MediaType.APPLICATION_JSON) 
@Produces(MediaType.APPLICATION_JSON)
public class UsuarioResource {

    @Inject
    UsuarioServices userService; // Inyecta el servicio que maneja la lógica de negocio

    // Método que maneja las solicitudes POST para el login
    @POST
    public Response login(Usuario usuario) {
        // Llama al servicio para autenticar al usuario usando los datos proporcionados
        boolean isAuthenticated = userService.authenticate(usuario.getUsername(), usuario.getPassword());

        // Devuelve una respuesta según el resultado de la autenticación
        if (isAuthenticated) {
            return Response.ok().entity("{\"message\": \"Login successful\"}").build(); // Login exitoso
        } else {
            return Response.status(Response.Status.UNAUTHORIZED)
                    .entity("{\"error\": \"Invalid credentials\"}").build(); // Credenciales inválidas
        }
    }
}