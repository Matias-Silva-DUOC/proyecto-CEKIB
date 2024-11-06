import React from "react";
import { Carousel, Button } from "@material-tailwind/react";
import { BsClock } from "react-icons/bs";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import Carrusel0 from '../../assets/img/Carousel/car0.jpg';
import Carrusel1 from '../../assets/img/Carousel/car1.jpeg';
import Carrusel2 from '../../assets/img/Carousel/car2.jpg';
import Carrusel3 from '../../assets/img/Carousel/car3.jpeg';

export function CarouselHome() {
    return (
        <Carousel
            className="rounded-xl"
            autoplay={true}
            autoplayDelay={5000}
            transition={{ type: "tween", duration: 0.8 }}
            loop={true}
            navigation={({ setActiveIndex, activeIndex, length }) => (
                <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                    {new Array(length).fill("").map((_, i) => (
                        <span
                            key={i}
                            className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${activeIndex === i ? "w-8 bg-teal-600" : "w-4 bg-teal-300"}`}
                            onClick={() => setActiveIndex(i)}
                        />
                    ))}
                </div>
            )}
            prevArrow={({ handlePrev }) => (
                <button
                    onClick={handlePrev}
                    className="absolute top-2/4 left-4 -translate-y-2/4 rounded-full select-none transition-all w-12 h-12 text-teal-600 hover:bg-teal-200 active:bg-teal-300 grid place-items-center hidden md:block"
                >
                    <MdNavigateBefore className="h-6 w-6" />
                </button>
            )}
            nextArrow={({ handleNext }) => (
                <button
                    onClick={handleNext}
                    className="absolute top-2/4 right-4 -translate-y-2/4 rounded-full select-none transition-all w-12 h-12 text-teal-600 hover:bg-teal-200 active:bg-teal-300 grid place-items-center hidden md:block"
                >
                    <MdNavigateNext className="h-6 w-6" />
                </button>
            )}
        >
            {/* Slide 1 */}
            <div className="flex flex-wrap items-center justify-center p-2">
                <div className="flex flex-col w-full md:w-1/2 items-center text-center pr-4">
                    <h1 className="text-2xl text-teal-400">¡Personalización que marca la diferencia en CEKIB!</h1>
                    <div className="my-2"></div>
                    <p className="mb-4 text-lg text-gray-600">
                        En CEKIB, creemos firmemente que la clave para ofrecer una atención de calidad es la personalización del tratamiento. Todas nuestras atenciones son uno a uno: un profesional dedicado exclusivamente a ti.
                    </p>
                </div>
                <div className="w-full md:w-1/5 hidden md:block">
                    <img src={Carrusel0} alt="Personalización en CEKIB" className="rounded-lg" />
                </div>
            </div>

            {/* Slide 2 */}
            <div className="flex flex-wrap items-center justify-center p-2">
                <div className="flex flex-col w-full md:w-1/2 items-center text-center pr-4">
                    <h1 className="text-2xl text-teal-400">¡Únete a nuestro viaje hacia la salud!</h1>
                    <div className="my-2"></div>
                    <p className="mb-4 text-lg text-gray-600">
                        Si necesitas más información puedes escribirnos a nuestro WhatsApp.
                    </p>
                    <div className="flex space-x-2 justify-center">
                        <Button color="teal" variant="filled" size="md" className="flex items-center bg-teal-400 hover:bg-teal-500">
                            <BsClock className="mr-2" />
                            Agendar hora
                        </Button>
                        <Button color="green" variant="filled" size="md" className="flex items-center">
                            <FaWhatsapp className="mr-2" />
                            WhatsApp
                        </Button>
                    </div>
                </div>
                <div className="w-full md:w-1/5 hidden md:block">
                    <img src={Carrusel1} alt="Información de WhatsApp" className="rounded-lg" />
                </div>
            </div>

            {/* Slide 3 */}
            <div className="flex flex-wrap items-center justify-center p-2">
                <div className="flex flex-col w-full md:w-1/2 items-center text-center pr-4">
                    <h1 className="text-2xl text-teal-400">KINESIOLOGÍA: Enfoque a tus Necesidades y Objetivos</h1>
                    <div className="my-2"></div>
                    <p className="mb-4 text-lg text-gray-600">
                        ¡En CEKIB, nos comprometemos a brindarte una atención kinésica que se adapta a ti! Nuestra práctica está centrada en tus necesidades y objetivos específicos.
                    </p>
                </div>
                <div className="w-full md:w-1/5 hidden md:block">
                    <img src={Carrusel2} alt="Kinesiología adaptada a ti" className="rounded-lg" />
                </div>
            </div>

            {/* Slide 4 */}
            <div className="flex flex-wrap items-center justify-center p-2">
                <div className="flex flex-col w-full md:w-1/2 items-center text-center pr-4">
                    <h1 className="text-2xl text-teal-400">¡NUESTROS SERVICIOS!</h1>
                    <div className="my-2"></div>
                    <p className="mb-4 text-lg text-gray-600">
                        Descubre cómo podemos ayudarte a alcanzar tus metas de bienestar.
                    </p>
                    <Link to="/servicios">
                        <Button color="teal-400" variant="filled" size="md" className="btn-lg bg-teal-400 hover:bg-teal-500">
                            Nuestros Servicios
                        </Button>
                    </Link>
                </div>
                <div className="w-full md:w-1/4 hidden md:block">
                    <img src={Carrusel3} className="img-fluid rounded-lg" alt="Servicios ofrecidos" />
                </div>
            </div>

        </Carousel>
    );
};