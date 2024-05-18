import FormBookUpdate from "@/app/components/dashboard/books/update/FormBookUpdate";
import styles from "./page.module.css";
import { Suspense } from "react";
import PrivateAdminRoute from "@/app/components/PrivateAdminRoute";

const BookUpdatePage = ({ params }) => {
  return (
    <PrivateAdminRoute>
      <div className={styles.container}>
        <Suspense fallback={<div>Loading...</div>}>
          <FormBookUpdate id={params.id} />
        </Suspense>
      </div>
    </PrivateAdminRoute>
  )
}

export default BookUpdatePage
