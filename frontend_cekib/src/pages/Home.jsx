import React, { useEffect, useState } from 'react';
import { StickyNavbar } from '../components/Base/StickyNavbar';
import { ContactInfo } from '../components/Base/ContactInfo';
import { FooterWithLogo } from '../components/Base/FooterWithLogo';
import { CarouselHome } from '../components/Home/CarouselHome';
import { NuestrosProfesionales } from '../components/Home/NuestrosProfesionales';
import { ComoTrabajamos } from '../components/Home/ComoTrabajamos';
import { QueTratamos } from '../components/Home/QueTratamos';

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
                    <CarouselHome />
                    <NuestrosProfesionales />
                    <ComoTrabajamos />
                    <QueTratamos />
                </main>
            </div>
            <FooterWithLogo />
        </>
    );
};