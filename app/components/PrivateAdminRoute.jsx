"use client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import Loading from "./loading/Loading";

const PrivateAdminRoute = ({ children }) => {
    const { data: session, status } = useSession();
    const router = useRouter();
    if (status === "loading") return <Loading/>;

    if (status === "unauthenticated") {
        return router.push("/login");
    }

    if (status == "authenticated" && !session.user.data.isAdmin) {
        return router.push("/library");
    }

    return (
        <div>
            {children}
        </div>
    )
}

export default PrivateAdminRoute
