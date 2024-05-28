import styles from "./Aside.module.css";
const Aside = () => {
  return (
    <div className={styles.container}>
      <aside className={styles.aside}>
        <div>
          <h4>Género</h4>
          <p>Novela Histórica</p>
          <p>Romántica</p>
          <p>Ciencia ficción</p>
          <p>Aventuras</p>
          <p>Fantasía</p>
          <p>Suspenso</p>
          <p>Terror</p>
          <p>Juvenil</p>
        </div>
        <div>
          <h4>Educación</h4>
          <p>Ingles</p>
          <p>Matemáticas</p>
          <p>Sociales</p>
          <p>Filosofía</p>
          <p>Tecnología</p>
          <p>Ciencias Naturales</p>
         
        </div>
        <div>
          <h4>Disponibilidad</h4>
          <p>Disponibles</p>
          <p>No Disponibles</p>
          
        </div>
      </aside>
    </div>
  );
};

export default Aside;
