"use client";

import Link from "next/link";
import { BsPlus } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import styles from "./authortable.module.css"
import DataTable from "react-data-table-component";

function AuthorTable() {
  const columnas = [
    {
      name: "Nombre de Autor",
      selector: (row) => row.author,
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

  const data = [
    {
      author: "Joan Sebastián Salcedo Galindo",
    },
    {
      author: "Juan Camilo Ordoñez Morea",
    },
    {
      author: "Brahian Stid Rojas Castillo",
    },
    {
      author: "Juan José Ramos Díaz",
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
      <h1 className={styles.titleBook}>Autores</h1>
      <div className={styles.container}>
        <div className={styles.btnContainer}>
          <Link href="/" className={styles.btnAddAuthor}>
            <BsPlus size={20} />
            Agregar autor
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
  );
}

export default AuthorTable;
