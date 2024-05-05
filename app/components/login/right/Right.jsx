import Image from "next/image";
import styles from "./right.module.css";

const Right = () => {
  return (
    <div className={styles.container}>
      <div className={styles.back}>
        <Image
          src="/Logo-FET.png"
          alt="logo-fet"
          className={styles.img}
          width={400}
          height={200}
        />
        <h1 className={styles.title}>Biblioteca</h1>
      </div>
    </div>
  );
}

export default Right;
