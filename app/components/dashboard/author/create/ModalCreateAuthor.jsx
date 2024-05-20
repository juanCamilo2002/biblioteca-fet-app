import Input from '@/app/components/forms/input/Input';
import Modal from '@/app/components/modal/Modal';
import { Field, Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import styles from './modalcreateauthor.module.css';
import { FaRegAddressBook } from 'react-icons/fa';

const ModalCreateAuthor = ({ handleClose, action }) => {

    const initialValues = {
        name: '',
    }

    const validationSchema = Yup.object({
        name: Yup.string().required('El nombre del autor es requerido'),
    });

    const handleSubmit = async (values, { resetForm }) => {
        try {
            await action(values);
            resetForm();
            handleClose();
        } catch (error) {
            toast.error('Error al crear el autor');
        }
    }

    return (
        <Modal
            icon={<FaRegAddressBook />}
            title="Crear Autor"
            handleClose={handleClose}
            hiddenAction={true}
            actionText="Crear"
        >
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Input label="Nombre del autor" name="name" />
                        <div className={styles.bottom}>
                            <button type="submit" disabled={isSubmitting} className={styles.btn}>
                                Crear
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
}

export default ModalCreateAuthor;
