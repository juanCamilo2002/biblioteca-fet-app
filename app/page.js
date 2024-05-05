"use client";
import { useSession } from "next-auth/react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import Loading from "./components/loading/Loading";


export default function HomePage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  if (status === "loading") return <Loading/>;



  if (status === "authenticated" && session.user.data.isAdmin) {
    return router.push("/dashboard");
  }

  if (status === "authenticated" && !session.user.data.isAdmin || status === "unauthenticated") {
    return router.push("/library");
  }

  return (
    <main className={styles.main}>

    </main>
  );
}
