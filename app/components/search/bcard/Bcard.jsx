import Image from 'next/image';
import Link from 'next/link';
import styles from './bcard.module.css';
import { CiHeart } from 'react-icons/ci';

export const Bcard = ({book}) => {
    return (
        <div className={styles.card}>
            <CiHeart size={30} color="white" className={styles.heartIcon} />
            <Image
                src={book.image ? book.image : "https://via.placeholder.com/250x300/CBC7C68"}
                alt=""
                className={styles.cover}
                width={800}
                height={400}
                style={{
                    width: '100%',
                    height: '350px',
                    objectFit: 'cover'
                }} />
            <div className={styles.content}>
                <h2 className={styles.title}>{book.title}</h2>
                <p className={styles.category}>materia: {book.materia}</p>
                <p className={styles.author}>autor: {book.author.name}</p>

            </div>
            <div className={styles.bottom}>
                <Link href={`/library/viewbook/${book._id}`} className={styles.btn}>Ver Más</Link>
            </div>

       </div>
    )
};
