"use client";
import { useFormik, } from 'formik';
import styles from './formbookupdate.module.css';
import InputFilter from '@/app/components/forms/inputfilter/InputFilter';
import InputDropZone from '@/app/components/forms/dropzone/InputDropzone';
import { RiEdit2Line } from "react-icons/ri";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { getAuthors, getBook, updateBook, uploadFile } from '@api';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import InputNormal from '@/app/components/forms/inputNormal/InputNormal';
import SelectNomal from '@/app/components/forms/selectNormal/SelectNormal';
import moment from 'moment';

const schemaCreateBook = Yup.object().shape({
  title: Yup.string(),
  subtitulo: Yup.string(),
  n_asignatura: Yup.string(),
  codBook: Yup.string(),
  author: Yup.string(),
  materia: Yup.string(),
  publisher: Yup.string(),
  ISBN: Yup.string(),
  ISSN: Yup.string(),
  status: Yup.boolean(),
  unidad: Yup.number(),
  numberPages: Yup.number(),
  language: Yup.string(),
  description: Yup.string(),
  fechaPublicacion: Yup.date(),
});


const FormBookUpdate = ({ id }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [image, setImage] = useState(null);
  const [authors, setAuthors] = useState([]);
  const [newAuthor, setNewAuthor] = useState('');
  const [book, setBook] = useState({});

  useEffect(() => {
    const fetchAuthors = async () => {
      const authors = await getAuthors();
      setAuthors(authors);
    };
    fetchAuthors();
  }, []);

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
    validationSchema: schemaCreateBook,
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


  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      setImage({
        file: file,
        dataURL: event.target.result,
      });
    };
    reader.readAsDataURL(file);
  };


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
                <h5>Portada</h5>
                <div className={styles.formGroupContainerImage}>
                  <InputDropZone
                    onDrop={handleDrop}
                    accept={
                      {
                        'image/jpeg': [],
                        'image/png': []
                      }
                    }
                    multiple={false}
                    custom
                  >
                    {!image && <span>Arrastra una imagen o haz click para seleccionar una</span>}
                    {image &&
                      <Image
                        src={image.dataURL}
                        alt="book"
                        className={styles.imagePlaceholder}
                        width={250}
                        height={400} />
                    }
                  </InputDropZone>
                  {book.image &&
                    <img src={book.image} alt="book" className={styles.imagePlaceholder} width={250} height={400} />}
                </div>
                <div className={styles.formGroupContainer}>
                  <InputNormal
                    label="Titulo"
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                  />
                  <InputNormal
                    label="Subtitulo"
                    name="subtitulo"
                    value={formik.values.subtitulo}
                    onChange={formik.handleChange}
                  />
                  <InputNormal
                    label="Nombre de asignatura"
                    name="n_asignatura"
                    value={formik.values.n_asignatura}
                    onChange={formik.handleChange}
                  />

                </div>
                <div className={styles.formGroupContainer}>
                  <InputNormal
                    label="Código de libro"
                    name="codBook"
                    value={formik.values.codBook}
                    type='number'
                    onChange={formik.handleChange}
                  />
                  <InputFilter
                    label="Autor"
                    name="author"
                    placeholder="Buscar autor"
                    values={authors}
                    selectedValue="name"
                    onValueSelect={(id, value) => setNewAuthor(id)}
                    defaultValue={book.author?.name}
                  />
                  <InputNormal
                    label="Materia"
                    name="materia"
                    value={formik.values.materia}
                    onChange={formik.handleChange}
                  />
                </div>

                <div className={styles.formGroupContainer}>
                  <InputNormal
                    label="Editorial"
                    name="publisher"
                    value={formik.values.publisher}
                    onChange={formik.handleChange}
                  />
                  <InputNormal
                    label="ISBN"
                    name="ISBN"
                    value={formik.values.ISBN}
                    onChange={formik.handleChange}
                  />
                  <InputNormal
                    label="ISSN"
                    name="ISSN"
                    value={formik.values.ISSN}
                    onChange={formik.handleChange}
                  />

                </div>

                <div className={styles.formGroupContainer}>
                  <SelectNomal
                    label="estado"
                    name="status"
                    value={formik.values.status}
                    onChange={formik.handleChange}
                    values={
                      [{
                        name: 'Activo',
                        value: true
                      },
                      {
                        name: 'Inactivo',
                        value: false
                      }]
                    }
                  />
                  <InputNormal
                    label="Unidades"
                    name="unidad"
                    value={formik.values.unidad}
                    type='number'
                    onChange={formik.handleChange}
                  />
                  <InputNormal
                    label="Numero de paginas"
                    name="numberPages"
                    value={formik.values.numberPages}
                    type='number'
                    onChange={formik.handleChange}
                  />
                </div>
                <div className={styles.formGroupContainer}>
                  <InputNormal
                    label="Lenguaje"
                    name="language"
                    value={formik.values.language}
                    onChange={formik.handleChange}
                  />
                  <InputNormal
                    label="Descripcion"
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                  />
                  <InputNormal
                    label="Fecha de publicacion"
                    name="fechaPublicacion"
                    value={formik.values.fechaPublicacion ? moment(formik.values.fechaPublicacion).format('YYYY-MM-DD') : ''}
                    type='date'
                    onChange={formik.handleChange}
                  />
                </div>
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