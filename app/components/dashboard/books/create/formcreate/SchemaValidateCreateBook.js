import * as Yup from 'yup';

const schemaCreateBook = Yup.object().shape({
    title: Yup.string().required('Titulo es requerido'),
    subtitulo: Yup.string().required('Subtitulo es requerido'),
    n_asignatura: Yup.string().required('Nombre de asignatura es requerido'),
    codBook: Yup.string().required('Codigo de libro es requerido'),
    author: Yup.string().required('Autor es requerido'),
    materia: Yup.string().required('Materia es requerido'),
    publisher: Yup.string().required('Editorial es requerido'),
    ISBN: Yup.string().required('ISBN es requerido'),
    ISSN: Yup.string().required('ISSN es requerido'),
    status: Yup.boolean().required('Estado es requerido'),
    unidad: Yup.number().required('Unidades es requerido'),
    numberPages: Yup.number().required('Numero de paginas es requerido'),
    language: Yup.string().required('Lenguaje es requerido'),
    description: Yup.string().required('Descripcion es requerido'),
    fechaPublicacion: Yup.date().required('Fecha de publicacion es requerido'),
  });

export default schemaCreateBook;