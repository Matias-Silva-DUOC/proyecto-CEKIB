import React, { useEffect, useState } from 'react';
import { StickyNavbar } from '../components/Base/StickyNavbar';
import { ContactInfo } from '../components/Base/ContactInfo';
import { FooterWithLogo } from '../components/Base/FooterWithLogo';
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@material-tailwind/react";

export default function Home() {
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 640);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <StickyNavbar />
            <div className={`${isSmallScreen ? 'p-4 flex flex-col items-center' : 'mt-28'}`}>
                <ContactInfo />
                <main className={`p-4 flex flex-col items-center justify-center ${isSmallScreen ? '' : 'p-12'}`}>
                    <div className={`flex ${isSmallScreen ? 'flex-col items-center' : 'flex-row'} gap-4`}>
                        {/* Sección de mapa */}
                        <div className={`map-section flex-1 flex flex-col items-center text-center ${isSmallScreen ? 'mb-4' : 'mr-20'}`}>
                            <h1 className="text-2xl text-teal-400 mb-6">
                                Ubicación de Centro Kinésico Integral de Buin
                            </h1>
                            <div className="google-map">
                                <iframe
                                    title="Ubicación del Centro Kinésico Integral de Buin" // Se añadió la propiedad title
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3317.54896591126!2d-70.7458279!3d-33.7464774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9663216be33246f7%3A0x7816e453e3185975!2sProf.%C2%AA%20Julieta%20Valenzuela%20602%2C%209501853%20Buin%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses!2scl!4v1727883679783!5m2!1ses!2scl"
                                    width="100%"
                                    height="450"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </div>

                        {/* Sección de información de contacto */}
                        <div className={`info-section flex-1 flex flex-col items-center text-center ${isSmallScreen ? 'mb-4' : 'ml-20'}`}>
                            <h1 className="text-2xl text-teal-400 mb-2">CONTACTO</h1>
                            <div className="contact-info space-y-2">
                                <div className="contact-item flex items-center justify-center">
                                    <span className="icon text-base">📍</span>
                                    <span className="ml-2">Profesora Julieta Valenzuela 602, Buin</span>
                                </div>
                                <div className="contact-item flex items-center justify-center">
                                    <span className="icon text-base">📅</span>
                                    <span className="ml-2">Lunes a Viernes de 9:00 a 19:00</span>
                                </div>
                                <div className="contact-item flex items-center justify-center">
                                    <span className="icon text-base">📞</span>
                                    <span className="ml-2">
                                        Contacto: <a href="tel:+56945971970" className="text-deep-purple-300 hover:underline">+56 9 4597 1970</a>
                                    </span>
                                </div>
                                <div className="contact-item flex items-center justify-center">
                                    <span className="icon text-base">📧</span>
                                    <span className="ml-2">
                                        Correo: <a href="mailto:cekib.cl@gmail.com" className="text-deep-purple-300 hover:underline">cekib.cl@gmail.com</a>
                                    </span>
                                </div>
                                <br />
                                <div className='mt-4 flex justify-center'>
                                    <Button color="green" variant="filled" size="md" className="flex items-center">
                                        <FaWhatsapp className="mr-4" />
                                        WhatsApp
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <FooterWithLogo />
        </>
    );
}
