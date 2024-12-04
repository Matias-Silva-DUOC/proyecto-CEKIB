-- Poblar tabla usuario con 10 filas
INSERT INTO "usuario" ("id_usuario", "username", "password", "tipo_usuario")
VALUES
(1, 'admin', 'admin', 'administrador'),
(2, 'jcastr', 'cekib', 'profesional'),
(3, 'tcastr', 'cekib', 'profesional'),
(4, 'nrivas', 'cekib', 'profesional'),
(5, 'jsepul', 'cekib', 'profesional'),
(6, 'dbaeza', 'cekib', 'profesional'),
(7, 'dsilva', 'cekib', 'profesional'),
(8, 'agomez', 'cekib', 'profesional');

-- Poblar tabla profesional con datos de horario en formato JSON
INSERT INTO "profesional"
("rut_pro", "nombre_pro", "apellido_pro", "especialidad_pro", "correo_pro", "fono_pro", "horario", "recordatorio", "tipo_usuario", "id_usuario")
VALUES
('18087793-2', 'Jessamine', 'Castro', 'Kinesiología', 'jessamine.castro20@gmail.com', '56986548498',
'{
	"Lunes": { "inicio": "10:00", "fin": "19:00" },
	"Martes": { "inicio": "09:00", "fin": "20:00" },
	"Miércoles": { "inicio": "09:00", "fin": "19:00" },
	"Jueves": { "inicio": "09:00", "fin": "20:00" },
	"Viernes": { "inicio": "09:00", "fin": "19:00" }
}',
'Este es mi recordatorio', 'profesional', 2),

('18325499-5', 'Tiare', 'Castro', 'Kinesiología', 'tiarecastro.kine@gmail.com', '56948634832',
'{
	"Lunes": { "inicio": "10:00", "fin": "19:00" },
	"Martes": { "inicio": "09:00", "fin": "20:00" },
	"Miércoles": { "inicio": "09:00", "fin": "19:01" },
	"Jueves": { "inicio": "09:00", "fin": "20:00" },
	"Viernes": { "inicio": "09:00", "fin": "19:01" }
}',
'Este es mi recordatorio', 'profesional', 3),

('20631644-6', 'Nicolás', 'Rivas', 'Kinesiología Respiratoria', 'rivassoto12@gmail.com', '56990461238',
'{
	"Lunes": { "inicio": "10:00", "fin": "19:00" },
	"Martes": { "inicio": "09:00", "fin": "20:00" },
	"Miércoles": { "inicio": "09:00", "fin": "19:01" },
	"Jueves": { "inicio": "09:00", "fin": "20:00" },
	"Viernes": { "inicio": "09:00", "fin": "19:01" }
}',
'Este es mi recordatorio', 'profesional', 4),

('16562439-4', 'Johana', 'Sepúlveda', 'Kinesiología', 'j.sepulvedaneipan@gmail.com', '56992528810',
'{
	"Lunes": { "inicio": "10:00", "fin": "19:00" },
	"Martes": { "inicio": "09:00", "fin": "20:00" },
	"Miércoles": { "inicio": "09:00", "fin": "19:01" },
	"Jueves": { "inicio": "09:00", "fin": "20:00" },
	"Viernes": { "inicio": "09:00", "fin": "19:01" }
}',
'Este es mi recordatorio', 'profesional', 5),

('18294319-3', 'Daniela', 'Baeza', 'Masoterapia', 'danielabaciff@gmail.com', '56997439232',
'{
	"Viernes": { "inicio": "09:00", "fin": "19:00" }
}',
'Este es mi recordatorio', 'profesional', 6),

('19385455-9', 'Dagmar', 'Silva', 'Nutrición', 'nutri.dagmar@gmail.com', '56954919645',
'{
	"Martes": { "inicio": "09:00", "fin": "18:00" }
}',
'Este es mi recordatorio', 'profesional', 7),

