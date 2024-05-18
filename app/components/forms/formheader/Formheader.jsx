import styles from "./formheader.module.css";

const Formheader = ({icon, text}) => {
  return (
    <div className={styles.header}>
      <div className={styles.iconHeader}>
       {icon}
      </div>
      <span className={styles.span}>{text}</span>
    </div>
  );
}

export default Formheader;
