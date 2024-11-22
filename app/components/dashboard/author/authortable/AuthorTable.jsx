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
import { MdInput } from "react-icons/md";

function AuthorTable() {
  const [authors, setAuthors] = useState([]);
  const [openModalInactive, setOpenModalInactive] = useState(false);
  const [openModalActive, setOpenModalActive] = useState(false);
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
      name: "Estado",
      selector: (row) => row.status ? "Activo" : "Inactivo",
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div className={styles.btns}>
          <button className={styles.btnEdit} onClick={() => handleUpdate(row)}>
            <BiEdit size={20} />
          </button>
          {
            row.status ? (
              <button className={styles.btnDelete} onClick={() => handleInactive(row._id)}>
                <RiDeleteBin6Line size={20} />
              </button>
            ) : (
              <button className={styles.btnActive} onClick={() => handleActive(row._id)}>
                <MdInput size={20} />
              </button>
            )
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
    setOpenModalCreate(false);
    setOpenModalUpdate(false);
  }

  const onInactive = async () => {
    setOpenModalInactive(false);
    await updateAuthor(session.user.data.token, id, { status: false }, toast);
    const data = await getAuthors();
    setAuthors(data);
  };
  const onActive = async () => {
    setOpenModalActive(false);
    await updateAuthor(session.user.data.token, id, { status: true }, toast);
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
          columns={columnas} // Columnas configuradas
          data={authors} // Datos de los autores
          pagination // Activa la paginación
          paginationPerPage={5} // Número de filas por página
          progressPending={pending} // Muestra el componente de carga si está pendiente
          progressComponent={<LoadingDatatable />} // Componente de carga personalizada
          paginationComponentOptions={{
            rowsPerPageText: "Filas por página",
            rangeSeparatorText: "de",
            selectAllRowsItem: true,
            selectAllRowsItemText: "Todos",
          }} // Opciones de paginación
          fixedHeader // Cabecera fija para la tabla
          highlightOnHover // Resalta las filas al pasar el cursor
          responsive // Asegura la responsividad
        />

      </div>
      {openModalInactive &&
        <Modal
          icon={<MdDeleteOutline />}
          handleClose={closeModal}
          action={() => onInactive()}
          title="Desactivar Autor"
          message="¿Deseas desactivar a este autor??"
          actionText="Desactivar"
          hiddenAction={false}
        />}
      {openModalActive &&
        <Modal
          icon={<MdInput />}
          handleClose={closeModal}
          action={() => onActive()}
          title="Activar Autor"
          message="¿Deseas Activar a este autor??"
          actionText="Activar"
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



