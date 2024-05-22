"use client"
import styles from './report.module.css'
import DataTable from 'react-data-table-component'

function ReportTable() {

  const columns =[
    {
      name: "Nombre",
      selector: (row) => row.nombre,
      sortable: true
    },
    {
      name: "Semestre",
      selector: (row) => row.semestre,
      sortable: true
    },
    {
      name: "Ciclo",
      selector: (row) => row.ciclo,
      sortable: true
    },
    {
      name: "Programa",
      selector: (row) => row.programa,
      sortable: true
    },
    {
      name: "Genero",
      selector: (row) => row.genero,
      sortable: true
    },
    {
      name: "Cantidad de libros",
      selector: (row) => row.libros,
      sortable: true
    }
  ]

  const datos = [
    {
    nombre: 'Joan Galindo',
    semestre: 'Noveno',
    ciclo: 'Profesional',
    programa: 'Software',
    genero: 'Masculino',
    libros: 3
    },
    
  ]

  const paginationComponentOptions = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
  };

  return (
    <div>
      <h1 className={styles.titleReport}>Reportes</h1>
      <div className={styles.container}>
        <div>
          <select className={styles.btnOption}>
            <option >Fecha de carga</option>
            <option >Enero</option>
            <option >Febrero</option>
            <option >Marzo</option>
            <option >Abril</option>
            <option >Mayo</option>
            <option >Junio</option>
            <option >Julio</option>
            <option >Agosto</option>
            <option >Septiembre</option>
            <option >Octubre</option>
            <option >Noviembre</option>
            <option >Diciembre</option>
          </select> 
          <select  className={styles.btnOption}>
            <option >Año</option>
            <option >2024</option>
          </select> 
        
        </div>
        
       
      <DataTable
      columns={columns}
      data={datos}
      paginationPerPage={5}
      pagination
      paginationComponentOptions={paginationComponentOptions}
      />
      <div className={styles.btnReport}>
        <button>Generar Reporte</button>
      </div>
    </div>
    </div>
    
  )
}

export default ReportTable