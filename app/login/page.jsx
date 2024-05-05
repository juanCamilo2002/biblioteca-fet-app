"use client";
import React from 'react'
import Left from '../components/login/left/Left';
import Right from '../components/login/right/Right';
import styles from './login.module.css';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Loading from '../components/loading/Loading';

const LoginPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  if ( status === 'loading'){
    return <Loading />
  
  }
  if (status === 'authenticated' && session.user.data.isAdmin) {
    return router.push("/dashboard");
  }

  if (status === 'authenticated' && !session.user.data.isAdmin) {
    return router.push("/library");
  }

  return (
    <div className={styles.container}>
    <Left />
    <Right />
  </div>
  );
}

export default LoginPage;
