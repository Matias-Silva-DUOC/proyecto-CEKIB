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
        axios
            .get("http://localhost:8080/blog")
            .then((response) => {
                setPosts(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error al obtener los blogs:", error);
                setError("Hubo un error al cargar las publicaciones. Intenta nuevamente más tarde.");
                setLoading(false);
            });
    }, []);

    return (
        <>
            <StickyNavbar />
            <div className="mt-28">
                <ContactInfo />
                <div className="blog-page p-6">
                    <h1 className="text-2xl text-deep-purple-300 font-bold text-center mb-6">¡Revisa nuestros Blogs!</h1>
                    {loading ? (
                        <p className="text-center text-gray-500">Cargando publicaciones...</p>
                    ) : error ? (
                        <p className="text-center text-red-500">{error}</p>
                    ) : posts.length === 0 ? (
                        <p className="text-center text-gray-500">No hay publicaciones disponibles en este momento.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map((post) => (
                            <div
                                key={post.id_blog}
                                className="bg-white shadow-md rounded-lg border border-teal-400 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                                onClick={() => navigate(`/blog/${post.id_blog}`)}
                            >
                                {post.imagePath && (
                                    <img
                                        src={`http://localhost:8080/blog/uploads/${post.imagePath.split('/').pop()}`}
                                        alt={post.titulo}
                                        className="w-full h-36 object-cover"
                                    />
                                )}
                                <div className="p-4">
                                    <h2 className="text-lg font-semibold text-teal-600">{post.titulo}</h2>
                                    <p className="text-gray-600 mt-2 text-sm line-clamp-2">{post.contenido}</p>
                                    <p className="text-gray-400 mt-4 text-xs">
                                        {post.fecha_blog
                                            ? new Date(post.fecha_blog).toLocaleDateString()
                                            : "Sin fecha"}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    )}
                </div>
                <FooterWithLogo />
            </div>
        </>
    );
};

export default Blog;