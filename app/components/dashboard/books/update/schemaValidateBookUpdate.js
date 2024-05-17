import * as Yup from 'yup';

const schemaUpdateBook = Yup.object().shape({
  title: Yup.string(),
  subtitulo: Yup.string(),
  n_asignatura: Yup.string(),
  codBook: Yup.string(),
  author: Yup.string(),
  materia: Yup.string(),
  publisher: Yup.string(),
  ISBN: Yup.string(),
  ISSN: Yup.string(),
  status: Yup.boolean(),
  unidad: Yup.number(),
  numberPages: Yup.number(),
  language: Yup.string(),
  description: Yup.string(),
  fechaPublicacion: Yup.date(),
});

export default schemaUpdateBook;