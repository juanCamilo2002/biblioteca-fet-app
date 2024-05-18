"use client";
import InputNormal from "@/app/components/forms/inputNormal/InputNormal";
import styles from "./userformupdatefields.module.css";
import SelectNomal from "@/app/components/forms/selectNormal/SelectNormal";
import { ErrorMessage } from "formik";

const UserFormUpdateFields = ({ formik }) => {
  return (
    <div>
      <div className={styles.formGroupContainer}>
        <InputNormal
          label="Nombre"
          type="text"
          name="name"
          placeholder="Nombre"
          value={formik.values.name}
          onChange={formik.handleChange}
        />

        <InputNormal
          label="Teléfono"
          type="text"
          name="telefono"
          placeholder="Teléfono"
          value={formik.values.telefono}
          onChange={formik.handleChange}
        />
      </div>
      <div className={styles.formGroupContainer}>
        <div className={styles.inputContainer}>
          <label htmlFor="email" className={styles.label}>Correo Electrónico </label>
          <input
            type="email"
            name="email"
            className={styles.input}
            placeholder="Correo Electrónico"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <div className={styles.error}>
          </div>
        </div>

      </div>
      <div className={styles.formGroupContainer}>
        <InputNormal
          label="Código"
          type="text"
          name="codigo"
          placeholder="Código"
          value={formik.values.codigo}
          onChange={formik.handleChange}
        />
        <SelectNomal
          label="Semestre"
          name="semestre"
          placeholder="Semestre"
          values={Array.from({ length: 10 }, (_, i) => ({ value: (i + 1).toString(), name: (i + 1).toString() }))}
          value={formik.values.semestre}
          onChange={formik.handleChange}
        />
      </div>
      <div className={styles.formGroupContainer}>
        <InputNormal
          label="Programa Académico"
          type="text"
          name="Programa"
          placeholder="Programa Académico"
          value={formik.values.Programa}
          onChange={formik.handleChange}
        />
        <SelectNomal
          label={"Rol"}
          name="isAdmin"
          placeholder="Rol"
          value={formik.values.isAdmin}
          onChange={formik.handleChange}
          values={[
            { value: "true", name: "Administrador" },
            { value: "false", name: "Usuario" },
          ]}
        />
      </div>
    </div>
  )
}

export default UserFormUpdateFields
