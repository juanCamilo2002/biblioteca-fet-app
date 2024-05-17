"use client";
import { useFormik, } from 'formik';
import styles from './formbookupdate.module.css';
import { RiEdit2Line } from "react-icons/ri";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getBook, updateBook, uploadFile } from '@api';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import schemaUpdateBook from './schemaValidateBookUpdate';
import BookUpdateFormFields from './bookupdateformfields/BookUpdateFormFields';

const FormBookUpdate = ({ id }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [image, setImage] = useState(null);
  const [newAuthor, setNewAuthor] = useState('');
  const [book, setBook] = useState({});

  useEffect(() => {
    const fetchBook = async () => {
      const book = await getBook(id);
      setBook(book);
    };
    fetchBook();
  }, [id]);

  useEffect(() => {
    if (book && Object.keys(book).length > 0) {

      formik.setValues({
        title: book.title,
        subtitulo: book.subtitulo,
        n_asignatura: book.n_asignatura,
        codBook: book.codBook,
        author: book.author?._id,
        materia: book.materia,
        publisher: book.publisher,
        ISBN: book.ISBN,
        ISSN: book.ISSN,
        status: book.status,
        unidad: book.unidad,
        numberPages: book.numberPages,
        language: book.language,
        description: book.description,
        fechaPublicacion: book.fechaPublicacion,
      });
    }
  }, [book]);

  const formik = useFormik({
    initialValues: {
      title: '',
      subtitulo: '',
      n_asignatura: '',
      codBook: '',
      author: '',
      materia: '',
      publisher: '',
      ISBN: '',
      ISSN: '',
      status: '',
      unidad: '',
      numberPages: '',
      language: '',
      description: '',
      fechaPublicacion: '',
    },
    validationSchema: schemaUpdateBook,
    onSubmit: async (values, { resetForm }) => {
      try {
        let imageUrl = null;
        const data = values;
        if (image) {
          imageUrl = await uploadFile(session.user.data.token, image, toast);
          data.image = imageUrl;
        }
        if (newAuthor) {
          data.author = newAuthor;
        }
        await updateBook(session.user.data.token, id, data, toast);
        resetForm();
        router.push('/dashboard/books');
      } catch (error) {
        console.error(error);
        toast.error('Error creating book');
      }
    },
  });


  return (
    <div className={styles.bookFormContainer}>
      <div className={styles.header}>
        <div className={styles.icon}>
          <RiEdit2Line />
        </div>
        <span className={styles.span}>Actualizar libro</span>
      </div>
      <form onSubmit={formik.handleSubmit} className={styles.bookForm}>
        {
          book ?
            (
              <>
                <BookUpdateFormFields
                  formik={formik}
                  image={image}
                  setImage={setImage}
                  book={book}
                  setNewAuthor={setNewAuthor}
                />
                <div className={styles.bottom}>
                  <Link href="/dashboard/books" className={styles.cancel}>
                    Cancelar
                  </Link>
                  <button type="submit" className={styles.button}>
                    Actualizar libro
                  </button>
                </div>
              </>
            ) : <h1>Cargando...</h1>
        }
      </form>
    </div>
  );
}

export default FormBookUpdate;