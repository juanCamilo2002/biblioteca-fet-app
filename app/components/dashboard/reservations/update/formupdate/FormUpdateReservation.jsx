"use client";
import { useSession } from "next-auth/react";
import styles from "./formupdatereservation.module.css";
import { useRouter } from "next/navigation";
import { getBooks, getReserva, getUsers, updateReservation } from "@api";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { RiEdit2Line } from "react-icons/ri";
import InputFilter from "@/app/components/forms/inputfilter/InputFilter";
import InputNormal from "@/app/components/forms/inputNormal/InputNormal";
import moment from "moment";
import SelectNomal from "@/app/components/forms/selectNormal/SelectNormal";
import Link from "next/link";
import { toast } from "react-toastify";
import Formheader from "@/app/components/forms/formheader/Formheader";

const FormUpdateReservation = ({ id }) => {
  const { data: session, status } = useSession();
  const [reseva, setReserva] = useState({});
  const router = useRouter();
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [newBook, setNewBook] = useState("");
  const [newUser, setNewUser] = useState("");

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
    onSubmit: async (values, { resetForm }) => {
     if(newBook){
       values.bookId = newBook;
     }
     if(newUser){
       values.userId = newUser;
     }

      try {
        await updateReservation(session?.user?.data.token, id, values, toast);
        resetForm();
        router.push("/dashboard/reservations");
      } catch (error) {
        toast.error('Error creating book');
      }
    },
  });

  useEffect(() => {
    if (reseva && Object.keys(reseva).length > 0) {
      formik.setValues({
        bookId: reseva.bookId?._id,
        userId: reseva.userId?._id,
        horaYfecha: moment(reseva.horaYfecha).format("YYYY-MM-DD"),
        fechaExpiracion: moment(reseva.fechaExpiracion).format("YYYY-MM-DD"),
        status: reseva.status,
        tipoPrestamo: reseva.tipoPrestamo,
      });
    }
  }, [reseva]);

  return (
    <div className={styles.reservaFormContainer}>
      <Formheader icon={<RiEdit2Line />} text="Actualizar reservacion" />
      <form onSubmit={formik.handleSubmit} className={styles.bookForm}>
        <div className={styles.formGroupContainer}>
          <InputFilter
            label="Libro"
            name="bookId"
            placeholder="Buscar libro..."
            values={books}
            selectedValue="title"
            onValueSelect={(id, value) => setNewBook(id)}
            defaultValue={reseva.bookId?.title}
          />
          <InputFilter
            label="Usuario"
            name="userId"
            placeholder="Buscar usuario..."
            values={users}
            selectedValue="name"
            onValueSelect={(id, value) => setNewUser(id)}
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
            label="Estado"
            name="status"
            value={formik.values.status}
            values={[
              { value: 'Pendiente', name: 'Pendiente' },
              { value: 'Entregado', name: 'Entregado' },
              { value: 'Cancelado', name: 'Cancelado' },
            ]}
            onChange={formik.handleChange}
          />
          <SelectNomal
            label="Tipo de prestamo"
            name="tipoPrestamo"
            value={formik.values.tipoPrestamo}
            values={[
              { value: 'Interno', name: 'Interno' },
              { value: 'Externo', name: 'Externo' },
            ]}
            onChange={formik.handleChange}
          />
        </div>
        <div className={styles.bottom}>
          <Link href="/dashboard/reservations" className={styles.cancel}>
            Cancelar
          </Link>
          <button type="submit" className={styles.button}>
            Actualizar reservacion
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormUpdateReservation;