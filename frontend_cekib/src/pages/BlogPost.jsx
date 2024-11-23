import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BlogPost = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Llamada al backend para obtener los datos de la publicación
        axios.get(`http://localhost:8080/blog/${id}`)
            .then((response) => {
                setPost(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error al cargar la publicación:", error);
                if (error.response && error.response.status === 404) {
                    setError("La publicación solicitada no existe.");
                } else {
                    setError("Hubo un error al cargar la publicación. Intenta nuevamente más tarde.");
                }
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <p className="text-center text-gray-500">Cargando publicación...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <div className="p-6">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-4xl font-bold mb-4">{post.titulo}</h1>
                <p className="text-sm text-gray-500 mb-4">
                    Publicado el: {new Date(post.fechaBlog).toLocaleDateString()}
                </p>
                <div className="text-lg text-gray-800 leading-relaxed">
                    {post.contenido}
                </div>
            </div>
        </div>
    );
};

export default BlogPost;