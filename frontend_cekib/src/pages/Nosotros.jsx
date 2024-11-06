import React, { useEffect, useState } from 'react';
import { StickyNavbar } from '../components/Base/StickyNavbar';
import { ContactInfo } from '../components/Base/ContactInfo';
import { FooterWithLogo } from '../components/Base/FooterWithLogo';
import { Presentacion } from '../components/Nosotros/Presentacion';
import { Profesionales } from '../components/Nosotros/Profesionales';


export default function Nosotros() {
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
                    <Presentacion />
                    <Profesionales />
                </main>
            </div>
            <FooterWithLogo />
        </>
    );
};