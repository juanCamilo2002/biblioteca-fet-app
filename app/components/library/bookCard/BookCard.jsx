import Image from 'next/image';
import Link from 'next/link';
import styles from './bookcard.module.css';
import { CiHeart } from 'react-icons/ci';

const BookCard = ({ book }) => {
  return (
    <div className={styles.card}>
      <CiHeart size={30} color="white" className={styles.heartIcon} />
      <Image
        src={book.image ? book.image : "https://via.placeholder.com/250x300/CBC7C68"}
        alt=""
        className={styles.cover}
        width={1000}
        height={300}
        style={{
          width: '100%',
          height: '300px',
          objectFit: 'cover'
        }}
      />
      <div className={styles.content}>
        <h2 className={styles.title}>{book.title}</h2>
        <p className={styles.category}>materia: {book.materia}</p>
        <p className={styles.author}>autor: {book.author}</p>

      </div>
      <div className={styles.bottom}>
        <Link href={`/library/viewbook/${book._id}`} className={styles.btn}>Ver Más</Link>
      </div>

    </div>
  );
}

export default BookCard;
