package entities;

import com.fasterxml.jackson.databind.JsonNode;
import jakarta.persistence.*;
import utils.JsonbType;

@Entity
@Table(name = "profesional")
public class Profesional {

    @Id
    @Column(name = "rut_pro", nullable = false)
    private String rutPro;

    @Column(name = "nombre_pro", nullable = false, length = 64)
    private String nombrePro;

    @Column(name = "apellido_pro", nullable = false, length = 64)
    private String apellidoPro;

    @Column(name = "especialidad_pro", nullable = false, length = 64)
    private String especialidadPro;

    @Column(name = "correo_pro", nullable = false, length = 64)
    private String correoPro;

    @Column(name = "fono_pro", nullable = false, length = 64)
    private String fonoPro;

    @Convert(converter = JsonbType.class) // Usa el convertidor personalizado
    @Column(name = "horario", columnDefinition = "jsonb")
    private JsonNode horario;

    @Column(name = "recordatorio", length = 64)
    private String recordatorio;

    @Column(name = "tipo_usuario", nullable = false, length = 64)
    private String tipoUsuario;

    @OneToOne
    @JoinColumn(name = "id_usuario", referencedColumnName = "id_usuario", unique = true)
    private Usuario usuario;

    // Getters y Setters
    public String getRutPro() {
        return rutPro;
    }

    public void setRutPro(String rutPro) {
        this.rutPro = rutPro;
    }

    public String getNombrePro() {
        return nombrePro;
    }

    public void setNombrePro(String nombrePro) {
        this.nombrePro = nombrePro;
    }

    public String getApellidoPro() {
        return apellidoPro;
    }

    public void setApellidoPro(String apellidoPro) {
        this.apellidoPro = apellidoPro;
    }

    public String getEspecialidadPro() {
        return especialidadPro;
    }

    public void setEspecialidadPro(String especialidadPro) {
        this.especialidadPro = especialidadPro;
    }

    public String getCorreoPro() {
        return correoPro;
    }

    public void setCorreoPro(String correoPro) {
        this.correoPro = correoPro;
    }

    public String getFonoPro() {
        return fonoPro;
    }

    public void setFonoPro(String fonoPro) {
        this.fonoPro = fonoPro;
    }

    public JsonNode getHorario() {
        return horario;
    }

    public void setHorario(JsonNode horario) {
        this.horario = horario;
    }

    public String getRecordatorio() {
        return recordatorio;
    }

    public void setRecordatorio(String recordatorio) {
        this.recordatorio = recordatorio;
    }

    public String getTipoUsuario() {
        return tipoUsuario;
    }

    public void setTipoUsuario(String tipoUsuario) {
        this.tipoUsuario = tipoUsuario;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
}

