import Link from 'next/link'
import styles from './navbar.module.css'
import { IoIosArrowDown } from 'react-icons/io'

const NavBar = () => {
  return (
    <div className={styles.container}>
    <ul className={styles.list}>
      <li>
        <Link href={"/"} className={styles.link}>Inicio</Link>
      </li>
      <li>
        <div className={styles.link} >Categorias <IoIosArrowDown /></div>
      </li>
     
    </ul>
  </div>
  )
}

export default NavBar
