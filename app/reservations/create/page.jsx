import FormCreateReservation from "@/app/components/dashboard/reservations/create/formcreate/FormCreateReservation";
import styles from "./page.module.css";

const CreateReservationPage = () => {
  return (
    <div className={styles.container}>
        <FormCreateReservation />
    </div>
  )
}

export default CreateReservationPage;
