import React from "react";
import { Navbar, MobileNav, Typography, Button, IconButton } from "@material-tailwind/react";
import { Link, useLocation } from 'react-router-dom'; // Importa Link y useLocation
import LogoCekib from '../../assets/img/logo.png';
import { BsClock } from "react-icons/bs";
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

export function StickyNavbar() {
  const [openNav, setOpenNav] = React.useState(false);
  const location = useLocation(); // Obtiene la ubicación actual

  // Establece el nombre de la pestaña seleccionada según la ruta actual
  const selectedNav = location.pathname === "/nosotros" ? "¿Quiénes Somos?" :
                      location.pathname === "/servicios" ? "Nuestros Servicios" :
                      location.pathname === "/blog" ? "Blog" :
                      location.pathname === "/contacto" ? "Contacto" : 
                      "Inicio";

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {[
        { name: "Inicio", path: "/" },
        { name: "¿Quiénes Somos?", path: "/nosotros" },
        { name: "Nuestros Servicios", path: "/servicios" },
        { name: "Blog", path: "/blog" },
        { name: "Contacto", path: "/contacto" }
      ].map(({ name, path }) => (
        <Typography
          as="li"
          key={name}
          color="gray"
          className={`p-1 font-normal cursor-pointer text-gray-600 ${selectedNav === name ? "font-bold underline text-teal-400" : ""}`}
        >
          <Link to={path} className="flex items-center" onClick={() => setOpenNav(false)}>{name}</Link> {/* Cambia a Link */}
        </Typography>
      ))}
    </ul>
  );

  return (
    <div className="w-full overflow-scroll">
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-2 lg:fixed lg:inset-x-0 lg:z-50 bg-white shadow-lg">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography as="a" href="/" className="mr-4 cursor-pointer py-1.5 font-medium">
            <img
              src={LogoCekib}
              alt="Logo CEKIB"
              className="w-36 inline-block"
            />
          </Typography>
          <div className="flex items-center justify-center flex-grow">
            <div className="mr-4 hidden lg:block">{navList}</div>
          </div>
          <div className="flex items-center gap-x-1">
            <Button
              color="teal"
              variant="filled"
              size="md"
              className="hidden lg:inline-block bg-teal-400 text-white hover:bg-teal-500"
            >
              <BsClock className="inline-block mr-2" />
              <span> Agendar hora</span>
            </Button>
          </div>
          <IconButton
            variant="text"
            className="ml-auto h-8 w-8 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <AiOutlineClose
                className="h-6 w-6"
                onClick={() => setOpenNav(false)}
              />
            ) : (
              <AiOutlineMenu
                className="h-6 w-6"
                onClick={() => setOpenNav(true)}
              />
            )}
          </IconButton>
        </div>

        <MobileNav open={openNav}>
          {navList}
          <div className="flex items-center gap-x-1">
            <Button fullWidth color="teal" variant="filled" size="sm" className="bg-teal-400 hover:bg-teal-500">
              <span>Agendar Hora</span>
            </Button>
          </div>
        </MobileNav>
      </Navbar>
    </div>
  );
};
