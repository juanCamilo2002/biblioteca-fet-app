"use client";
import styles from './tablenews.module.css'
import { GrSchedule } from 'react-icons/gr'
import { getReservas } from '@api';
import { formatterDate } from '@/lib/utils/formatterDate';
import { useEffect, useState } from 'react';

const TableNews = () => {
  const [newReservations, setNewReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      const reservations = await getReservas(true);
      setNewReservations(reservations);
    };
    fetchReservations();
  }, []);
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.top}>
          <span className={styles.span}>Reservaciones recientes</span>
          <GrSchedule size={25} />
        </div>
        <div className={styles.content}>
          <table className={styles.TableNews}>
            <thead className={styles.encabezado}>
              <tr className={styles.encabezadoRow}>
                <th className={styles.encabezadoCell}>Usuario</th>
                <th className={styles.encabezadoCell}>libro</th>
                <th className={styles.encabezadoCell}>Fecha incial</th>
                <th className={styles.encabezadoCell}>Fecha limite</th>
                <th className={styles.encabezadoCell}>Estado</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {
                newReservations.map((reservation) => (
                  <tr
                    key={reservation._id}
                    className={`${styles.tableBodyRow} ${reservation.status === "Entregado" ? styles.delivered : reservation.status === "Pendiente" ? styles.pending : styles.cancelled}`}
                  >
                    <td className={styles.tableBodyCell}>
                      <div className={`${styles.divCell} ${styles.firstCell}`}>
                        {reservation.userId?.name}
                      </div>
                    </td>
                    <td className={styles.tableBodyCell}>
                      <div className={styles.divCell}>
                        {reservation?.bookId?.title ? reservation.bookId.title : "No se encuentra el libro"}
                      </div>
                    </td>
                    <td className={styles.tableBodyCell}>
                      <div className={styles.divCell}>
                        {formatterDate(reservation.horaYfecha)}
                      </div>
                    </td>
                    <td className={styles.tableBodyCell}>
                      <div className={styles.divCell}>
                        {formatterDate(reservation.fechaExpiracion)}
                      </div>
                    </td>
                    <td className={styles.tableBodyCell}>
                      <div className={`${styles.divCell} ${styles.lastCell}`}>
                        {reservation.status}
                      </div>
                    </td>
                  </tr>

                ))
              }

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TableNews;
