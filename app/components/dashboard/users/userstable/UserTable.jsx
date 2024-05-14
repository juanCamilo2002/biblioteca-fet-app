"use client"
import Link from "next/link";
import styles from "./usertable.module.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsPlus } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getUsers } from "@api";

const UserTable = () => {
    const [data, setData] = useState([]);
    const { data: session } = useSession();
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
          selector: (row) => row.programa,
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
              <Link  href="/" className={styles.btnEdit}>
                <BiEdit size={20}  />
              </Link>
              <button className={styles.btnDelete}>
                <RiDeleteBin6Line size={20}  />
              </button>
            </div>
          ),
        },
      ];
       
      useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await getUsers(session.user.data.token);
            setData(data);
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
          <Link href="/" className={styles.btnAddUser}>
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
        />
      </div>
    </div>
  )
}

export default UserTable