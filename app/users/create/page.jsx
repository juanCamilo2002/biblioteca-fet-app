import FormCreateUser from "@/app/components/dashboard/users/create/FormCreateUser";
import styles from "./page.module.css";
import PrivateAdminRoute from "@/app/components/PrivateAdminRoute";

const UsersCreatePage = () => {
  return (
    <PrivateAdminRoute>
      <div className={styles.container}>
        <FormCreateUser />
      </div>
    </PrivateAdminRoute>
  );
}

export default UsersCreatePage;
