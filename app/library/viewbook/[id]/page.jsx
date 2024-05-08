import Image from "next/image";
import styles from "./viewbook.module.css";
import { IoIosHeartEmpty } from "react-icons/io";

const ViewBook = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <Image
            src="https://via.placeholder.com/350x500/124335"
            width={350}
            height={500}
            alt="Book"
            className={styles.image}
          />
        </div>
        <div className={styles.right}>
          <h2>Make It Happen: Surrender Your Fear. Take The Leap. Live On Purpose</h2>
          <p className={styles.desc}>Make It Happen Is the history of how I surrendered my fear,
            took the leap and got a life in my case, a perfectly, fuffilling life as mama, a working
            woman and a greatful
          </p>

          <div className={styles.detailsContainer}>
            <div className={styles.leftDetails}>
              <span className={styles.itemDetail}>PUBLISHER</span>
              <span className={styles.itemDetail}>FIRST PUBLISHER </span>
              <span className={styles.itemDetail}>ISBN</span>
              <span className={styles.itemDetail}>LANGUAGE</span>
              <span className={styles.itemDetail}>PAGES</span>
            </div>
            <div className={styles.rightDetails}>
              <span className={styles.itemDetailValue}>Thomas Nelson Inc</span>
              <span className={styles.itemDetailValue}>December 30th 2014</span>
              <span className={styles.itemDetailValue}>0718022394-9780718022396</span>
              <span className={styles.itemDetailValue}>Thomas Nelson Inc</span>
              <span className={styles.itemDetailValue}>200 P</span>
            </div>

          </div>

          <div className={styles.buttons}>
            <button className={styles.button}>Reservar</button>
            <button className={styles.button}>Añadir a lista <IoIosHeartEmpty /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewBook;
