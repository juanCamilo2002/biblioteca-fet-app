"use client"
import { createContext, useContext } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export const SidebarContext = createContext();

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    let messageError = 'useSidebar debería estar siendo usado dentro de un provider';
    if (!context) throw new Error(messageError);
    return context;
}

export const SidebarProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useLocalStorage("sidebar", false);

    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
            {children}
        </SidebarContext.Provider>
    );
}