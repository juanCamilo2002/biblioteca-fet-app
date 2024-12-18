"use client"
import Link from "next/link";
import styles from "./usertable.module.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsPlus } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getUsers, updateUser } from "@api";
import LoadingDatatable from "@/app/components/loading/loadindatatable/LoadingDatatable";
import { toast } from "react-toastify";
import Modal from "@/app/components/modal/Modal";
import { MdDeleteOutline } from "react-icons/md";
import { MdInput } from "react-icons/md";

const UserTable = () => {
  const [data, setData] = useState([]);
  const { data: session } = useSession();
  const [openModalInactive, setOpenModalInactive] = useState(false);
  const [openModalActive, setOpenModalActive] = useState(false);
  const [id, setId] = useState(null);
  const [pending, setPending] = useState(true);

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
    await updateUser(session?.user?.data.token, id, { status: false }, toast);
    const data = await getUsers(session?.user?.data.token);
    setData(data);
  };
  const onActive = async () => {
    setOpenModalActive(false);
    await updateUser(session?.user?.data.token, id, { status: true }, toast);
    const data = await getUsers(session?.user?.data.token);
    setData(data);
  };

  const columnas = [
    {
      name: "Nombre",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Correo Electrónico",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Teléfono",
      selector: (row) => row.telefono,
      sortable: true,
    },
    {
      name: "Semestre",
      selector: (row) => row.semestre,
      sortable: true,
    },
    {
      name: "Código",
      selector: (row) => row.codigo,
      sortable: true,
    },
    {
      name: "Programa Académico",
      selector: (row) => row.Programa,
      sortable: true,
    },
    {
      name: "Rol",
      selector: (row) => row.isAdmin ? "Administrador" : "Usuario",
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div className={styles.btns}>
          <Link href={"/users/update/" + row._id} className={styles.btnEdit}>
            <BiEdit size={20} />
          </Link>
          {row.status ? (
            <button className={styles.btnDelete} onClick={() => handleInactive(row._id)}>
              <RiDeleteBin6Line size={20} />
            </button>
          ) : (
            <button className={styles.btnActive} onClick={() => handleActive(row._id)}>
              <MdInput size={20} />
            </button>
          )}
        </div>
      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setPending(true);
        const data = await getUsers(session.user.data.token);
        setData(data);
        setPending(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);


  const paginationComponentOptions = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };

  return (
    <div>
      <h1 className={styles.titleBook}>Usuarios</h1>
      <div className={styles.container}>
        <div className={styles.btnContainer}>
          <Link href="/users/create" className={styles.btnAddUser}>
            <BsPlus size={20} />
            Agregar Usuario
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
          responsive
          progressComponent={<LoadingDatatable />}
          style={{ maxWidth: 700 }}
        />
      </div>
      {openModalInactive &&
        <Modal
          icon={<MdDeleteOutline />}
          handleClose={closeModal}
          action={onInactive}
          title="Desactivar Usuario"
          message="¿Estás seguro que deseas desactivar este usuario?"
          actionText="Desactivar"
        />}
      {openModalActive &&
        <Modal
          icon={<MdDeleteOutline />}
          handleClose={closeModal}
          action={onActive}
          title="Activar Usuario"
          message="¿Estás seguro que deseas activar este usuario?"
          actionText="Activar"
        />}
    </div>
  );
}

export default UserTable;