('20420510-8', 'Almendra', 'Gómez', 'Terapia Ocupacional', 'almendragomez.to@gmail.com', '56954641220',
'{
	"Miércoles": { "inicio": "09:00", "fin": "19:00" }
}',
'Este es mi recordatorio', 'profesional', 8);


-- Poblar tabla paciente con 10 filas
INSERT INTO "paciente" ("rut_pac", "nombre_pac", "apellido_pac", "edad", "direccion", "correo_pac", "fono_pac", "ocupacion", "prevision")
VALUES
('13370488-4', 'Marcela' , 'Escobar', '38',  'Parroco Damián Acuña 1331, casa 53, Buin', '', '', 'Dueña de casa', ''),
('7390194-4', 'Elizabeth' , 'Barra', '66', 'Parroco Damián Acuña 1448, Buin', '', '', 'Dueña de Casa', ''),
('16543965-1', 'Ivonne' , 'Zúñiga', '37', 'Dolores Olano de Gracia 812, Buin', '', '', 'Terapeuta Ocupacional', ''),
('16750111-7', 'Camilo' , 'Castillo', '36', 'Miriam Gallerani 458, Buin', '', '', 'Arquitecto', ''),
('22449960-4', 'Maximiliano' , 'Valenzuela', '16', 'Juan Riquelme Bravo 1617, Buin', '', '', 'Estudiante', ''),
('17166885-9', 'Daissy' , 'Villagra', '35', 'Patricio Vega 893, Buin', '', '', 'Administrativa', ''),
('10970444-K', 'Rosa' , 'Roa', '54', 'Av. General Baquedano 1170, Paine', '', '', 'Dueña de Casa', ''),
('15782799-5', 'Paz' , 'Ramírez', '40', 'Cocinera Eliana Cerda 1416, Buin', '', '', 'Periodista', ''),
('12680108-4', 'Lucila' , 'Gutierrez', '49', 'Camilo Berrios Quintanilla 217, casa 29, Buin', '', '', 'Representante Insumos Médicos', ''),
('17872480-0', 'Patricia' , 'Alarcón', '33', 'Francisco Garate García 817, Buin', '', '', 'Administrativa', '')
;

-- Poblar tabla ficha con 10 filas
INSERT INTO "ficha" ("id_ficha", "fecha_ficha", "cirugias", "ejercicio", "alimentacion", "sueno", "habitos", "dolor", "expectativas", "rut_pac")
VALUES
(1, '2023-01-01', 'Ninguna', 'Caminar 3 veces por semana', 'Balanceada', '6 horas', 'Fuma ocasionalmente', 'Dolor lumbar', 'Mejorar postura', '13370488-4'),
(2, '2023-01-05', 'Cirugía en rodilla', 'Yoga semanal', 'Vegetariana', '8 horas', 'Ninguno', 'Dolor articular', 'Recuperar movilidad', '7390194-4'),
(3, '2023-01-10', 'Ninguna', 'Natación semanal', 'Omnívora', '6 horas', 'Bebe socialmente', 'Dolor cervical', 'Reforzar fuerza', '16543965-1'),
(4, '2023-01-15', 'Cirugía de columna', 'Ciclismo recreativo', 'Omnívora', '7 horas', 'Ninguno', 'Dolor lumbar', 'Reducir dolor', '16750111-7'),
(5, '2023-01-20', 'Fractura de tobillo', 'Ejercicios de estiramiento', 'Balanceada', '8 horas', 'Fuma ocasionalmente', 'Dolor articular', 'Mejorar equilibrio', '22449960-4'),
(6, '2023-01-25', 'Cirugía en brazo', 'Ejercicios con pesas ligeras', 'Vegana', '7 horas', 'Ninguno', 'Dolor muscular', 'Recuperar movilidad', '17166885-9'),
(7, '2023-01-30', 'Ninguna', 'Trotar semanalmente', 'Omnívora', '6 horas', 'Bebe socialmente', 'Dolor de rodilla', 'Fortalecer piernas', '10970444-K'),
(8, '2023-02-01', 'Cirugía de hombro', 'Pilates', 'Balanceada', '8 horas', 'Ninguno', 'Dolor de hombro', 'Recuperar fuerza', '15782799-5'),
(9, '2023-02-05', 'Ninguna', 'Caminatas diarias', 'Vegetariana', '7 horas', 'Fuma ocasionalmente', 'Dolor lumbar', 'Postura correcta', '12680108-4'),
(10, '2023-02-10', 'Cirugía de cadera', 'Ejercicios de resistencia', 'Omnívora', '6 horas', 'Ninguno', 'Dolor de cadera', 'Recuperar movilidad completa', '17872480-0');

