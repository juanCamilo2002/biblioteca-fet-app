import FormUpdateReservation from "@/app/components/dashboard/reservations/update/formupdate/FormUpdateReservation";
import styles from "./page.module.css";
import PrivateAdminRoute from "@/app/components/PrivateAdminRoute";

const UpdateReservationPage = ({ params }) => {
  return (
    <PrivateAdminRoute>
      <div className={styles.container}>
        <FormUpdateReservation id={params.id} />
      </div>
    </PrivateAdminRoute>
  )
}

export default UpdateReservationPage;
