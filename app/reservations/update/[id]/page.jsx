import FormUpdateReservation from "@/app/components/dashboard/reservations/update/formupdate/FormUpdateReservation";
import styles from "./page.module.css";

const UpdateReservationPage = ({params}) => {
  return (
    <div className={styles.container}>
      <FormUpdateReservation  id={params.id}/>
    </div>
  )
}

export default UpdateReservationPage;