-- Poblar tabla ficha_comorbilidad con 10 filas
INSERT INTO "ficha_comorbilidad" ("id_ficha", "id_com", "presenta")
VALUES
(1, 1, TRUE),
(2, 2, TRUE),
(3, 3, FALSE),
(4, 4, TRUE),
(5, 5, FALSE),
(6, 6, TRUE),
(7, 7, TRUE),
(8, 8, FALSE),
(9, 9, TRUE),
(10, 10, FALSE);

-- Poblar tabla comorbilidad con 10 filas
INSERT INTO "comorbilidad" ("id_com", "nombre_com", "categoria_com", "farmacos")
VALUES
(1, 'Hipertensión', 'Cardiovascular', 'Losartán'),
(2, 'Diabetes', 'Metabólica', 'Metformina'),
(3, 'Asma', 'Respiratoria', 'Salbutamol'),
(4, 'Artrosis', 'Musculoesquelética', 'Ibuprofeno'),
(5, 'Obesidad', 'Metabólica', 'Orlistat'),
(6, 'Ansiedad', 'Psicológica', 'Clonazepam'),
(7, 'Depresión', 'Psicológica', 'Sertralina'),
(8, 'Insuficiencia renal', 'Renal', 'Furosemida'),
(9, 'Artritis', 'Musculoesquelética', 'Metotrexato'),
(10, 'Hipotiroidismo', 'Endocrina', 'Levotiroxina');

-- Poblar tabla cita con 10 filas
INSERT INTO "cita" ("id_cita", "fecha_cita", "estado_cita", "rut_pac", "rut_pro")
VALUES
(1, '2024-01-01 10:00:00', 'Confirmada', '13370488-4', '18087793-2'),
(2, '2024-01-02 11:00:00', 'Pendiente', '7390194-4', '18294319-3'),
(3, '2024-01-03 09:30:00', 'Confirmada', '16543965-1', '18087793-2'),
(4, '2024-01-04 15:00:00', 'Cancelada', '16750111-7', '18087793-2'),
(5, '2024-01-05 16:00:00', 'Confirmada', '22449960-4', '18294319-3'),
(6, '2024-01-06 08:30:00', 'Confirmada', '17166885-9', '18325499-5'),
(7, '2024-01-07 13:00:00', 'Pendiente', '10970444-K', '18294319-3'),
(8, '2024-01-08 14:00:00', 'Confirmada', '15782799-5', '18325499-5'),
(9, '2024-01-09 17:00:00', 'Cancelada', '12680108-4', '19385455-9'),
(10, '2024-01-10 18:00:00', 'Confirmada', '17872480-0', '20420510-8');


-- Poblar tabla tratamiento con 10 filas
INSERT INTO "tratamiento" ("id_tratamiento", "tipo_tratamiento", "descripcion_tratamiento", "duracion_sesiones", "id_cita")
VALUES
(1, 'Rehabilitación', 'Fortalecer articulaciones post cirugía', 8, 1),
(2, 'Terapia física', 'Reducir dolor lumbar crónico', 6, 2),
(3, 'Terapia ocupacional', 'Recuperar movilidad de rodilla', 10, 3),
(4, 'Rehabilitación post-quirúrgica', 'Fortalecer columna vertebral', 12, 4),
(5, 'Fisioterapia deportiva', 'Prevenir lesiones recurrentes', 8, 5),
(6, 'Rehabilitación', 'Recuperación muscular tras fractura', 10, 6),
(7, 'Terapia física', 'Fortalecer músculos inferiores', 8, 7),
(8, 'Kinesiología', 'Recuperar fuerza en hombros', 6, 8),
(9, 'Kinesiología', 'Recuperar fuerza en piernas', 5, 9),
(10, 'Kinesiología Respiratoria', 'Recuperar fuerza', 3, 10);

