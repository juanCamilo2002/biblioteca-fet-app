import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from './formcreatebook.module.css';
import InputFilter from '@/app/components/forms/inputfilter/InputFilter';

const FormCreateBook = () => {
  const authors = [{
    id: 1,
    name: 'J.K. Rowling'
  },
  {
    id: 2,
    name: 'Stephen King'
  },
  {
    id: 3,
    name: 'Agatha Christie'
  },
  {
    id: 4,
    name: 'George R.R. Martin'
  },
  {
    id: 5,
    name: 'Isaac Asimov'

  }];
  const initialValues = {
    title: '',
    author: '',
    genre: ''
  };

  const handleSubmit = (values, { resetForm }) => {
    onSubmit(values);
    resetForm();
  };

  const validateForm = values => {
    const errors = {};

    if (!values.title) {
      errors.title = 'Title is required';
    }

    if (!values.author) {
      errors.author = 'Author is required';
    }

    if (!values.genre) {
      errors.genre = 'Genre is required';
    }

    return errors;
  };

  return (
    <div className={styles.bookFormContainer}>
      <h2>Añadir un libro</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validate={validateForm}
      >
        {({ isSubmitting }) => (
          <Form className={styles.bookForm}>
            <div className={styles.formGroupContainer}>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="title">Titulo</label>
                <Field className={styles.input} type="text" id="title" name="title" />
                <ErrorMessage name="title" component="div" className={styles.error} />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="author">Author:</label>
                <Field className={styles.input} type="text" id="author" name="author" />
                <ErrorMessage name="author" component="div" className={styles.error} />
              </div>

            </div>
            <div className={styles.formGroupContainer}>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="title">Autor:</label>
                <InputFilter
                  values={authors}
                  selectedValue="name"
                  onValueSelect={(id, value) => console.log(id, value)}
                  placeholder="Escriba el nombre del autor"
                />

                <ErrorMessage name="title" component="div" className={styles.error} />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="genre">Genre:</label>
                <Field className={styles.input} type="text" id="genre" name="genre" />
                <ErrorMessage name="genre" component="div" className={styles.error} />
              </div>

            </div>
            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="genre">Genre:</label>
                <Field className={styles.input} type="text" id="genre" name="genre" />
                <ErrorMessage name="genre" component="div" className={styles.error} />
              </div>

            <button className={styles.button} type="submit" disabled={isSubmitting}>Save Book</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default FormCreateBook;
