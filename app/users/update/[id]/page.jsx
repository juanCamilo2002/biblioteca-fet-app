import FormUpdateUser from "@/app/components/dashboard/users/update/FormUpdateUser";
import styles from "./page.module.css";
import PrivateAdminRoute from "@/app/components/PrivateAdminRoute";

const page = ({ params }) => {
  return (
    <PrivateAdminRoute>
      <div className={styles.container}>
        <FormUpdateUser id={params.id} />
      </div>
    </PrivateAdminRoute>
  );
}

export default page;
