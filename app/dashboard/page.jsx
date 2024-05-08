import KpiContainer from '../components/dashboard/kpi/kpiContainer/KpiContainer';
import TableNews from '../components/dashboard/tablenews/TableNews';
import styles from './dashboard.module.css';

const DashboardView = () => {
    return (
        <div>
            <h2 className={styles.title}>Estadisticas</h2>
            <KpiContainer />
            <h2 className={styles.title}>Novedades</h2>
            <TableNews />
        </div>
    );
}

export default DashboardView;
