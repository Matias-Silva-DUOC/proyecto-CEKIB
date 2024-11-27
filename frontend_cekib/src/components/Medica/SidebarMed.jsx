import React, { Fragment } from 'react';
import { IoMenu } from "react-icons/io5";
import { MdOutlineLogin } from "react-icons/md";
import { Dialog, Transition } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import { FaFileMedicalAlt, FaNotesMedical, FaHandHoldingMedical } from "react-icons/fa";
import { ImBlog } from "react-icons/im";
import { FaHouseChimneyMedical } from "react-icons/fa6";
import Logo from "../../assets/img/logo.png";
import Profesional1 from "../../assets/img/Profesionales/prof1.jpg";

const navigation = [
    { name: 'Home', href: '/homemedico', icon: FaHouseChimneyMedical },
    { name: 'Blog', href: '/blogmedico', icon: ImBlog },
    { name: 'Consultas', href: '/consultas', icon: FaNotesMedical },
    { name: 'Tratamientos', href: '/tratamientos', icon: FaHandHoldingMedical },
];

const SidebarMed = ({ sidebarOpen, setSidebarOpen }) => {
    const navigate = useNavigate();

    const handleMenuItemClick = (item) => {
        if (item.name === 'Cerrar sesión') {
            localStorage.removeItem('authToken');
            sessionStorage.removeItem('userData');
            navigate('/login');
        } else {
            navigate(item.href);
        }
    };

    return (
        <>
            {/* Menu Hamburger Button */}
            <div className="lg:hidden fixed top-4 left-4 z-50">
                <button onClick={() => setSidebarOpen(true)}>
                    <IoMenu className="h-6 w-6 text-teal-400" aria-hidden="true" />
                </button>
            </div>

            {/* Mobile Sidebar */}
            <Transition show={sidebarOpen} as={Fragment}>
                <Dialog onClose={setSidebarOpen} className="relative z-50 lg:hidden">
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-900/80" />
                    </Transition.Child>
                    <div className="fixed inset-0 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative mr-16 flex h-full flex-1 border-r border-teal-400 bg-white w-32">
                                <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                    <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                                        <span className="sr-only">Cerrar sidebar</span>
                                        <IoMenu className="h-6 w-6 text-teal-400" aria-hidden="true" />
                                    </button>
                                </div>
                                <div className="flex grow flex-col gap-y-0 overflow-y-auto bg-white px-6 pb-2 w-32">
                                    <div className="flex justify-center mt-4 mb-6">
                                        <img className="h-8 w-auto" src={Logo} alt="Logo" />
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <img className="h-10 w-10 rounded-full" src={Profesional1} alt="User Profile" />
                                        <h3 className="text-sm font-semibold text-teal-400 mt-2">Tiare Castro</h3>
                                        <p className="text-xs text-gray-500">Kinesióloga</p>
                                    </div>
                                    <nav className="flex flex-1 flex-col">
                                        <ul className="flex-1 space-y-0">
                                            {navigation.map((item) => (
                                                <li key={item.name}>
                                                    <a
                                                        href={item.href}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleMenuItemClick(item);
                                                        }}
                                                        className="group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-gray-600 hover:text-teal-400 hover:bg-gray-100"
                                                    >
                                                        <item.icon className="h-6 w-6 text-teal-400" aria-hidden="true" />
                                                        {item.name}
                                                    </a>
                                                </li>
                                            ))}
                                            {/* Botón de cerrar sesión con estilos consistentes */}
                                            <li>
                                                <button
                                                    onClick={() => handleMenuItemClick({ name: 'Cerrar sesión' })}
                                                    className="flex gap-x-3 items-center text-sm font-semibold text-gray-600 hover:text-teal-400 hover:bg-gray-100 rounded-md p-2"
                                                >
                                                    <MdOutlineLogin className="h-6 w-6 text-teal-400" aria-hidden="true" />
                                                    <span className="text-sm">Cerrar sesión</span>
                                                </button>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>

            {/* Desktop Sidebar */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:z-45 lg:flex lg:flex-col border border-teal-400 rounded-lg m-2 w-32">
                <div className="flex grow flex-col gap-y-3 overflow-y-auto px-4">
                    <div className="mt-4 flex justify-center">
                        <img className="h-12 w-auto my-4" src={Logo} alt="Logo" />
                    </div>
                    <div className="flex flex-col items-center mb-4">
                        <img className="h-20 w-20 rounded-full" src={Profesional1} alt="User Profile" />
                        <h3 className="text-xs font-semibold text-teal-400 mt-2">Tiare Castro</h3>
                        <p className="text-xs text-gray-500">Kinesióloga</p>
                    </div>
                    <nav className="flex-1 flex flex-col items-center justify-start space-y-0">
                        <ul className="flex flex-col items-center space-y-1">
                            {navigation.map((item) => (
                                <li key={item.name}>
                                    <a
                                        href={item.href}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleMenuItemClick(item);
                                        }}
                                        className="group flex flex-col items-center gap-y-1 rounded-md p-2 text-xs font-semibold text-gray-600 hover:text-teal-400 hover:bg-gray-100"
                                    >
                                        <item.icon className="h-6 w-6 text-teal-400" aria-hidden="true" />
                                        <span>{item.name}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <button
                        onClick={() => handleMenuItemClick({ name: 'Cerrar sesión' })}
                        className="flex flex-col items-center text-xs font-semibold text-gray-600 hover:text-teal-400 hover:bg-gray-100 rounded-md p-2 mb-4"
                    >
                        <MdOutlineLogin className="h-6 w-6 text-teal-400" aria-hidden="true" />
                        <span>Cerrar sesión</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default SidebarMed;

