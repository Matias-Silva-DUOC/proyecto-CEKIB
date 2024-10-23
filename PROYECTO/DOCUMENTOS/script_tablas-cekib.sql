-- DROP TABLE IF EXISTS public.paciente;
-- DROP TABLE IF EXISTS public.profesional;
-- DROP TABLE IF EXISTS public.cita;
-- DROP TABLE IF EXISTS public.evaluacion;
-- DROP TABLE IF EXISTS public.tratamiento;
-- DROP TABLE IF EXISTS public.pago;

CREATE TABLE IF NOT EXISTS public.paciente
(
    id_paciente integer NOT NULL,
    nombre_paciente character varying(64) COLLATE pg_catalog."default" NOT NULL,
    fecha_nac date NOT NULL,
    genero character varying(16) COLLATE pg_catalog."default",
    fono_paciente character varying(16) COLLATE pg_catalog."default" NOT NULL,
    email_pac character varying(64) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT paciente_pkey PRIMARY KEY (id_paciente)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.paciente
    OWNER to admin;



CREATE TABLE IF NOT EXISTS public.profesional
(
    id_profesional integer NOT NULL,
    nombre_profesional character varying(64) COLLATE pg_catalog."default" NOT NULL,
    especialidad character varying(64) COLLATE pg_catalog."default" NOT NULL,
    fono_profesional character varying(64) COLLATE pg_catalog."default" NOT NULL,
    email_profesional character varying(64) COLLATE pg_catalog."default" NOT NULL,
    horario_atencion character varying(64) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT profesional_pkey PRIMARY KEY (id_profesional)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.profesional
    OWNER to admin;



CREATE TABLE IF NOT EXISTS public.cita
(
    id_cita integer NOT NULL,
    id_paciente integer NOT NULL,
    id_profesional integer NOT NULL,
    fecha_cita date NOT NULL,
    hora_cita time without time zone NOT NULL,
    estado_cita character varying(24) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT cita_pkey PRIMARY KEY (id_cita),
    CONSTRAINT id_paciente FOREIGN KEY (id_paciente)
        REFERENCES public.paciente (id_paciente) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID,
    CONSTRAINT id_profesional FOREIGN KEY (id_profesional)
        REFERENCES public.profesional (id_profesional) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.cita
    OWNER to admin;




CREATE TABLE IF NOT EXISTS public.evaluacion
(
    id_evaluacion integer NOT NULL,
    id_paciente integer NOT NULL,
    id_profesional integer NOT NULL,
    fecha_ev date NOT NULL,
    motivo character varying(64) COLLATE pg_catalog."default" NOT NULL,
    ev_fisica text COLLATE pg_catalog."default",
    CONSTRAINT evaluacion_pkey PRIMARY KEY (id_evaluacion),
    CONSTRAINT id_paciente FOREIGN KEY (id_paciente)
        REFERENCES public.paciente (id_paciente) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT id_profesional FOREIGN KEY (id_profesional)
        REFERENCES public.profesional (id_profesional) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.evaluacion
    OWNER to admin;



CREATE TABLE IF NOT EXISTS public.tratamiento
(
    id_tratamiento integer NOT NULL,
    id_evaluacion integer NOT NULL,
    descripcion_trat character varying(128) COLLATE pg_catalog."default" NOT NULL,
    sesiones_prog integer NOT NULL,
    sesiones_completas integer NOT NULL,
    observaciones character varying(320) COLLATE pg_catalog."default",
    CONSTRAINT id_tratamiento PRIMARY KEY (id_tratamiento),
    CONSTRAINT id_evaluacion FOREIGN KEY (id_evaluacion)
        REFERENCES public.evaluacion (id_evaluacion) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.tratamiento
    OWNER to admin;



CREATE TABLE IF NOT EXISTS public.pago
(
    id_pago integer NOT NULL,
    id_paciente integer NOT NULL,
    id_tratamiento integer NOT NULL,
    fecha_pago date NOT NULL,
    monto_pago integer NOT NULL,
    metodo_pago character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT pago_pkey PRIMARY KEY (id_pago),
    CONSTRAINT id_paciente FOREIGN KEY (id_paciente)
        REFERENCES public.paciente (id_paciente) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT id_tratamiento FOREIGN KEY (id_tratamiento)
        REFERENCES public.tratamiento (id_tratamiento) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.pago
    OWNER to admin;