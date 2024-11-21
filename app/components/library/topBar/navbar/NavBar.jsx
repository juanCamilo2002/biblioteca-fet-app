import Link from 'next/link'
import styles from './navbar.module.css'
import { IoIosArrowDown } from 'react-icons/io'
import axios from 'axios'

const NavBar = () => {
  return (
    <div className={styles.container}>
    <ul className={styles.list}>
      <li>
        <Link href={"/"} className={styles.link}>Inicio</Link>
      </li>
     
     
    </ul>
  </div>
  )
}

export default NavBar
