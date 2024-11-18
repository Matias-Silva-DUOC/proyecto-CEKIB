package entities;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;

@Entity
@Table(name = "profesional")
public class Profesional extends PanacheEntityBase {

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

    @Column(name = "horario", length = 64)
    private String horario;

    @Column(name = "recordatorio", length = 64)
    private String recordatorio;

    @Column(name = "tipo_usuario", nullable = false, length = 64)
    private String tipoUsuario;

    @OneToOne
    @JoinColumn(name = "id_usuario", referencedColumnName = "id_usuario", unique = true)
    private Usuario usuario;

    // Constructor vacío
    public Profesional() {}

    // Constructor completo
    public Profesional(String rutPro, String nombrePro, String apellidoPro, String especialidadPro, String correoPro,
                       String fonoPro, String horario, String recordatorio, String tipoUsuario, Usuario usuario) {
        this.rutPro = rutPro;
        this.nombrePro = nombrePro;
        this.apellidoPro = apellidoPro;
        this.especialidadPro = especialidadPro;
        this.correoPro = correoPro;
        this.fonoPro = fonoPro;
        this.horario = horario;
        this.recordatorio = recordatorio;
        this.tipoUsuario = tipoUsuario;
        this.usuario = usuario;
    }

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

    public String getHorario() {
        return horario;
    }

    public void setHorario(String horario) {
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
