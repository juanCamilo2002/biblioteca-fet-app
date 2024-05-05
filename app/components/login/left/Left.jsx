"use client"
import { FaUserCircle } from "react-icons/fa";
import styles from "./left.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Correo electronico invalido')
    .required('Campo requerido'),
  password: Yup.string()
    .required('Campo requerido')
});

const Left = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session, status } = useSession();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      })
      if (res?.error) {
        setError(res.error)
        setTimeout(() => {
          setError("");
        }, 2000)
      };
      if (res?.ok) return router.push("/dashboard");

    }
  });

  return (
    <div className={styles.container}>
      <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
        <FaUserCircle size={150} className={styles.iconUser} />
        <h1 className={styles.title}>Iniciar sesión</h1>
        <input
          className={styles.input}
          type="email"
          placeholder="Correo electronico"
          id='email'
          name='email'
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        <input
          className={styles.input}
          type="password"
          placeholder="Contraseña"
          id='password'
          name='password'
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <button className={styles.button} type='submit' >
          Iniciar Sesión
        </button>
      </form>
    </div>
  )
}

export default Left;
