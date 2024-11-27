import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

export function CrudBlog() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingBlog, setEditingBlog] = useState(null);
    const [formData, setFormData] = useState({ titulo: "", contenido: "", imagen: null });
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fileInputRef = useRef(null); // Ref para el campo de archivo

    const API_URL = "http://localhost:8080/blog";

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const response = await axios.get(API_URL);
            const sortedBlogs = response.data.sort((a, b) => b.id_blog - a.id_blog); // Orden descendente
            setBlogs(sortedBlogs);
        } catch (err) {
            setError("No se pudieron cargar los blogs.");
        } finally {
            setLoading(false);
        }
    };


    const validateForm = () => {
        const errors = {};
        if (!formData.titulo || formData.titulo.length > 64) {
            errors.titulo = "El título es obligatorio y no puede superar los 64 caracteres.";
        }
        if (!formData.contenido) {
            errors.contenido = "El contenido es obligatorio.";
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, imagen: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        const formDataToSend = new FormData();
        formDataToSend.append("titulo", formData.titulo);
        formDataToSend.append("contenido", formData.contenido);
        if (formData.imagen) {
            formDataToSend.append("imagen", formData.imagen);
        }

        try {
            if (editingBlog) {
                await axios.put(`${API_URL}/${editingBlog.id_blog}`, formDataToSend, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            } else {
                await axios.post(API_URL, formDataToSend, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            }
            fetchBlogs();
            resetForm();
        } catch (err) {
            setError("Hubo un error al guardar el blog.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEdit = (blog) => {
        setEditingBlog(blog);
        setFormData({ titulo: blog.titulo, contenido: blog.contenido, imagen: null });
    };

    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de que quieres eliminar este blog?")) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id_blog !== id));
            } catch (err) {
                setError("Hubo un error al eliminar el blog.");
            }
        }
    };

    const resetForm = () => {
        setEditingBlog(null);
        setFormData({ titulo: "", contenido: "", imagen: null });
        setFormErrors({});
        if (fileInputRef.current) {
            fileInputRef.current.value = ""; // Limpia el campo de archivo
        }
    };

    if (loading) return <p>Cargando blogs...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="mx-auto p-6 flex flex-col h-screen">
            <h1 className="text-3xl font-bold text-center mb-6">Gestión de Blogs</h1>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 shadow-md rounded-lg border">
                <h2 className="text-xl font-semibold mb-4">{editingBlog ? "Editar Blog" : "Crear Blog"}</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium">Título:</label>
                    <input
                        type="text"
                        name="titulo"
                        value={formData.titulo}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                        placeholder="Ingresa el título del blog"
                        required
                    />
                    {formErrors.titulo && <p className="text-red-500 text-sm">{formErrors.titulo}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium">Contenido:</label>
                    <textarea
                        name="contenido"
                        value={formData.contenido}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                        placeholder="Escribe el contenido del blog"
                        required
                    ></textarea>
                    {formErrors.contenido && <p className="text-red-500 text-sm">{formErrors.contenido}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium">Imagen:</label>
                    <input
                        type="file"
                        name="imagen"
                        ref={fileInputRef} // Referencia para limpiar el archivo
                        onChange={handleFileChange}
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                    />
                </div>
                <button
                    type="submit"
                    className={`bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition ${isSubmitting && "opacity-50 cursor-not-allowed"
                        }`}
                    disabled={isSubmitting}
                >
                    {editingBlog ? "Actualizar Blog" : "Crear Blog"}
                </button>
                {editingBlog && (
                    <button
                        type="button"
                        onClick={resetForm}
                        className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                    >
                        Cancelar
                    </button>
                )}
            </form>

            {/* Tabla */}
            <div className="flex-grow overflow-y-auto border border-gray-300 rounded-md shadow-md">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2 text-left">ID</th>
                            <th className="border p-2 text-left">Título</th>
                            <th className="border p-2 text-left max-w-[400px] truncate">Contenido</th>
                            <th className="border p-2 text-left">Fecha</th>
                            <th className="border p-2 text-left">Imagen</th>
                            <th className="border p-2 text-left">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.map((blog) => (
                            <tr key={blog.id_blog} className="hover:bg-gray-50">
                                <td className="border p-2">{blog.id_blog}</td>
                                <td className="border p-2">{blog.titulo}</td>
                                <td
                                    className="border p-2 max-w-[400px] truncate overflow-hidden"
                                    title={blog.contenido}
                                >
                                    {blog.contenido}
                                </td>
                                <td className="border p-2">
                                    {blog.fecha_blog ? new Date(blog.fecha_blog).toLocaleDateString() : "Sin fecha"}
                                </td>
                                <td className="border p-2 text-center">
                                    {blog.imagePath ? (
                                        <img
                                            src={`http://localhost:8080/blog/uploads/${blog.imagePath.split("/").pop()}`}
                                            alt="Blog"
                                            className="w-12 h-12 object-cover rounded"
                                        />
                                    ) : (
                                        "Sin imagen"
                                    )}
                                </td>
                                <td className="border p-2 flex space-x-2">
                                    <button
                                        onClick={() => handleEdit(blog)}
                                        className="text-blue-500 hover:text-blue-700"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(blog.id_blog)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};