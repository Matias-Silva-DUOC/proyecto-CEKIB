import React, { useEffect, useState } from 'react';
import { StickyNavbar } from '../components/Base/StickyNavbar';
import { ContactInfo } from '../components/Base/ContactInfo';
import { FooterWithLogo } from '../components/Base/FooterWithLogo';
import { VisionCekib } from '../components/Servicios/VisionCekib.jsx';
import { NuestrosServicios } from '../components/Servicios/NuestrosServicios.jsx';
import { Beneficios } from '../components/Servicios/Beneficios.jsx';

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
            <div className={`${isSmallScreen ? '' : 'mt-28'}`}>
                <ContactInfo />
                <main>
                    <VisionCekib />
                    <NuestrosServicios />
                    <Beneficios />
                </main>
                <FooterWithLogo />
            </div>
        </>
    );
}
