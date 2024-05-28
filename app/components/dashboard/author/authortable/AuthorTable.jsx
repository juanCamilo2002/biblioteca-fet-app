"use client";
import { BsPlus } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import styles from "./authortable.module.css"
import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createAuthor, deleteAuthor, getAuthors, updateAuthor } from "@api";
import { useSession } from "next-auth/react";
import Modal from "@/app/components/modal/Modal";
import LoadingDatatable from "@/app/components/loading/loadindatatable/LoadingDatatable";
import ModalCreateAuthor from "../create/ModalCreateAuthor";
import { MdDeleteOutline } from "react-icons/md";
import ModalUpdateAuthor from "../update/ModalUpdateAuthor";

function AuthorTable() {
  const [authors, setAuthors] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [authorSelected, setAuthorSelected] = useState({});
  const [pending, setPending] = useState(true);
  const [id, setId] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setPending(true);
        const response = await getAuthors();
        setAuthors(response);
        setPending(false);
      } catch (error) {
        toast.error("Error al cargar los autores");
      }
    }
    fetchData();
  }, []);
  const columnas = [
    {
      name: "Nombre de Autor",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div className={styles.btns}>
          <button className={styles.btnEdit} onClick={() => handleUpdate(row)}>
            <BiEdit size={20} />
          </button>
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

  const handleDelete = async (id) => {
    setOpenModal(true);
    setId(id);

  };

  const closeModal = () => {
    setOpenModal(false);
    setOpenModalCreate(false);
    setOpenModalUpdate(false);
  }

  const onDeleted = async () => {
    setOpenModal(false);
    await deleteAuthor(session.user.data.token, id, toast);
    const data = await getAuthors();
    setAuthors(data);
  };

  const handleCreate = () => {
    setOpenModalCreate(true);
  }

  const onCreate = async (values) => {
    setOpenModalCreate(false);
    await createAuthor(session.user.data.token, values, toast);
    const data = await getAuthors();
    setAuthors(data);
  }

  const handleUpdate = (author) => {
    setOpenModalUpdate(true);
    setAuthorSelected(author);
  }

  const onEdit = async (values, id) => {
    try {
      await updateAuthor(session.user.data.token, id, values, toast);
      const data = await getAuthors();
      setAuthors(data);
    } catch (error) {
      toast.error("Error al editar el autor");
    }
  }

  return (
    <div>
      <h1 className={styles.titleBook}>Autores</h1>
      <div className={styles.container}>
        <div className={styles.btnContainer}>
          <div className={styles.btnAddAuthor} onClick={handleCreate}>
            <BsPlus size={20} />
            Agregar autor
          </div>
        </div>
        <DataTable
          columns={columnas}
          data={authors}
          paginationPerPage={5}
          pagination
          progressPending={pending}
          progressComponent={<LoadingDatatable />}
          paginationComponentOptions={paginationComponentOptions}
          fixedHeader
        />
      </div>
      {openModal &&
        <Modal
          icon={<MdDeleteOutline />}
          handleClose={closeModal}
          action={onDeleted}
          title="Eliminar Autor"
          message="¿Estás seguro que deseas eliminar este autor?"
          actionText={"Eliminar"}
          hiddenAction={false}
        />}
      {
        openModalCreate &&
        <ModalCreateAuthor
          handleClose={closeModal}
          action={onCreate}
        />
      }
      {
        openModalUpdate &&
        <ModalUpdateAuthor
          handleClose={closeModal}
          action={onEdit}
          autor={authorSelected}
        />
      }
    </div>
  );
}

export default AuthorTable;



