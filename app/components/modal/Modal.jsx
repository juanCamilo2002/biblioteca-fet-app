import styles from "./modal.module.css";
import { MdDeleteOutline } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";

const Modal = ({title, handleClose, action, message }) => {
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <div className={styles.top}>
          <div className={styles.left}>
            <div className={styles.icon}>
              <MdDeleteOutline />
            </div>
            <h2 className={styles.title}>{title}</h2>
          </div>
          <div className={styles.right}>
            <div className={styles.iconClose} onClick={handleClose}>
              <IoCloseOutline />
            </div>
          </div>
        </div>
        <div className={styles.body}>
          <p className={styles.p}>{message}</p>
        </div>
        <div className={styles.footer}>
          <button className={styles.cancel} onClick={handleClose}>Cancelar</button>
          <button className={styles.delete} onClick={action}>Eliminar</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
