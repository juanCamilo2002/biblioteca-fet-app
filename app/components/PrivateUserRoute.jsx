"use client";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Loading from './loading/Loading';

const PrivateUserRoute = ({ children }) => {
    const { data: session, status } = useSession();
    const router = useRouter();
    if (status === "loading") return <Loading/>;

    if (status == "authenticated" && session.user.data.isAdmin) {
        return router.push("/dashboard");
    }

    return (
        <div>
            {children}
        </div>
    )
}

export default PrivateUserRoute
