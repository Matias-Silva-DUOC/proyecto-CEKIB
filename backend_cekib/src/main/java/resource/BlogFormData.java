package resource;

import org.jboss.resteasy.annotations.providers.multipart.PartType;
import io.quarkus.runtime.annotations.RegisterForReflection;
import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.core.MediaType; // Asegúrate de tener esta importación
import java.io.InputStream;

@RegisterForReflection
public class BlogFormData {

  @FormParam("titulo")
  @PartType(MediaType.TEXT_PLAIN)
  public String titulo;

  @FormParam("contenido")
  @PartType(MediaType.TEXT_PLAIN)
  public String contenido;

  @FormParam("imagen")
  @PartType(MediaType.APPLICATION_OCTET_STREAM)
  public InputStream imagen;

  @FormParam("imagen")
  public org.jboss.resteasy.plugins.providers.multipart.InputPart imagenDetail;
}