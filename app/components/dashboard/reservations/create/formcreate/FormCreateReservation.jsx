"use client";
import { BiBookAdd } from "react-icons/bi";
import styles from './formcreatereservation.module.css';
import { Form, Formik } from "formik";
import Input from "@/app/components/forms/input/Input";
import Select from "@/app/components/forms/select/Select";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createReservation, getBooks, getUsers } from "@api";
import { useSession } from "next-auth/react";
import InputFilter from "@/app/components/forms/inputfilter/InputFilter";
import * as Yup from 'yup';
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const schemaCreateReservation = Yup.object().shape({
  bookId: Yup.string().required('Libro es requerido'),
  userId: Yup.string().required('Usuario es requerido'),
  horaYfecha: Yup.date().required('Fecha de salida es requerido'),
  fechaExpiracion: Yup.date().required('Fecha de expiracion es requerido'),
  status: Yup.string().required('Estado es requerido'),
  tipoPrestamo: Yup.string().required('Tipo de prestamo es requerido'),
});


const FormCreateReservation = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await getBooks();
        setBooks(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (session) {
          const res = await getUsers(session?.user?.data.token);
          setUsers(res);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, [status]);

  const initialValues = {
    bookId: '',
    userId: '',
    horaYfecha: '',
    fechaExpiracion: '',
    status: '',
    tipoPrestamo: '',
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await createReservation(session.user?.data.token, values, toast);
      resetForm();
      router.push('/dashboard/reservations');
    } catch (error) {
      console.error(error);
      toast.error('Error creating reservation');
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.iconHeader}>
          <BiBookAdd />
        </div>
        <span className={styles.span}>Añadir una reservación </span>
      </div>
      {books && users && (
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={schemaCreateReservation}
        >
          {({ isSubmitting, values, errors }) => (

            <Form className={styles.bookForm}>
              <div className={styles.formGroupContainer}>
                <InputFilter
                  label="Titulo del Libro"
                  name="bookId"
                  placeholder="Buscar libro..."
                  error={errors.bookId}
                  values={books}
                  selectedValue="title"
                  onValueSelect={(id, value) => values.bookId = id}
                />
                <InputFilter
                  label="Nombre del usuario"
                  name="userId"
                  placeholder="Buscar usuario..."
                  error={errors.userId}
                  values={users}
                  selectedValue="name"
                  onValueSelect={(id, value) => values.userId = id}
                />
              </div>
              <div className={styles.formGroupContainer}>
                <Input label="Fecha de salida" name="horaYfecha" type="date" />
                <Input label="Fecha de expiración" name="fechaExpiracion" type="date" />
              </div>
              <div className={styles.formGroupContainer}>
                <Select label="Estado" name="status" values={[
                  { value: 'Pendiente', name: 'Pendiente' },
                  { value: 'Entregado', name: 'Entregado' },
                  { value: 'Cancelado', name: 'Cancelado' },
                ]} />
                <Select label="Tipo de prestamo" name="tipoPrestamo" values={[
                  { value: 'Interno', name: 'Interno' },
                  { value: 'Externo', name: 'Externo' },
                ]} />
              </div>
              <div className={styles.bottom}>
                <Link href="/dashboard/reservations" className={styles.cancel}>
                  Cancelar
                </Link>
                <button className={styles.button} type="submit" >
                  Crear reservación
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  )
}

export default FormCreateReservation
