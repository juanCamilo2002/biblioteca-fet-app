"use client";
import { BiBookAdd } from "react-icons/bi";
import styles from "./formcreateuser.module.css";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { createUser } from "@api";
import { useRouter } from "next/navigation";
import UserFormFields from "./userformfields/UserFormFields";
import schemaCreateUser from "./SchemaValidations";
import Formheader from "@/app/components/forms/formheader/Formheader";

const FormCreateUser = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const initialValues = {
    name: '',
    email: '',
    telefono: '',
    semestre: '',
    codigo: '',
    genero: '',
    Programa: '',
    isAdmin: '',
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await createUser(session?.user?.data.token, values, toast);
      router.push('/dashboard/users');
      resetForm();
    } catch (error) {
      console.log(error);
      toast.error('Error al crear el usuario');
    }
  };

  return (
    <div className={styles.container}>
      <Formheader icon={<BiBookAdd />} text="Añadir usuario" />
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={schemaCreateUser}
      >
        {({ isSubmitting }) => (
          <Form className={styles.bookForm}>
            <UserFormFields />
            <div className={styles.bottom}>
              <Link href="/dashboard/users/" className={styles.cancel}>
                Cancelar
              </Link>
              <button className={styles.button} type="submit" >
                Añadir usuario
              </button>
            </div>
          </Form>
        )}
      </Formik >
    </div >
  );
}

export default FormCreateUser;
