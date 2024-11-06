import LogoT from "../../assets/img/logot.png";
import { FaUser, FaWhatsapp, FaFacebook, FaInstagram } from "react-icons/fa";

export function FooterWithLogo() {
    return (
        <footer className="w-full bg-white py-2 px-2 sm:px-10">
            <div className="text-center py-2">
                <div className="flex justify-center items-center mb-4">
                    <img src={LogoT} alt="logo-ct" className="w-32" />
                </div>
                <div className="text-xs mb-4">
                    <p className="flex justify-center items-center">
                        📍 Profesora Julieta Valenzuela 602, Buin
                        <span className="mx-2">|</span>
                        📅 Lunes a Viernes de 9:00 a 19:00
                    </p>
                    <p className="flex justify-center items-center">
                        📞 Contacto:
                        <span className="ml-1">
                            <a href="tel:+56945971970" className="text-teal-400 hover:underline">+56 9 4597 1970</a>
                        </span>
                        <span className="mx-2">|</span>
                        📧 Correo:
                        <span className="ml-1">
                            <a href="mailto:cekib.cl@gmail.com" className="text-teal-400 hover:underline">cekib.cl@gmail.com</a>
                        </span>
                    </p>
                </div>
                <div className="flex justify-center space-x-4 mb-4">
                    <a href="https://api.whatsapp.com/send?phone=56945971970" className="text-teal-600 text-xl hover:text-teal-800 transition duration-200" target="_blank" rel="noopener noreferrer">
                        <FaWhatsapp />
                    </a>
                    <a href="https://www.facebook.com/your-page" className="text-teal-600 text-xl hover:text-teal-800 transition duration-200" target="_blank" rel="noopener noreferrer">
                        <FaFacebook />
                    </a>
                    <a href="https://www.instagram.com/your-profile" className="text-teal-600 text-xl hover:text-teal-800 transition duration-200" target="_blank" rel="noopener noreferrer">
                        <FaInstagram />
                    </a>
                    <a href="/login" className="text-teal-600 text-xl hover:text-teal-800 transition duration-200">
                        <FaUser />
                    </a>
                </div>
                <p className="text-xs text-gray-700">
                    © 2024 Centro Kinésico Integral de Buin. Todos los derechos reservados.
                </p>
            </div>
        </footer>
    );
};