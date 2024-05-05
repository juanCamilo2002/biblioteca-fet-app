import Image from 'next/image'
import styles from './banner.module.css'

const Banner = () => {
    return (
        <div className={styles.container}>
            <div className={styles.bannerContainer}>
                <Image
                    src="/banner.png"
                    alt="banner"
                    className={styles.bannerImg}
                    width={450}
                    height={450}
                />
                <div className={styles.textContainer}>
                    <h1>Reserva tu libro</h1>
                    <span>Biblioteca universitaria</span>
                </div>
            </div>
        </div>
    )
}

export default Banner
