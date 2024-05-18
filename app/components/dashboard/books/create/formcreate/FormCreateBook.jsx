"use client";
import { Formik, Form, } from 'formik';
import styles from './formcreatebook.module.css';
import { BiBookAdd } from "react-icons/bi";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {  useState } from 'react';
import { createBook,  uploadFile } from '@api';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import schemaCreateBook from './SchemaValidateCreateBook';
import BooksFormFields from './booksformfields/BooksFormFields';
import Formheader from '@/app/components/forms/formheader/Formheader';


const FormCreateBook = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [image, setImage] = useState(null);
 
  const initialValues = {
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
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      let imageUrl = null;
      if (image) {
        imageUrl = await uploadFile(session.user.data.token, image, toast);
      }
      const data = { ...values, image: imageUrl };
      await createBook(session.user.data.token, data, toast);
      resetForm();
      router.push('/dashboard/books');
    } catch (error) {
      console.error(error);
      toast.error('Error creating book');
    }
  };

  return (
    <div className={styles.bookFormContainer}>
      <Formheader icon={<BiBookAdd />} text="Crear libro" />
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={schemaCreateBook}
      >
        {({values, errors}) => (

          <Form className={styles.bookForm}>
            <BooksFormFields values={values} errors={errors} image={image} setimage={setImage}/>
            <div className={styles.bottom}>
              <Link href="/dashboard/books" className={styles.cancel}>
                Cancelar
              </Link>
              <button className={styles.button} type="submit" >
                Guardar libro
              </button>
            </div>
          </Form>
        )}
      </Formik>

    </div>
  );
}

export default FormCreateBook;