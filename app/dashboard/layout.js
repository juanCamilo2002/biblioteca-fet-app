import styles from "./layout.module.css";
import SideBar from "../components/dashboard/sideBar/SideBar";
import { CiSearch } from "react-icons/ci";
import PrivateAdminRoute from "../components/PrivateAdminRoute";


const Layout = ({ children }) => {
  return (
    <PrivateAdminRoute >
      <div className={styles.container}>
      <SideBar />
      <div className={styles.content}>
        <div className={styles.containerSearch}>
          <div className={styles.inputSearch}>
            <input type="text" placeholder='Buscar...' className={styles.input}/>
            <CiSearch size={20} color='gray' />
          </div>
        </div>
        <div className={styles.containerContent}>
          {children}
        </div>
      </div>
    </div>
    </PrivateAdminRoute>
  )
}

export default Layout
