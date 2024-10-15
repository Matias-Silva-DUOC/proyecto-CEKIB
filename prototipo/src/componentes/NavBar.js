import React from "react";
import { Link } from "react-scroll";

const NavBar = () => {
    const links=[
        {
            id: 1,
            link: "Home",
        },
        {
            id: 2,
            link: "Agendar",
        },
    ]
    
    return (
        <div classname={styles.navBar}>
            <p> CEKIB </p>
            <ul>
                {links.map(x => {
                    <div>
                        <Link>{x.link === "" ? "" : x.link}</Link>
                    </div>
                })}
            </ul>
        </div>
        )
};

export default NavBar;