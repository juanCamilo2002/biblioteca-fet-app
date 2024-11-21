import Image from 'next/image'
import styles from './banner.module.css'

const Banner = () => {
    return (
        <div className={styles.container}>
            <div className={styles.bannerContainer}>
                <Image
                    src="/13.png"
                    alt="13"
                    className={styles.bannerImg}
                    width={400}
                    height={210}
                />
                <div className={styles.textContainer}>
                    <h1>Biblioteca FET</h1>
                    <span>Donde las páginas se convierten en ideas y el conocimiento trasciende fronteras</span>
                </div>
            </div>
        </div>
    )
}

export default Banner
