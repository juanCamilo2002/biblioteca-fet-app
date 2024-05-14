"use client"
import Link from "next/link";
import styles from "./reservationtable.module.css";
import DataTable from 'react-data-table-component';
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { useEffect, useState } from "react";
import { deleteReservation, getReservas } from "@/lib/utils/api";
import moment from "moment";
import { BsPlus } from "react-icons/bs";
import Modal from "@/app/components/modal/Modal";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import LoadingDatatable from "@/app/components/loading/loadindatatable/LoadingDatatable";

const ReservationTable = () => {
  const { data: session } = useSession();
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [pending, setPending] = useState(true);
  
  const [id, setId] = useState(null);

  const handleDelete = async (id) => {
    setOpenModal(true);
    setId(id);

  };

  const closeModal = () => {
    setOpenModal(false);
  }

  const onDeleted = async () => {
    setOpenModal(false);
    await deleteReservation(session.user.data.token, id, toast);
    const reservations = await getReservas();
    setData(reservations);
  };
  const columnas = [
    {
      name: "Libro",
      selector: (row) => row.bookId ? row.bookId.title : "No disponible",
      sortable: true,
    },
    {
      name: "Nombre",
      selector: (row) => row.userId.name,
      sortable: true,
    },
    {
      name: "Codigo FET",
      selector: (row) => row.userId.codigo,
      sortable: true,
    },
    {
      name: "Fecha de Salida",
      selector: (row) => moment(row.horaYfecha).format("DD/MM/YYYY"),
      sortable: true,
    },
    {
      name: "Fecha de expiración",
      selector: (row) => moment(row.fechaExpiracion).format("DD/MM/YYYY"),
      sortable: true,
    },
    {
      name: "Estado",
      selector: (row) => row.status,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div className={styles.btns}>
          <Link href={"/reservations/update/" + row._id} className={styles.btnEdit}>
            <BiEdit size={20} />
          </Link>
          <button className={styles.btnDelete} onClick={() => handleDelete(row._id)}>
            <RiDeleteBin6Line size={20} />
          </button>
        </div>
      ),
    },
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        setPending(true);
        const data = await getReservas();
        setData(data);
        setPending(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [])

  const paginationComponentOptions = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
  };
  return (
    <div>
      <h1 className={styles.titleBook}>Reservaciones</h1>
      <div className={styles.container}>
        <div className={styles.btnContainer}>
          <Link href={"/reservations/create"} className={styles.btnAddBook}>
            <BsPlus size={20} />
            Agregar Reservación
          </Link>
        </div>
        <DataTable
          columns={columnas}
          data={data}
          paginationPerPage={5}
          pagination
          paginationComponentOptions={paginationComponentOptions}
          fixedHeader
          progressPending={pending} 
          progressComponent={<LoadingDatatable/>}
        />
      </div>
      {openModal &&
        <Modal
          handleClose={closeModal}
          action={onDeleted}
          title="Eliminar Reservación"
          message="¿Estás seguro que deseas eliminar esta reservacion?"
        />}
    </div>
  )
}

export default ReservationTable