import styles from "./page.module.css";
import FormCreateBook from "@/app/components/dashboard/books/create/formcreate/FormCreateBook";

const Page = () => {
    return (
        <div className={styles.container}>
             <FormCreateBook />
        </div>
    );
}
export default Page;
