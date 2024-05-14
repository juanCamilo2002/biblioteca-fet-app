import { ErrorMessage, Field } from 'formik';
import styles from './select.module.css';

const Select = ({ label, name, values }) => {
    return (
        <div className={styles.formGroup}>
            <label className={styles.label} htmlFor={name}>{label}</label>
            <Field as="select" name={name} className={styles.select}>
                <option value="">Selecciona una opción</option>
                {
                    values.map((value, index) => (
                        <option key={index} value={value.value}>{value.name}</option>
                    ))
                }
            </Field>
            <ErrorMessage name={name} component="div" className={styles.error} />
        </div>
    );
}

export default Select
