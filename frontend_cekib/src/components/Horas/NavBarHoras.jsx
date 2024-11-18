import React from "react";
import { MobileNav, Typography, IconButton } from "@material-tailwind/react";
import { Link, useLocation } from 'react-router-dom';
import LogoCekib from '../../assets/img/logo.png';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

export function NavbarHoras() {
  const [openNav, setOpenNav] = React.useState(false);
  const location = useLocation();

  const selectedNav = location.pathname === "/agendarhora" ? "Agendar Hora" :
                      location.pathname === "/consultarhora" ? "Consultar Hora" :
                      location.pathname === "/confirmarhora" ? "Confirmar Hora" :
                      location.pathname === "/anularhora" ? "Anular Hora" :
                      location.pathname === "/cambiarhora" ? "Cambiar Hora" :
                      "Agendar Hora";

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  const navList = (
    <ul className="flex flex-col lg:flex-row gap-4 items-center">
      {[
        { name: "Agendar Hora", path: "/agendarhora" },
        { name: "Consultar Hora", path: "/consultarhora" },
        { name: "Confirmar Hora", path: "/confirmarhora" },
        { name: "Anular Hora", path: "/anularhora" },
        { name: "Cambiar Hora", path: "/cambiarhora" }
      ].map(({ name, path }) => (
        <li key={name} className={`text-gray-600 mx-2 cursor-pointer ${selectedNav === name ? "font-bold mx-2 text-teal-400 underline" : ""}`}>
          <Link to={path} className="hover:underline" onClick={() => setOpenNav(false)}>
            {name}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="w-full">
      {/* Top Bar */}
      <div className="w-full bg-teal-400 h-5"></div>

      {/* Navbar */}
        <div className="flex items-center justify-center w-full gap-6 h-max max-w-full px-4 py-2 mb-2 lg:px-8 lg:py-3 bg-white shadow-lg">
          {/* Logo */}
          <Typography as="a" href="/" className="flex items-center">
            <img src={LogoCekib} alt="Logo CEKIB" className="w-16 mr-16" />
          </Typography>

          {/* Navigation List */}
          <div className="hidden lg:flex justify-center">{navList}</div>

          {/* Mobile Menu Button */}
          <IconButton
            variant="text"
            className="ml-auto h-8 w-8 text-inherit lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? <AiOutlineClose className="h-6 w-6" /> : <AiOutlineMenu className="h-6 w-6" />}
          </IconButton>
        </div>

        {/* Mobile Navigation */}
        <MobileNav open={openNav} className="bg-white">
          <div className="flex flex-col items-center">{navList}</div>
        </MobileNav>
    </div>
  );
}

