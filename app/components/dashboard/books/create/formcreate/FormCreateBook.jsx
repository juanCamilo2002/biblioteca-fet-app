"use client";
import { Formik, Form, } from 'formik';
import styles from './formcreatebook.module.css';
import InputFilter from '@/app/components/forms/inputfilter/InputFilter';
import Input from '@/app/components/forms/input/Input';
import InputDropZone from '@/app/components/forms/dropzone/InputDropZone';
import Select from '@/app/components/forms/select/Select';
import { BiBookAdd } from "react-icons/bi";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { createBook, getAuthors,  uploadFile } from '@api';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';

const schemaCreateBook = Yup.object().shape({
  title: Yup.string().required('Titulo es requerido'),
  subtitulo: Yup.string().required('Subtitulo es requerido'),
  n_asignatura: Yup.string().required('Nombre de asignatura es requerido'),
  codBook: Yup.string().required('Codigo de libro es requerido'),
  author: Yup.string().required('Autor es requerido'),
  materia: Yup.string().required('Materia es requerido'),
  publisher: Yup.string().required('Editorial es requerido'),
  ISBN: Yup.string().required('ISBN es requerido'),
  ISSN: Yup.string().required('ISSN es requerido'),
  status: Yup.boolean().required('Estado es requerido'),
  unidad: Yup.number().required('Unidades es requerido'),
  numberPages: Yup.number().required('Numero de paginas es requerido'),
  language: Yup.string().required('Lenguaje es requerido'),
  description: Yup.string().required('Descripcion es requerido'),
  fechaPublicacion: Yup.date().required('Fecha de publicacion es requerido'),
});


const FormCreateBook = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [image, setImage] = useState(null);
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      const authors = await getAuthors();
      setAuthors(authors);
    };
    fetchAuthors();
  }, []);

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

      const data = {...values, image: imageUrl };
      await createBook(session.user.data.token, data, toast);
      resetForm();
      router.push('/dashboard/books');
    } catch (error) {
      console.error(error);
      toast.error('Error creating book');
    }
  };


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
          <BiBookAdd />
        </div>
        <span className={styles.span}>Añadir un libro</span>
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={schemaCreateBook}
      >
        {({ isSubmitting, values, errors, setFieldValue }) => (

          <Form className={styles.bookForm}>
            <h5>Portada</h5>
            <InputDropZone
              onDrop={handleDrop}
              accept={
                {
                  'image/jpeg': [],
                  'image/png': []
                }
              }
              multiple={false}
            >
              {!image && <span>Arrastra una imagen o haz click para seleccionar una</span>}
              {image && <img src={image.dataURL} alt="book" className={styles.imagePlaceholder}/>}
            </InputDropZone>
            <div className={styles.formGroupContainer}>
              <Input label="Titulo" name="title" />
              <Input label="Subtitulo" name="subtitulo" />
              <Input label="Nombre de asignatura" name="n_asignatura" />
            </div>
            <div className={styles.formGroupContainer}>
              <Input label="Código de libro" name="codBook" type="number" />
              <InputFilter
                label="Autor"
                name="author"
                placeholder="Buscar autor"
                error={errors.author}
                values={authors}
                selectedValue="name"
                onValueSelect={(id, value) => values.author = id}
              />

              <Input label="Materia" name="materia" />
            </div>
            <div className={styles.formGroupContainer}>
              <Input label="Editorial" name="publisher" />
              <Input label="ISBN" name="ISBN" />
              <Input label="ISSN" name="ISSN" />
            </div>
            <div className={styles.formGroupContainer}>
              <Select label="estado" name="status" values={
                [{
                  name: 'Activo',
                  value: true
                },
                {
                  name: 'Inactivo',
                  value: false
                }]
              } />
              <Input label="Unidades" name="unidad" type="number" />
              <Input label="Numero de paginas" name="numberPages" type="number" />
            </div>
            <div className={styles.formGroupContainer}>
              <Input label="Lenguaje" name="language" />
              <Input label="Descripcion" name="description" />
              <Input label="Fecha de publicacion" name="fechaPublicacion" type="date" />
            </div>
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
