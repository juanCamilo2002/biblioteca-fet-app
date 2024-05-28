"use client";
import { useEffect, useState } from "react";
import styles from "./formupdateuser.module.css";
import Formheader from "@/app/components/forms/formheader/Formheader";
import { BiBookAdd } from "react-icons/bi";
import UserFormUpdateFields from "./userformupdatefields/UserFormUpdateFields";
import { getUser, updateUser } from "@api";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const FormUpdateUser = ({ id }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      if (session) {
        const res = await getUser(session?.user?.data.token, id);
        setUser(res);
      }
    };
    fetchUser();
  }, [status]);

  const initialValues = {
    name: user.name,
    email: user.email,
    telefono: user.telefono,
    codigo: user.codigo,
    semestre: user.semestre,
    Programa: user.Programa,
    isAdmin: user.isAdmin,
    genero: user.genero,
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        await updateUser(session?.user?.data.token, id, values, toast);
        router.push("/dashboard/users");
      } catch (error) {
        toast.error("Error al actualizar el usuario");
      }
    },
  });

  useEffect(() => {
    formik.setValues(user);
  }, [user]);

  return (
    <div className={styles.container}>
      <Formheader icon={<BiBookAdd />} text="Actualizar usuario" />
      <form onSubmit={formik.handleSubmit} className={styles.userForm}>
        {user && <UserFormUpdateFields formik={formik} />}
        <div className={styles.bottom}>
          <Link href="/dashboard/users" className={styles.cancel}>
            Cancelar
          </Link>
          <button type="submit" className={styles.button}>
            Actualizar usuario
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormUpdateUser;
