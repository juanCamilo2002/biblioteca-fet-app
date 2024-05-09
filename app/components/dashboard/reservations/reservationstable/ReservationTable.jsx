"use client"
import Link from "next/link";
import styles from "./reservationtable.module.css";
import DataTable from 'react-data-table-component';
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";

const ReservationTable = () => {

    const columnas = [
        {
          name: "Libro",
          selector: (row) => row.libro,
          sortable: true,
        },
        {
          name: "Nombre",
          selector: (row) => row.nombre,
          sortable: true,
        },
        {
          name: "Codigo FET",
          selector: (row) => row.codigo,
          sortable: true,
        },
        {
          name: "Fecha de Salida",
          selector: (row) => row.salida,
          sortable: true,
        },
        {
          name: "Fecha de ingreso",
          selector: (row) => row.ingreso,
          sortable: true,
        },
        {
            name: "Estado",
            selector: (row)=> row.estado
        },
        {
          name: "Acciones",
          button: true,
          cell: () => (
            <div className={styles.btns}>
              <Link href="/" className={styles.btnEdit}>
                <BiEdit size={20} />
              </Link>
              <button className={styles.btnDelete}>
                <RiDeleteBin6Line size={20} />
              </button>
            </div>
          ),
        },
      ];
      const data = [
        {
          numero: "1",
          libro: "Corazón de Hielo",
          nombre: "Joan Galindo",
          codigo: "2023101520",
          salida: "14/03/2024",
          ingreso: "18/03/2024",
          estado: "Entregado",
        },
        {
            numero: "2",
            libro: "Pensar con claridad",
            nombre: "Juan Ordoñez",
            codigo: "2023101422",
            salida: "20/03/2024",
            ingreso: "25/03/2024",
            estado: "Entregado",
        },
        {
            numero: "3",
            libro: "El poder del ahora",
            nombre: "David Santiago",
            codigo: "2023102022",
            salida: "01/04/2024",
            ingreso: "05/03/2024",
            estado: "Sin entregar",
        },
        {
            numero: "4",
            libro: "Minecraft",
            nombre: "Carolina Galindo",
            codigo: "2023102622",
            salida: "01/04/2024",
            ingreso: "05/03/2024",
            estado: "Sin entregar",
        },
        {
            numero: "5",
            libro: "Harry potter",
            nombre: "Carolina Galindo",
            codigo: "2023102622",
            salida: "01/04/2024",
            ingreso: "05/03/2024",
            estado: "Sin entregar",
        },
        {
            numero: "6",
            libro: "Corazón de Hielo",
            nombre: "Carolina Galindo",
            codigo: "2023102622",
            salida: "01/04/2024",
            ingreso: "05/03/2024",
            estado: "Sin entregar",
        },
        {
            numero: "7",
            libro: "Corazón de Hielo",
            nombre: "Carolina Galindo",
            codigo: "2023102622",
            salida: "01/04/2024",
            ingreso: "05/03/2024",
            estado: "Sin entregar",
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
        <h1 className={styles.titleBook}>Reservaciones</h1>
      <div className={styles.container}>
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

export default ReservationTable