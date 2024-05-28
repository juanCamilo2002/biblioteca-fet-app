import Input from "@/app/components/forms/input/Input";
import styles from "./userformfields.module.css";
import Select from "@/app/components/forms/select/Select";

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

        <Input
          label="Correo Electrónico"
          type="email"
          name="email"
          placeholder="Correo Electrónico"
        />
        <Select
          label="Genero"
          name="genero"
          placeholder="genero"
          values={[
            { value: "Hombre", name: "Hombre" },
            { value: "Mujer", name: "Mujer" },
            { value: "Otro", name: "otro" },
          ]}
        />


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
