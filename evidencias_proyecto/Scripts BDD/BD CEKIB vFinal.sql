CREATE TABLE "usuario" (
  "id_usuario" integer PRIMARY KEY,
  "username" varchar(64) NOT NULL,
  "password" varchar(64) NOT NULL,
  "tipo_usuario" varchar(64) NOT NULL
);

CREATE TABLE "profesional" (
  "rut_pro" varchar PRIMARY KEY,
  "nombre_pro" varchar(64) NOT NULL,
  "apellido_pro" varchar(64) NOT NULL,
  "especialidad_pro" varchar(64) NOT NULL,
  "correo_pro" varchar(64) NOT NULL,
  "fono_pro" varchar(64) NOT NULL,
  "horario" jsonb NOT NULL,
  "recordatorio" text NOT NULL,
  "tipo_usuario" varchar(64) NOT NULL,
  "id_usuario" integer UNIQUE
);

CREATE TABLE "horario_fijo" (
  "id_horario" integer PRIMARY KEY,
  "diasemana" varchar(64) NOT NULL,
  "horario_inicio" timestamp NOT NULL,
  "horario_fin" timestamp NOT NULL,
  "rut_pro" varchar UNIQUE
);

CREATE TABLE "blog" (
  "id_blog" integer PRIMARY KEY,
  "titulo" varchar(64) NOT NULL,
  "contenido" varchar(64) NOT NULL,
  "fecha_blog" timestamp NOT NULL,
  "foto" bytea,
  "id_usuario" integer UNIQUE
);

CREATE TABLE "cita" (
  "id_cita" integer PRIMARY KEY,
  "fecha_cita" timestamp NOT NULL,
  "estado_cita" varchar(64) NOT NULL,
  "rut_pac" varchar,
  "rut_pro" varchar
);

CREATE TABLE "pago" (
  "id_pago" integer PRIMARY KEY,
  "fecha_pago" timestamp NOT NULL,
  "monto" integer NOT NULL,
  "metodo_pago" varchar(64) NOT NULL,
  "estado_pago" varchar(64) NOT NULL,
  "descuento" integer,
  "id_cita" integer UNIQUE
);

CREATE TABLE "tratamiento" (
  "id_tratamiento" integer PRIMARY KEY,
  "tipo_tratamiento" varchar(64) NOT NULL,
  "descripcion_tratamiento" text NOT NULL,
  "duracion_sesiones" integer NOT NULL,
  "id_cita" integer UNIQUE
);

CREATE TABLE "sesiones" (
  "id_sesion" integer PRIMARY KEY,
  "nro_sesion" integer NOT NULL,
  "fecha_sesion" timestamp NOT NULL,
  "estado_sesion" varchar(64) NOT NULL,
  "id_tratamiento" integer UNIQUE
);

CREATE TABLE "paciente" (
  "rut_pac" varchar PRIMARY KEY,
  "nombre_pac" varchar(64) NOT NULL,
  "apellido_pac" varchar(64) NOT NULL,
  "edad" varchar(64) NOT NULL,
  "direccion" varchar(256) NOT NULL,
  "correo_pac" varchar(64) NOT NULL,
  "fono_pac" varchar(64) NOT NULL,
  "ocupacion" varchar(64) NOT NULL,
  "prevision" varchar(64) NOT NULL,
  "id_ficha" integer UNIQUE
);

CREATE TABLE "ficha" (
  "id_ficha" integer PRIMARY KEY,
  "fecha_ficha" timestamp NOT NULL,
  "cirugias" text NOT NULL,
  "ejercicio" text NOT NULL,
  "alimentacion" text NOT NULL,
  "sueno" text NOT NULL,
  "habitos" text NOT NULL,
  "dolor" text NOT NULL,
  "expectativas" text NOT NULL,
  "rut_pac" varchar UNIQUE
);

CREATE TABLE "ficha_comorbilidad" (
  "id_ficha" integer UNIQUE,
  "id_com" integer UNIQUE,
  "presenta" bool NOT NULL
);

CREATE TABLE "comorbilidad" (
  "id_com" integer PRIMARY KEY,
  "nombre_com" varchar(64) NOT NULL,
  "categoria_com" varchar(64) NOT NULL,  
  "farmacos" text
);

ALTER TABLE "profesional" ADD FOREIGN KEY ("id_usuario") REFERENCES "usuario" ("id_usuario");

ALTER TABLE "horario_fijo" ADD FOREIGN KEY ("rut_pro") REFERENCES "profesional" ("rut_pro");

ALTER TABLE "blog" ADD FOREIGN KEY ("id_usuario") REFERENCES "usuario" ("id_usuario");

ALTER TABLE "cita" ADD FOREIGN KEY ("rut_pac") REFERENCES "paciente" ("rut_pac");

ALTER TABLE "cita" ADD FOREIGN KEY ("rut_pro") REFERENCES "profesional" ("rut_pro");

ALTER TABLE "pago" ADD FOREIGN KEY ("id_cita") REFERENCES "cita" ("id_cita");

ALTER TABLE "tratamiento" ADD FOREIGN KEY ("id_cita") REFERENCES "cita" ("id_cita");

ALTER TABLE "sesiones" ADD FOREIGN KEY ("id_tratamiento") REFERENCES "tratamiento" ("id_tratamiento");

ALTER TABLE "ficha" ADD FOREIGN KEY ("rut_pac") REFERENCES "paciente" ("rut_pac");

ALTER TABLE "ficha_comorbilidad" ADD FOREIGN KEY ("id_ficha") REFERENCES "ficha" ("id_ficha");

ALTER TABLE "comorbilidad" ADD FOREIGN KEY ("id_com") REFERENCES "ficha_comorbilidad" ("id_com");

ALTER TABLE "blog" DROP CONSTRAINT "blog_id_usuario_key";
