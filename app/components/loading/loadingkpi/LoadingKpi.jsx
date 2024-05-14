import styles from "./loaginkpi.module.css";
import ReactLoading from 'react-loading';

const LoadingKpi = () => {
  return (
    <section className={styles.container}>
      <ReactLoading
        type='spokes'
        color='#0C9F0F'
        height={30}
        width={30}
      />
    </section>
  )
}

export default LoadingKpi
