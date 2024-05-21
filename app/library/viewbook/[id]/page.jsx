"use client";
import Image from "next/image";
import styles from "./viewbook.module.css";
import { IoIosHeartEmpty } from "react-icons/io";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { getBook } from "@api";
import moment from "moment";
import "moment/locale/es";

const ViewBook = ({ params }) => {
  const [book, setBook] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBook(params.id);
        setBook(data);
      } catch (error) {
        toast.error("Error al cargar el libro");
      }
    };
    fetchData();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <Image
            src={book.image ? book.image : "https://via.placeholder.com/350x500/124335"}
            width={400}
            height={560}
            alt="Book"
            style={
              {
                width: "400px",
                height: "600px",
                borderRadius: "5px",
                objectFit: "cover",
              }
            }

          />
        </div>
        <div className={styles.right}>
          <h2>{book.title}</h2>
          <p className={styles.desc}>
            {book.description}
          </p>

          <div className={styles.detailsContainer}>
            <div className={styles.leftDetails}>
              <span className={styles.itemDetail}>Editorial</span>
              <span className={styles.itemDetail}>Fecha de publicación </span>
              <span className={styles.itemDetail}>ISBN</span>
              <span className={styles.itemDetail}>Autor</span>
              <span className={styles.itemDetail}>Lenguaje</span>
              <span className={styles.itemDetail}>Páginas</span>
            </div>
            <div className={styles.rightDetails}>
              <span className={styles.itemDetailValue}>{book.publisher}</span>
              <span className={styles.itemDetailValue}>
                {moment(book.fechaPublicacion).locale('es').format('D [de] MMMM [de] YYYY')}
              </span>
              <span className={styles.itemDetailValue}>{book.ISBN}</span>
              <span className={styles.itemDetailValue}>{book.author?.name}</span>
              <span className={styles.itemDetailValue}>{book.language}</span>
              <span className={styles.itemDetailValue}>{book.numberPages} P</span>
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
