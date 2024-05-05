"use client"
import { navLinks } from "@/lib/utils/navLinks"
import { IoIosArrowBack } from 'react-icons/io';
import styles from "./sidebar.module.css";
import { RiShutDownLine } from 'react-icons/ri';
import MenuLink from "./menuLink/MenuLink";
import Image from "next/image";
import { useSidebar } from "@/context/SideBarProvider";
import { signOut } from "next-auth/react";

const SideBar = () => {
    const { isOpen, toggleSidebar } = useSidebar();
    const handleLogout = async () => {
        await signOut({
            redirect: true,
            callbackUrl: "/login"
        });
    }
    return (
        <div className={`${styles.aside} ${!isOpen ? styles.active : ""}`}>
            <button className={styles.btnToggle} onClick={toggleSidebar}>
                <IoIosArrowBack />
            </button>
            <div className={styles.logo}>
                <Image src="/logo-small.png" width={90} height={50} className={styles.image} alt=""/>
            </div>
            <div className={styles.nav}>
                <ul className={styles.listItems}>
                    {navLinks.map(link => (
                        <li key={link.id} className={styles.listItem}>
                            <MenuLink link={link} className={styles.link} active={styles.active} />
                        </li>
                    ))}
                </ul>
            </div>
            <div className={styles.session} >
                <button className={styles.button} onClick={handleLogout}> 
                    <RiShutDownLine size={20} /> <span className={styles.span}>Cerrar Sesión</span>
                </button>
            </div>
        </div>
    );
}

export default SideBar;
