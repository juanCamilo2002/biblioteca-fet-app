"use client"
import { toast } from 'react-toastify'
import styles from './report.module.css'
import DataTable from 'react-data-table-component'
import { getReport, getReportData } from '@api'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'


function ReportTable() {
  const { data:session } = useSession();
  const [dataReport, setDataReport] = useState([]);

  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await getReportData(session.user.data.token);
          setDataReport(response.data);
        } catch (error) {
          toast.error("Ha ocurrido un error");
        }
      };
      fetchData();
  }, []);
  console.log(dataReport)
  const columns =[
    {
      name: "Nombre",
      selector: (row) => row.userData.name,
      sortable: true
    },
    {
      name: "Semestre",
      selector: (row) => row.userData.semestre,
      sortable: true
    },
    {
      name: "Ciclo",
      selector: (row) => row.userData.ciclo,
      sortable: true
    },
    {
      name: "Programa",
      selector: (row) => row.userData.Programa,
      sortable: true
    },
    {
      name: "Genero",
      selector: (row) => row.userData.genero,
      sortable: true
    },
    {
      name: "Cantidad de libros",
      selector: (row) => row.countReservations,
      sortable: true
    }
  ]

 
  const paginationComponentOptions = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
  };

  const handleReport = async () =>{
    try{
      await getReport(session.user.data.token, toast);
    }catch(e){
      toast.error("Ha ocurrido un error")
    }
  }

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
            <option >Tipo</option>
          </select> 
        
        </div>
        
       
      <DataTable
      columns={columns}
      data={dataReport}
      paginationPerPage={5}
      pagination
      paginationComponentOptions={paginationComponentOptions}
      />
      <div className={styles.btnReport}>
        <button onClick={handleReport}>Generar Reporte</button>
      </div>
    </div>
    </div>
    
  )
}

export default ReportTable