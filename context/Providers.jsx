import SessionAuthProvider from "./SessionAuthProvider";
import { SidebarProvider } from "./SideBarProvider";

const Providers = ({ children }) => {
    return (
        <SessionAuthProvider>
            <SidebarProvider>
                {children}
            </SidebarProvider>
        </SessionAuthProvider>

    );
}

export default Providers;
