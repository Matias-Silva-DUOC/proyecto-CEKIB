import React, { useState } from 'react';
import { FaPlus, FaPencilAlt, FaSearch } from 'react-icons/fa';

export function CrudBlog() {
    const [showCheckboxes, setShowCheckboxes] = useState(false); // Estado para mostrar los checkboxes

    const handleDeleteClick = () => {
        setShowCheckboxes(!showCheckboxes); // Alternar visibilidad de los checkboxes
    };

    return (
        <div className="mx-auto p-6 rounded">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl text-teal-400 font-semibold">Blogs más recientes</h1>
                <button className="border border-teal-400 bg-white text-teal-400 px-4 py-2 rounded flex items-center transition duration-200 ease-in-out hover:bg-teal-400 hover:text-white">
                    <FaPlus className="mr-2" /> Crear nuevo blog
                </button>
            </div>

            {/* Search Bar */}
            <div className="flex justify-end mb-4">
                <div className="flex items-center">
                    <span className="mr-2">Search in:</span>
                    <select className="border border-gray-300 rounded px-2 py-1 mr-2">
                        <option>Título</option>
                        <option>Fecha</option>
                    </select>
                    <input type="text" className="border border-gray-300 rounded px-2 py-1 mr-2" />
                    <button className="border border-teal-400 bg-teal-400 text-white px-4 py-1 rounded flex items-center transition duration-200 ease-in-out hover:bg-white hover:text-teal-400 hover:border-teal-400">
                        <FaSearch className="mr-2" /> Search
                    </button>
                </div>
            </div>

            {/* Table */}
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2 text-left">Editar</th>
                        <th className="border p-2 text-left">Fotos</th>
                        <th className="border p-2 text-left">Titulo</th>
                        <th className="border p-2 text-left">Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Row 1 */}
                    <tr className="border-t">
                        <td className="border p-2 flex items-center">
                            {showCheckboxes && (
                                <input type="checkbox" className="mr-2 text-teal-400" />
                            )}
                            <div className="flex items-center justify-center border border-teal-400 bg-white rounded-full w-8 h-8 m-2">
                                <FaPencilAlt className="text-teal-400" />
                            </div>
                        </td>
                        <td className="border p-2">
                            <div className="flex space-x-2">
                                <img src="https://placehold.co/100x100" alt="Image of a church in Andorra" className="w-16 h-16 object-cover" />
                                <img src="https://placehold.co/100x100" alt="Image of a mountain in Andorra" className="w-16 h-16 object-cover" />
                            </div>
                            <a href="#" className="text-blue-500">Add New or Edit</a>
                        </td>
                        <td className="border p-2">Travel in Andorra</td>
                        <td className="border p-2">22/08/19 15:30</td>
                    </tr>
                    {/* Row 2 */}
                    <tr className="border-t">
                        <td className="border p-2 flex items-center">
                            {showCheckboxes && (
                                <input type="checkbox" className="mr-2 text-teal-400" />
                            )}
                            <div className="flex items-center justify-center border border-teal-400 bg-white rounded-full w-8 h-8 m-2">
                                <FaPencilAlt className="text-teal-400" />
                            </div>
                        </td>
                        <td className="border p-2">
                            <div className="flex space-x-2">
                                <img src="https://placehold.co/100x100" alt="Image of a lighthouse in Azores" className="w-16 h-16 object-cover" />
                                <img src="https://placehold.co/100x100" alt="Image of a coastline in Azores" className="w-16 h-16 object-cover" />
                            </div>
                            <a href="#" className="text-blue-500">Add New or Edit</a>
                        </td>
                        <td className="border p-2">Azores Islands - the wildest Portugal</td>
                        <td className="border p-2">22/08/19 11:39</td>
                    </tr>
                    <tr className="border-t">
                        <td className="border p-2 flex items-center">
                            {showCheckboxes && (
                                <input type="checkbox" className="mr-2 text-teal-400" />
                            )}
                            <div className="flex items-center justify-center border border-teal-400 bg-white rounded-full w-8 h-8 m-2">
                                <FaPencilAlt className="text-teal-400" />
                            </div>
                        </td>
                        <td className="border p-2">
                            <div className="flex space-x-2">
                                <img src="https://placehold.co/100x100" alt="Image of a lighthouse in Azores" className="w-16 h-16 object-cover" />
                                <img src="https://placehold.co/100x100" alt="Image of a coastline in Azores" className="w-16 h-16 object-cover" />
                            </div>
                            <a href="#" className="text-blue-500">Add New or Edit</a>
                        </td>
                        <td className="border p-2">Azores Islands - the wildest Portugal</td>
                        <td className="border p-2">22/08/19 11:39</td>
                    </tr>
                    <tr className="border-t">
                        <td className="border p-2 flex items-center">
                            {showCheckboxes && (
                                <input type="checkbox" className="mr-2 text-teal-400" />
                            )}
                            <div className="flex items-center justify-center border border-teal-400 bg-white rounded-full w-8 h-8 m-2">
                                <FaPencilAlt className="text-teal-400" />
                            </div>
                        </td>
                        <td className="border p-2">
                            <div className="flex space-x-2">
                                <img src="https://placehold.co/100x100" alt="Image of a lighthouse in Azores" className="w-16 h-16 object-cover" />
                                <img src="https://placehold.co/100x100" alt="Image of a coastline in Azores" className="w-16 h-16 object-cover" />
                            </div>
                            <a href="#" className="text-blue-500">Add New or Edit</a>
                        </td>
                        <td className="border p-2">Azores Islands - the wildest Portugal</td>
                        <td className="border p-2">22/08/19 11:39</td>
                    </tr>
                </tbody>
            </table>

            {/* Delete Button */}
            <button className="bg-red-600 text-white px-4 py-2 rounded mt-4" onClick={handleDeleteClick}>
                Delete
            </button>
        </div>
    );
}

