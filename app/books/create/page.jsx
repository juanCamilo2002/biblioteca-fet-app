"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import InputFilter from "@/app/components/forms/inputfilter/InputFilter";
import FormCreateBook from "@/app/components/dashboard/books/create/formcreate/FormCreateBook";

const Page = () => {
   

    return (
        <div className={styles.container}>
           

             <FormCreateBook />
        </div>
    );
}

export default Page;
