import React from "react";
import { Card, Typography } from "@material-tailwind/react";
import { FaPencilAlt } from "react-icons/fa";

export function TablaProfesionales() {
    const TABLE_HEAD = ["Nombre", "Especialidad", "Teléfono", "Correo", "Horario", "Editar"];

    const TABLE_ROWS = [
        {
            name: "Tiare Castro Correa",
            job: "Co-fundadora | Kinesióloga",
            horario: "23/04/18",
            email: "tcastro@cekib.cl",
            tel: "N/A",
        },
        {
            name: "Jessamine Castro Novoa",
            job: "Co-fundadora | Kinesióloga",
            horario: "23/04/18",
            email: "jcastro@cekib.cl",
            tel: "N/A",
        },
        {
            name: "Daniela Baeza C.",
            job: "Masoterapeuta",
            horario: "19/09/17",
            email: "dbaeza@cekib.cl",
            tel: "N/A",
        },
        {
            name: "Dagmar Vallejos Silva",
            job: "Nutricionista",
            horario: "24/12/08",
            email: "dvallejos@cekib.cl",
            tel: "N/A",
        },
        {
            name: "Fabiola Madrid Rojas",
            job: "Terapeuta Ocupacional",
            horario: "04/10/21",
            email: "fmadrid@cekib.cl",
            tel: "N/A",
        },
        {
            name: "Karen Espinoza Chavez",
            job: "Kinesióloga",
            horario: "12/06/20",
            email: "kespinoza@cekib.cl",
            tel: "N/A",
        },
        {
            name: "Nicolás Rivas Soto",
            job: "Kinesiólogo",
            horario: "15/02/19",
            email: "nrivas@cekib.cl",
            tel: "N/A",
        },
        {
            name: "Johana Sépulveda Neipan",
            job: "Kinesióloga",
            horario: "05/11/22",
            email: "jsepulveda@cekib.cl",
            tel: "N/A",
        },
    ];

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
                        {TABLE_ROWS.map(({ name, job, horario, email, tel }, index) => {
                            const isLast = index === TABLE_ROWS.length - 1;
                            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                            return (
                                <tr key={name}>
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
                                            {horario}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <a href="#" className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-teal-400 bg-white text-teal-400">
                                            <FaPencilAlt />
                                        </a>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </Card>
        </div>
    );
};