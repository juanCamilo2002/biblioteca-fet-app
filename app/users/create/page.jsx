import FormCreateUser from "@/app/components/dashboard/users/create/FormCreateUser";
import styles from "./page.module.css";

const UsersCreatePage = () => {
  return (
    <div className={styles.container}>
      <FormCreateUser />
    </div>
  );
}

export default UsersCreatePage;
