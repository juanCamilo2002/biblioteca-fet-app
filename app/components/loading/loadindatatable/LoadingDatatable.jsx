import styles from "./loadingdatatable.module.css";
import ReactLoading from 'react-loading';

const LoadingDatatable = () => {
  return (
    <section className={styles.container}>
      <ReactLoading
        type='spokes'
        color='#0C9F0F'
        height={30}
        width={30}
      />
      <span className={styles.title}>Cargando</span>
    </section>
  )
}

export default LoadingDatatable
