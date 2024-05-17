import React, { useEffect, useState } from 'react'
import styles from "./booksformfields.module.css";
import Input from '@/app/components/forms/input/Input';
import InputFilter from '@/app/components/forms/inputfilter/InputFilter';
import Select from '@/app/components/forms/select/Select';
import { getAuthors } from '@api';
import DropZoneimage from '@/app/components/forms/dropzoneimage/DropZoneimage';

const BooksFormFields = ({ values, errors, image, setimage }) => {
	const [authors, setAuthors] = useState([]);

	useEffect(() => {
    const fetchAuthors = async () => {
      const authors = await getAuthors();
      setAuthors(authors);
    };
    fetchAuthors();
  }, []);

	return (
		<div>
			<h5>Portada</h5>
			<DropZoneimage image={image} setImage={setimage}/>
			<div className={styles.formGroupContainer}>
				<Input label="Titulo" name="title" />
				<Input label="Subtitulo" name="subtitulo" />
				<Input label="Nombre de asignatura" name="n_asignatura" />
			</div>
			<div className={styles.formGroupContainer}>
				<Input label="Código de libro" name="codBook" type="number" />
				<InputFilter
					label="Autor"
					name="author"
					placeholder="Buscar autor"
					error={errors.author}
					values={authors}
					selectedValue="name"
					onValueSelect={(id, value) => values.author = id}
				/>

				<Input label="Materia" name="materia" />
			</div>
			<div className={styles.formGroupContainer}>
				<Input label="Editorial" name="publisher" />
				<Input label="ISBN" name="ISBN" />
				<Input label="ISSN" name="ISSN" />
			</div>
			<div className={styles.formGroupContainer}>
				<Select label="estado" name="status" values={
					[{
						name: 'Activo',
						value: true
					},
					{
						name: 'Inactivo',
						value: false
					}]
				} />
				<Input label="Unidades" name="unidad" type="number" />
				<Input label="Numero de paginas" name="numberPages" type="number" />
			</div>
			<div className={styles.formGroupContainer}>
				<Input label="Lenguaje" name="language" />
				<Input label="Descripcion" name="description" />
				<Input label="Fecha de publicacion" name="fechaPublicacion" type="date" />
			</div>
		</div>
	)
}

export default BooksFormFields