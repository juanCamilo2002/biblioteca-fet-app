import styles from "./input.module.css";
import { Field, ErrorMessage } from "formik";

const Input = ({label, name, type}) => {
  return (
    <div className={styles.formGroup}>
      <label className={styles.label} htmlFor={name}>{label}</label>
      <Field className={styles.input} type={type ? type : "text"} id={name} name={name} />
      <ErrorMessage name={name} component="div" className={styles.error} />
    </div>
  );
}

export default Input;