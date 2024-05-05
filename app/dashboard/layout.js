import styles from "./layout.module.css";
import SideBar from "../components/dashboard/sideBar/SideBar";
import { CiSearch } from "react-icons/ci";
import PrivateRoute from "../components/PrivateAdminRoute";


const Layout = ({ children }) => {
  return (
    <PrivateRoute isAdmin>
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
    </PrivateRoute>
  )
}

export default Layout
