import { useEffect, useState } from 'react';
import styles from './bookupdateformfields.module.css'
import { getAuthors } from '@api';
import DropZoneimage from '@/app/components/forms/dropzoneimage/DropZoneimage';
import InputNormal from '@/app/components/forms/inputNormal/InputNormal';
import InputFilter from '@/app/components/forms/inputfilter/InputFilter';
import SelectNomal from '@/app/components/forms/selectNormal/SelectNormal';
import moment from 'moment';

const BookUpdateFormFields = ({ formik, image, setImage, book, setNewAuthor }) => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      const res = await getAuthors();
      setAuthors(res);
    };
    fetchAuthors();
  }, []);
  return (
    <div>
      <h5>Portada</h5>
      <div className={styles.formGroupContainerImage}>
        <DropZoneimage setImage={setImage} image={image} custom/>
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
          value={moment(formik.values.fechaPublicacion).format('YYYY-MM-DD')}
          type='date'
          onChange={formik.handleChange}
        />
      </div>
    </div>
  )
}

export default BookUpdateFormFields