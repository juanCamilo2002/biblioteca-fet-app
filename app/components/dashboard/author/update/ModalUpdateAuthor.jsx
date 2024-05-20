"use client";
import InputNormal from '@/app/components/forms/inputNormal/InputNormal';
import styles from './modalupdateautor.module.css';
import Modal from '@/app/components/modal/Modal';
import { useFormik } from 'formik';
import { FaRegAddressBook } from 'react-icons/fa';


const ModalUpdateAuthor = ({ autor, handleClose, action }) => {
  const formik = useFormik({
    initialValues: {
      name: autor.name,
    },
    onSubmit: async (values, {resetForm}) => {
      try {
        await action(values, autor._id);
        handleClose();
        handleClose();
      } catch (error) {
        console.error('Error al actualizar el autor:', error);
      }
    }
  });
  return (
    <Modal
      icon={<FaRegAddressBook />}
      title="Editar Autor"
      handleClose={handleClose}
      hiddenAction={true}
    >
      <form
        onSubmit={formik.handleSubmit}
        className={styles.form}
      >
        <InputNormal
          label="Nombre del autor"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <div className={styles.bottom}>
          <button type="submit"  className={styles.btn}>
            Editar
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default ModalUpdateAuthor;
