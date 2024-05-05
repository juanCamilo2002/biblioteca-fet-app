"use client";
import Image from 'next/image';
import Link from 'next/link';
import { CiSearch } from 'react-icons/ci'
import { FiHeart } from 'react-icons/fi'
import styles from './Topbar.module.css'
import NavBar from './navbar/NavBar';
import { signOut, useSession } from 'next-auth/react';

const TopBar = () => {
    const {  status } = useSession();
    const handleLogout = async () => {
        await signOut({
            redirect: true,
            callbackUrl: "/library"
        });
    }
    return (
        <div className={styles.Container}>
            <div className={styles.topContainer}>
                <Image
                    src="/logo-small.png"
                    alt="logo-small"
                    className={styles.logo}
                    width={100}
                    height={40}
                />
                <div className={styles.searchContainer}>
                    <input type="text" className={styles.input} placeholder="Buscar un libro..." />
                    <button className={styles.button}>
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
    )
}

export default TopBar
