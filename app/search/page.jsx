"use client";
import styles from "./page.module.css";
import Search from "../components/search/search/Search";
import Aside from "../components/search/aside/Aside";
import TopBar from "../components/library/topBar/TopBar";
const page = () => {
  
  return (
    <div>
      <TopBar/>
      <div className={styles.container}>
        <Aside />
        <Search />
      </div>
    </div>
  );
};

export default page;
