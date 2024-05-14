import styles from './inputnormal.module.css';

const InputNormal = ({ label, type, name, value, onChange }) => {
  return (
    <div className={styles.formGroup}>
      <label className={styles.label} htmlFor={name}>{label}</label>
      <input
        className={styles.input}
        type={type ? type : "text"}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default InputNormal;
