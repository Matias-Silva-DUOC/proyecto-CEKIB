import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { StickyNavbar } from "../components/Base/StickyNavbar";
import { ContactInfo } from "../components/Base/ContactInfo";
import { FooterWithLogo } from "../components/Base/FooterWithLogo";

const BlogPost = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/blog/${id}`);
                setPost(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error al cargar la publicación:", error);
                if (error.response && error.response.status === 404) {
                    setError("La publicación solicitada no existe.");
                } else {
                    setError("Hubo un error al cargar la publicación. Intenta nuevamente más tarde.");
                }
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    if (loading) {
        return (
            <>
                <StickyNavbar />
                <div className="mt-28">
                    <ContactInfo />
                    <p className="text-center text-gray-500">Cargando publicación...</p>
                </div>
                <FooterWithLogo />
            </>
        );
    }

    if (error) {
        return (
            <>
                <StickyNavbar />
                <div className="mt-28">
                    <ContactInfo />
                    <p className="text-center text-red-500">{error}</p>
                </div>
                <FooterWithLogo />
            </>
        );
    }

    return (
        <>
            <StickyNavbar />
            <div className="mt-28">
                <ContactInfo />
                <div className="p-6 bg-gray-100 min-h-screen">
                    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                        {/* Imagen destacada */}
                        {post.imagePath && (
                            <img
                                src={`http://localhost:8080/blog/uploads/${post.imagePath.split("/").pop()}`}
                                alt={post.titulo}
                                className="w-full h-64 object-cover"
                            />
                        )}
                        <div className="p-6">
                            <h1 className="text-4xl font-bold mb-4 text-gray-800">{post.titulo}</h1>
                            <p className="text-sm text-gray-500 mb-6">
                                Publicado el: {new Date(post.fecha_blog).toLocaleDateString()}
                            </p>
                            <div className="text-lg text-gray-800 leading-relaxed">
                                {post.contenido}
                            </div>
                        </div>
                    </div>
                </div>
                <FooterWithLogo />
            </div>
        </>
    );
};

export default BlogPost;