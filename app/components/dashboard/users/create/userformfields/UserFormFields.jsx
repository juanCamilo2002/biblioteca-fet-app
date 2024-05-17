import Input from "@/app/components/forms/input/Input";
import styles from "./userformfields.module.css";
import Select from "@/app/components/forms/select/Select";
import { ErrorMessage, Field } from "formik";

const UserFormFields = () => {
  return (
    <div>
      <div className={styles.formGroupContainer}>
        <Input
          label="Nombre"
          type="text"
          name="name"
          placeholder="Nombre"
        />

        <Input
          label="Teléfono"
          type="text"
          name="telefono"
          placeholder="Teléfono"
        />
      </div>
      <div className={styles.formGroupContainer}>
        <div className={styles.inputContainer}>
          <label htmlFor="email" className={styles.label}>Correo Electrónico </label>
          <Field
            type="email"
            name="email"
            className={styles.input}
          />
          <ErrorMessage name="email" component="div" className={styles.error} />
        </div>

      </div>
      <div className={styles.formGroupContainer}>
        <Input
          label="Código"
          type="text"
          name="codigo"
          placeholder="Código"
        />
        <Select
          label="Semestre"
          name="semestre"
          placeholder="Semestre"
          values={Array.from({ length: 10 }, (_, i) => ({ value: (i + 1).toString(), name: (i + 1).toString() }))}
        />
      </div>
      <div className={styles.formGroupContainer}>
        <Input
          label="Programa Académico"
          type="text"
          name="Programa"
          placeholder="Programa Académico"
        />
        <Select
          label={"Rol"}
          name="isAdmin"
          placeholder="Rol"
          values={[
            { value: "true", name: "Administrador" },
            { value: "false", name: "Usuario" },
          ]}
        />
      </div>

    </div>
  )
}

export default UserFormFields
