import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { StickyNavbar } from "../components/Base/StickyNavbar";
import { ContactInfo } from "../components/Base/ContactInfo";
import { FooterWithLogo } from "../components/Base/FooterWithLogo";

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Llamada al backend para obtener las publicaciones
        axios.get("http://localhost:8080/blog")
            .then((response) => {
                setPosts(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error al obtener los blogs:", error);
                setError("Hubo un error al cargar las publicaciones. Intenta nuevamente mÃ¡s tarde.");
                setLoading(false);
            });
    }, []);

    return (
        <>
            <StickyNavbar />
            <div className="mt-28">
                <ContactInfo />
                <div className="blog-page p-6">
                    <h1 className="text-4xl font-bold text-center mb-6">Listado de Blogs</h1>
                    {loading ? (
                        <p className="text-center text-gray-500">Cargando publicaciones...</p>
                    ) : error ? (
                        <p className="text-center text-red-500">{error}</p>
                    ) : posts.length === 0 ? (
                        <p className="text-center text-gray-500">No hay publicaciones disponibles en este momento.</p>
                    ) : (
                        <ul className="list-disc list-inside">
                            {posts.map((post) => (
                                <li
                                    key={post.idBlog}
                                    className="text-lg text-teal-700 hover:underline cursor-pointer"
                                    onClick={() => navigate(`/blog/${post.idBlog}`)}
                                >
                                    {post.titulo}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <FooterWithLogo />
            </div>
        </>
    );
};

export default Blog;