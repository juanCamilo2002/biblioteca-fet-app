import styles from "./selectnormal.module.css";

const SelectNomal = ({ label, name, values, value, onChange }) => {
  return (
    <div className={styles.formGroup}>
      <label className={styles.label} htmlFor={name}>{label}</label>
      <select name={name} className={styles.select} value={value} onChange={onChange}>
        <option value="">Selecciona una opción</option>
        {
          values.map((value, index) => (
            <option key={index} value={value.value}>{value.name}</option>
          ))
        }
      </select>
    </div>
  );
}

export default SelectNomal;
