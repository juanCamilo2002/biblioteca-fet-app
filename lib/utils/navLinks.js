import { FaRegCalendar, FaRegCalendarCheck, FaRegUser } from "react-icons/fa";
import { FiBook } from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
import { PiNotepadBold } from "react-icons/pi";

export const navLinks = [
    {
        id: 1,
        title: 'Dashboard',
        path: '/dashboard',
        icon: <RxDashboard size={20} />
    },
    {
        id: 2,
        title: 'libros',
        path: '/dashboard/books',
        icon: <FiBook size={20} />
    },
    {
        id: 3,
        title: 'Reservaciones',
        path: '/dashboard/reservations',
        icon: <FaRegCalendar size={20} />
    },
    {
        id: 4,
        title: 'Usuarios',
        path: '/dashboard/users',
        icon: <FaRegUser size={20} />
    },
    {
        id: 5,
        title: 'Reportes',
        path: '/dashboard/reports',
        icon: <FaRegCalendarCheck size={20}/>
    },
    {
        id: 6,
        title: 'Autores',
        path: '/dashboard/authors',
        icon: <PiNotepadBold size={20}/>
    },
    
];