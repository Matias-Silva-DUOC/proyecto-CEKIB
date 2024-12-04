import React, { useState, useEffect, act } from "react";
import { Card, Typography } from "@material-tailwind/react";
import { FaPencilAlt } from "react-icons/fa";
import "./Modalstyle.css";

const PRO_URL = "http://localhost:8080/profesionales/";



// Modal
const Modal = ({ profesional, onSave, onClose, isOpen }) => {
    const [editarProf, setEditarProf] = useState(profesional);

    useEffect(() => {
        if (profesional && isOpen) {
            setEditarProf({
                rut: profesional.rut,
                name: profesional.name,
                job: profesional.job,
                tel: profesional.tel,
                email: profesional.email,
                //horario: profesional.horario
            });
        }
    }, [profesional, isOpen]);

    const actualizar = (e) => {
        const { rut, value } = e.target;
        setEditarProf((prev) => ({
            ...prev,
            [rut]: rut === 'horario' ? JSON.parse(value || '{}') : value,
        }));
    };

    const guardado = () => {
        onSave(editarProf);
    };

    if (isOpen) return null;

    return (<div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2> <Typography variant="lead" color="blue-gray" className="font-normal">Editar Profesional</Typography> </h2>
            <Card>
                <form>
                    <div>
                        <label> Rut: </label>
                        <input className="input-txt"
                            type="text"
                            name="rut"
                            value={editarProf.rut || ""}
                            onChange={actualizar}
                        />
                    </div>
                    <div>
                        <label> Nombre: </label>
                        <input className="input-txt"
                            type="text"
                            name="name"
                            value={editarProf.name || ""}
                            onChange={actualizar}
                        />
                    </div>
                    <div>
                        <label> Especialidad: </label>
                        <input className="input-txt"
                            type="text"
                            name="job"
                            value={editarProf.job || ""}
                            onChange={actualizar}
                        />
                    </div>
                    <div>
                        <label> Teléfono: </label>
                        <input className="input-txt"
                            type="text"
                            name="tel"
                            value={editarProf.tel || ""}
                            onChange={actualizar}
                        />
                    </div>
                    <div>
                        <label> Correo: </label>
                        <input className="input-txt"
                            type="text"
                            name="email"
                            value={editarProf.email || ""}
                            onChange={actualizar}
                        />
                    </div>

                    <div>
                        <label> Horario: </label>
                        <input className="input-txt"
                            type="text"
                            name="horario"
                            value={JSON.stringify(editarProf.horario || {})}
                            onChange={actualizar}
                        />
                    </div>

                    <div>
                        <button type="button" className="guardar-btn" onClick={guardado}> Guardar Cambios </button>

                        <button type="button" className="cancel-btn" onClick={onClose}> Cancelar </button>
                    </div>

                </form>
            </Card>
        </div>
    </div>
    );
};


export function TablaProfesionales() {

    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [profesionales, setProfesionales] = useState([]);

    const [editar, setEditar] = useState(false);
    const [nProfesional, setNProfesional] = useState(null);

    const clickEditar = (profesional) => {
        console.log("Editando Profesional:", profesional);

        if (profesional) {
            setNProfesional(profesional);
            setEditar(true);
        } else {
            console.error("Error: Datos de profesional inválidos o nulos.")
        }
    }

    const cerrarModal = () => {
        setEditar(false);
        setNProfesional(null);
    }

    const guardado = (guardarProfesional) => {
        console.log('Guardando profesional:', guardarProfesional)

        if (!guardarProfesional.rut) {
            console.error('Falta RUT profesional');
            return;
        }
        /*
        setProfesionales((profPrevio)=>
            profPrevio.map((profesional)  =>
                profesional.rut === guardarProfesional.rut ? guardarProfesional : profesional
            )
        );
        setEditar(false);
        setNProfesional(null);
        */
        fetch('http://localhost:8080/profesionales/${guardarProfesional.rut}', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(guardarProfesional),
        })
            .then(() => {
                setProfesionales((profPrevio) =>
                    profPrevio.map((profesional) =>
                        profesional.rut === guardarProfesional.rut ? guardarProfesional : profesional)
                );
                cerrarModal();
            })
            .catch((error) => {
                console.error('Error al guardar Profesional:', error)
            });
    };


    useEffect(() => {

        fetch(PRO_URL)
            .then(response => {
                if (!response.ok) {
                    console.log('Error al cargar profesionales')
                }
                return response.json();
            })
            .then(data => {
                setProfesionales(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            })
    }, []);

    if (loading) {
        return <div>---Cargando---</div>;
    }
    if (error) {
        console.log('Error:', { error })
        return <div>Error: {error}</div>;
    }


    const TABLE_HEAD = ["Nombre", "Especialidad", "Teléfono", "Correo", "Horario", "Editar"];

    const TABLE_ROWS = profesionales.map(profesional => ({
        rut: profesional.rutPro,
        name: profesional.nombrePro,
        job: profesional.especialidadPro,
        horario: profesional.horario,
        email: profesional.correoPro,
        tel: profesional.fonoPro,

    }));

    return (


        <div>
            <Card className="h-full w-full overflow-scroll">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {TABLE_ROWS.map(({ rut, name, job, horario, email, tel }, index) => {
                            const isLast = index === TABLE_ROWS.length - 1;
                            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                            return (
                                <tr key={rut}>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {name}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {job}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {tel}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {email}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {horario ? JSON.stringify(horario) : "N/A"}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <a className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-teal-400 bg-white text-teal-400" >
                                            <FaPencilAlt />
                                            <button onClick={() => clickEditar({ rut, name, job, horario, email, tel })}> Editar </button>
                                        </a>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {editar && nProfesional && (
                    <Modal profesional={nProfesional} onSave={guardado} onClose={cerrarModal}> </Modal>
                )}
            </Card>
        </div>
    );
};
