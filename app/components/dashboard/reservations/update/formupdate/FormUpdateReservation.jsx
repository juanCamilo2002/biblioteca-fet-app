"use client";
import { useSession } from "next-auth/react";
import styles from "./formupdatereservation.module.css";
import { useRouter } from "next/navigation";
import { getBooks, getReserva, getUsers } from "@api";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { RiEdit2Line } from "react-icons/ri";
import InputFilter from "@/app/components/forms/inputfilter/InputFilter";
import InputNormal from "@/app/components/forms/inputNormal/InputNormal";
import moment from "moment";
import SelectNomal from "@/app/components/forms/selectNormal/SelectNormal";

const FormUpdateReservation = ({ id }) => {
  const { data: session, status } = useSession();
  const [reseva, setReserva] = useState({});
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

  useEffect(() => {
    const fetchReserva = async () => {
      try {
        const res = await getReserva(id);
        setReserva(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchReserva();
  }, []);
  const formik = useFormik({
    initialValues: {
      bookId: '',
      userId: '',
      horaYfecha: '',
      fechaExpiracion: '',
      status: '',
      tipoPrestamo: '',
    },
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  useEffect(() => {
    // Verificar si book no es nulo antes de establecer los valores del formulario
    if (reseva && Object.keys(reseva).length > 0) {

      formik.setValues({
        bookId: reseva.bookId,
        userId: reseva.userId,
        horaYfecha: moment(reseva.horaYfecha).format("YYYY-MM-DD"),
        fechaExpiracion: moment(reseva.fechaExpiracion).format("YYYY-MM-DD"),
        status: reseva.status,
        tipoPrestamo: reseva.tipoPrestamo,
      });
    }
  }, [reseva]);

  return (
    <div className={styles.reservaFormContainer}>
      <div className={styles.header}>
        <div className={styles.icon}>
          <RiEdit2Line />
        </div>
        <span className={styles.span}>Actualizar Reservacion</span>
      </div>
      <form onSubmit={formik.handleSubmit} className={styles.bookForm}>
        <div className={styles.formGroupContainer}>
          <InputFilter
            label="Libro"
            name="bookId"
            placeholder="Buscar libro..."
            values={books}
            selectedValue="title"
            onValueSelect={(id, value) => console.log(id)}
            defaultValue={reseva.bookId?.title}
          />
          <InputFilter
            label="Usuario"
            name="userId"
            placeholder="Buscar usuario..."
            values={users}
            selectedValue="name"
            onValueSelect={(id, value) => console.log(id)}
            defaultValue={reseva.userId?.name}
          />
        </div>
        <div className={styles.formGroupContainer}>
          <InputNormal
            label="Hora y fecha"
            name="horaYfecha"
            type="date"
            value={moment(formik.values.horaYfecha).format("YYYY-MM-DD")}
            onChange={formik.handleChange}
          />
          <InputNormal
            label="Fecha de expiracion"
            name="fechaExpiracion"
            type="date"
            value={moment(formik.values.fechaExpiracion).format("YYYY-MM-DD")}
            onChange={formik.handleChange}
          />
        </div>
        <div className={styles.formGroupContainer}>
          <SelectNomal
            label="Tipo de prestamo"
            name="tipoPrestamo"
            value={formik.values.tipoPrestamo}
            values={[
              { value: 'Pendiente', name: 'Pendiente' },
              { value: 'Entregado', name: 'Entregado' },
              { value: 'Cancelado', name: 'Cancelado' },
            ]}
            onChange={formik.handleChange}
          />
          <SelectNomal
            label="Estado"
            name="status"
            values={[
              { value: 'Interno', name: 'Interno' },
              { value: 'Externo', name: 'Externo' },
            ]}
            value={formik.values.status}
            onChange={formik.handleChange} 
          />
        </div>
      </form>
    </div>
  );
}

export default FormUpdateReservation;
