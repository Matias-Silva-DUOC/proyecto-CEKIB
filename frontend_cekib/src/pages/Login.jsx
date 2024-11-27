import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Input, Button } from "@material-tailwind/react";
import Fondo from "../assets/img/fondo.jpg";
import Logo from "../assets/img/logo.png";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/users", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const users = await response.json();
                const user = users.find(
                    (u) => u.username === username && u.password === password
                );

                if (user) {
                    // Redirigir según el tipo de usuario
                    if (user.tipoUsuario === "administrador") {
                        navigate("/homeadmin");
                    } else if (user.tipoUsuario === "profesional") {
                        navigate("/homemedico", { state: { idUsuario: user.idUsuario } });
                    }
                } else {
                    alert("Usuario o contraseña incorrectos");
                }
            } else {
                console.error("Error al obtener los usuarios");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen">
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50">
                <img
                    className="w-full h-full object-cover"
                    src={Fondo}
                    alt="fondo"
                />
            </div>

            <div className="bg-white border border-blue-gray-200 rounded shadow-lg">
                <Card className="flex flex-col items-center bg-white  p-12">
                    <img
                        className="h-32 w-auto mb-4"
                        src={Logo}
                        alt="Logo CEKIB"
                    />
                    <h1 className="text-teal-400 text-3xl text-center">
                        Acceso
                    </h1>
                    <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
                        <div className="mb-1 flex flex-col gap-6">
                            <h6 className="text-teal-400 -mb-3 text-left text-bold">
                                Usuario:
                            </h6>
                            <Input
                                size="lg"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Usuario"
                                className="!border-teal-400 !rounded-lg focus:!border-teal-400"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                            />
                            <h6 className="text-teal-400 -mb-3 text-left text-bold">
                                Contraseña:
                            </h6>
                            <Input
                                size="lg"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="********"
                                className="!border-teal-400 !rounded-lg focus:!border-teal-400"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                            />
                        </div>

                        <Button className="mt-6 bg-deep-purple-300 text-white" type="submit" fullWidth>
                            Ingresar
                        </Button>
                    </form>
                </Card>
            </div>
        </div>
    );
}
