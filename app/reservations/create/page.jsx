import FormCreateReservation from "@/app/components/dashboard/reservations/create/formcreate/FormCreateReservation";
import styles from "./page.module.css";
import PrivateAdminRoute from "@/app/components/PrivateAdminRoute";

const CreateReservationPage = () => {
  return (
    <PrivateAdminRoute>
      <div className={styles.container}>
        <FormCreateReservation />
      </div>
    </PrivateAdminRoute>
  )
}

export default CreateReservationPage;
