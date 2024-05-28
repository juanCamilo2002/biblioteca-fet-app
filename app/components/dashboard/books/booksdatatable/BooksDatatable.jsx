"use client";
import { deleteBook, getBooks, updateBook } from "@api";
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
import LoadingDatatable from "@/app/components/loading/loadindatatable/LoadingDatatable";
import { MdDeleteOutline } from "react-icons/md";
import { MdInput } from "react-icons/md";


const BooksDatatable = () => {
  const [books, setBooks] = useState([]);
  const [openModalActive, setOpenModalActive] = useState(false);
  const [openModalInactive, setOpenModalInactive] = useState(false);
  const [pending, setPending] = useState(true);
  const [id, setId] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchBooks = async () => {
      setPending(true);
      const data = await getBooks();
      setBooks(data);
      setPending(false);
    };
    fetchBooks();
  }, []);

  const handleInactive = async (id) => {
    setOpenModalInactive(true);
    setId(id);

  };

  const handleActive = async (id) => {
    setOpenModalActive(true);
    setId(id);

  };


  const closeModal = () => {
    setOpenModalInactive(false);
    setOpenModalActive(false);
  }

  const onInactive = async () => {
    setOpenModalInactive(false);
    await updateBook(session.user.data.token,id, { status: false }, toast);
    const data = await getBooks();
    setBooks(data);
  };
  const onActive = async () => {
    setOpenModalActive(false);
    await updateBook(session.user.data.token,id, { status: true }, toast);
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
      selector: (row) => row.author.name,
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
          <Link href={"/books/update/" + row._id} className={styles.btnEdit} >
            <BiEdit size={20} />
          </Link>
          {
            row.status ?
              <button className={styles.btnDelete} onClick={() => handleInactive(row._id)}>
                <RiDeleteBin6Line size={20} />
              </button>
              :
              <button className={styles.btnActive} onClick={() => handleActive(row._id)}>
                <MdInput size={20} />
              </button>
          }
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
          progressPending={pending}
          progressComponent={<LoadingDatatable />}
        />
      </div>
      {openModalInactive &&
        <Modal
          icon={<MdDeleteOutline />}
          handleClose={closeModal}
          action={onInactive}
          title="Desactivar libro"
          message="¿Estás seguro que deseas Desactivar este libro?"
          actionText="Desactivar"
        />}
      {openModalActive &&
        <Modal
          icon={<MdDeleteOutline />}
          handleClose={closeModal}
          action={onActive}
          title="Activar libro"
          message="¿Estás seguro que deseas Activar este libro?"
          actionText="Activar"
        />}
    </div>
  );
}

export default BooksDatatable;
