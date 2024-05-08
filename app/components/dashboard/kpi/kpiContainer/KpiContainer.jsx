import { getBookMostReserv, getCountBooksRegister, getReservasCountMonth } from "@api";
import Kpi from "../Kpi";
import styles from './kpicontainer.module.css';
import { FiBook } from 'react-icons/fi'
import { GiBookshelf } from "react-icons/gi";
import { HiOutlineSaveAs } from 'react-icons/hi'

const KpiContainer = async () => {
    try {
        const reservationsMonthly = await getReservasCountMonth();
        const totalBooks = await getCountBooksRegister();
        const bookMostReserv = await getBookMostReserv();

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
                    />
                ))}
            </div>
        );
    } catch (error) {
        console.error('Error fetching data:', error);
        return <div>Error al obtener datos de la API</div>;
    }
}

export default KpiContainer;
