"use client";
import { getBookMostReserv, getCountBooksRegister, getReservasCountMonth } from "@api";
import Kpi from "../Kpi";
import styles from './kpicontainer.module.css';
import { FiBook } from 'react-icons/fi'
import { GiBookshelf } from "react-icons/gi";
import { HiOutlineSaveAs } from 'react-icons/hi'
import { use, useEffect, useState } from "react";
import { toast } from "react-toastify";
import LoadingKpi from "@/app/components/loading/loadingkpi/LoadingKpi";

const KpiContainer = () => {
    const [bookMostReserv, setBookMostReserv] = useState({});
    const [totalBooks, setTotalBooks] = useState({});
    const [reservationsMonthly, setReservationsMonthly] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getStats = async () => {
            try {
                setLoading(true);
                const bookMostReservResponse = await getBookMostReserv();
                const totalBooksResponse = await getCountBooksRegister();
                const reservationsMonthlyResponse = await getReservasCountMonth();
                setBookMostReserv(bookMostReservResponse);
                setTotalBooks(totalBooksResponse);
                setReservationsMonthly(reservationsMonthlyResponse);
                setLoading(false);

            } catch (error) {
                toast.error("Error al obtener las estadisticas")
            }
        }
        getStats();
    }, [])

    const stats = [
        {
            stat: reservationsMonthly.cantidadReservas,
            name: "Reservas",
            label: "Reservas en el mes",
            icon: <HiOutlineSaveAs size={25} />,
            placeholder: "No hay reservas en el mes"
        },
        {
            stat: totalBooks.cantidadLibros,
            name: "Libros",
            label: "Libros registrados",
            icon: <GiBookshelf size={25} />,
            placeholder: "No hay libros registrados"
        },
        {
            stat: bookMostReserv.libroMasReservado,
            name: "Libro",
            label: "Libro más reservado",
            icon: <FiBook size={25} />,
            placeholder: "No hay libros reservados"
        }
    ];

    return (
        <div className={styles.container}>
            {stats.map((stat, index) => (
                <Kpi
                    key={index}
                    stat={stat.stat}
                    name={stat.name}
                    label={stat.label}
                    icon={stat.icon}
                    placeholder={stat.placeholder}
                    maxLength={25}
                    loading={loading}
                />
            ))}
        </div>
    );

}

export default KpiContainer;
