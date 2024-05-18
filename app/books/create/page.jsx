import PrivateAdminRoute from "@/app/components/PrivateAdminRoute";
import styles from "./page.module.css";
import FormCreateBook from "@/app/components/dashboard/books/create/formcreate/FormCreateBook";

const Page = () => {
    return (
        <PrivateAdminRoute>
            <div className={styles.container}>
                <FormCreateBook />
            </div>
        </PrivateAdminRoute>
    );
}
export default Page;
