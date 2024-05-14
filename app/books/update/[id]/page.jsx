import FormBookUpdate from "@/app/components/dashboard/books/update/FormBookUpdate";
import styles from "./page.module.css";
import { Suspense } from "react";

const BookUpdatePage = ({params}) => {
  return (
    <div className={styles.container}>
      <Suspense fallback={<div>Loading...</div>}>
        <FormBookUpdate id={params.id}/>
      </Suspense>
    </div>
  )
}

export default BookUpdatePage
