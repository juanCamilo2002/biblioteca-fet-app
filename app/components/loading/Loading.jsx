import styles from './loading.module.css';
import ReactLoading from 'react-loading';

const Loading = () => {
    return (
        <section className={styles.container}>
            <ReactLoading
                type='spokes'
                color='#0C9F0F'
                height={60}
                width={60}
            />
            <span className={styles.title}>Cargando</span>
        </section>
    )
}

export default Loading
