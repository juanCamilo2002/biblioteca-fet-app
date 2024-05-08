"use client";
import { deleteBook, getBooks } from "@api";
import Link from "next/link";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { BsPlus } from "react-icons/bs";
import styles from "./booksdatatable.module.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import Modal from "@/app/components/modal/Modal";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";


const BooksDatatable = () => {
  const [books, setBooks] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [id, setId] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchBooks = async () => {
      const data = await getBooks();
      setBooks(data);

    };
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    setOpenModal(true);
    setId(id);

  };

  const closeModal = () => {
    setOpenModal(false);
  }

  const onDeleted = async () => {
    setOpenModal(false);
    await deleteBook(session.user.data.token, id, toast);
    const data = await getBooks();
    setBooks(data);
  };
  const columns = [
    {
      name: "Título",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Autor",
      selector: (row) => row.author,
      sortable: true,
    },
    {
      name: "Editorial",
      selector: (row) => row.publisher,
      sortable: true,
    },
    {
      name: "Materia",
      selector: (row) => row.materia,
      sortable: true,
    },
    {
      name: "Lenguaje",
      selector: (row) => row.language,
      sortable: true,
    },
    {
      name: "Unidades",
      selector: (row) => row.unidad,
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div className={styles.btns}>
          <Link href={"/updatebook/" + row._id} className={styles.btnEdit} >
            <BiEdit size={20} />
          </Link>
          <button className={styles.btnDelete} onClick={() => handleDelete(row._id)}>
            <RiDeleteBin6Line size={20} />
          </button>
        </div>
      ),
    },
  ];
  const paginationComponentOptions = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
  };
  return (
    <div>
      <h1 className={styles.titleBook}>Libros</h1>
      <div className={styles.container}>
        <div className={styles.btnContainer}>
          <Link href={"/books/create"} className={styles.btnAddBook}>
            <BsPlus size={20} />
            Agregar Libro
          </Link>
        </div>
        <DataTable
          columns={columns}
          data={books}
          paginationPerPage={5}
          pagination
          paginationComponentOptions={paginationComponentOptions}
          fixedHeader
        />
      </div>
      {openModal && <Modal handleClose={closeModal} action={onDeleted} />}
    </div>
  );
}

export default BooksDatatable;