-- Poblar tabla sesiones con 10 filas
INSERT INTO "sesiones" ("id_sesion", "nro_sesion", "fecha_sesion", "estado_sesion", "id_tratamiento")
VALUES
(1, 1, '2024-01-01 10:00:00', 'Realizada', 1),
(2, 2, '2024-01-02 11:00:00', 'Pendiente', 2),
(3, 1, '2024-01-03 09:30:00', 'Realizada', 3),
(4, 2, '2024-01-04 15:00:00', 'Pendiente', 4),
(5, 1, '2024-01-05 16:00:00', 'Cancelada', 5),
(6, 2, '2024-01-06 08:30:00', 'Realizada', 6),
(7, 1, '2024-01-07 13:00:00', 'Pendiente', 7),
(8, 2, '2024-01-08 14:00:00', 'Pendiente', 8),
(9, 1, '2024-01-09 17:00:00', 'Realizada', 9),
(10, 2, '2024-01-10 18:00:00', 'Realizada', 10);

-- Poblar tabla pago con 10 filas
INSERT INTO "pago" ("id_pago", "fecha_pago", "monto", "metodo_pago", "estado_pago", "descuento", "id_cita")
VALUES
(1, '2024-01-01', 50000, 'Efectivo', 'Completado', 0, 1),
(2, '2024-01-02', 45000, 'Transferencia', 'Pendiente', 5000, 2),
(3, '2024-01-03', 30000, 'Efectivo', 'Completado', 0, 3),
(4, '2024-01-04', 60000, 'Tarjeta', 'Pendiente', 10000, 4),
(5, '2024-01-05', 70000, 'Transferencia', 'Completado', 0, 5),
(6, '2024-01-06', 40000, 'Efectivo', 'Pendiente', 5000, 6),
(7, '2024-01-07', 35000, 'Tarjeta', 'Completado', 0, 7),
(8, '2024-01-08', 20000, 'Efectivo', 'Pendiente', 2000, 8),
(9, '2024-01-09', 80000, 'Transferencia', 'Completado', 0, 9),
(10, '2024-01-10', 45000, 'Efectivo', 'Pendiente', 5000, 10);

-- Poblar tabla blog con 10 filas
INSERT INTO "blog" ("id_blog", "titulo", "contenido", "fecha_blog", "foto", "id_usuario")
VALUES
(1, 'Beneficios del ejercicio', 'Cómo la actividad física ayuda a la salud.', '2023-12-01', NULL, 1),
(2, 'Posturas saludables', 'Mejora tu postura con estos consejos.', '2023-12-05', NULL, 2),
(3, 'Terapia manual', 'Qué esperar en una sesión de terapia manual.', '2023-12-10', NULL, 3),
(4, 'Dolor lumbar', 'Cómo aliviar el dolor lumbar en casa.', '2023-12-15', NULL, 4),
(5, 'Estiramientos', 'Guía de estiramientos para principiantes.', '2023-12-20', NULL, 5),
(6, 'Rehabilitación post-quirúrgica', 'Pasos para una recuperación efectiva.', '2023-12-25', NULL, 6),
(7, 'Ejercicios en casa', 'Cómo ejercitarse desde casa.', '2023-12-30', NULL, 7),
(8, 'Kinesiología deportiva', 'El impacto de la kinesiología en atletas.', '2024-01-01', NULL, 8),
(9, 'Lesiones comunes', 'Cómo evitar lesiones comunes al ejercitarse.', '2024-01-05', NULL, 4),
(10, 'Nutrición y ejercicio', 'La relación entre alimentación y rendimiento.', '2024-01-10', NULL, 1);
