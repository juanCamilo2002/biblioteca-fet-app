"use client";
import Image from 'next/image';
import Link from 'next/link';
import { CiSearch } from 'react-icons/ci';
import { FiHeart } from 'react-icons/fi';
import { useState } from 'react'; // Importa useState desde React
import { useRouter } from 'next/navigation'; // Importa useRouter desde next/navigation
import styles from './topbar.module.css';
import NavBar from './navbar/NavBar';
import { signOut, useSession } from 'next-auth/react';

const TopBar = () => {
    const { status } = useSession();
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState(""); // Estado para almacenar el término de búsqueda

    const handleLogout = async () => {
        await signOut({
            redirect: true,
            callbackUrl: "/library"
        });
    }

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value); // Almacena el valor ingresado por el usuario
    }

    const handleSearch = () => {
        // Redirige a una página de búsqueda con el término
        if (searchTerm) {
            router.push(`/library/search?query=${encodeURIComponent(searchTerm)}`);
        }
    }

    return (
        <div className={styles.Container}>
            <div className={styles.topContainer}>
                <Image
                    src="/Logo-FET.png"
                    alt="Logo-FET"
                    className={styles.logo}
                    width={110}
                    height={50}
                />
                <div className={styles.searchContainer}>
                    <input
                        type="text"
                        className={styles.input}
                        placeholder="Buscar un libro..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <button className={styles.button} onClick={handleSearch}>
                        <CiSearch />
                    </button>
                </div>

                <div className={styles.savedContainer}>
                    <FiHeart size={20} />
                    <div className={styles.savedContainerCount}>
                        <span>0</span>
                    </div>
                    {status === "authenticated" ? (
                        <button onClick={handleLogout} className={styles.btnSesion}>Salir</button>
                    ) : <Link href="/login" className={styles.btnSesion}>Entrar</Link>}
                </div>
            </div>
            <NavBar />
        </div>
    );
}

export default TopBar;