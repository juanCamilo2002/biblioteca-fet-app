import * as Yup from 'yup';

const schemaCreateUser = Yup.object().shape({
  name: Yup.string()
    .required('Nombre es requerido'),
  email: Yup.string()
    .email('Correo electrónico no válido')
    .test('is-fet-domain', 'El dominio permitido @fet.edu.co', (value) => {
      if (!value) return true;
      return value.endsWith('@fet.edu.co');
    })
    .required('Correo electrónico es requerido'),
  telefono: Yup.string()
    .min(10, 'Teléfono debe tener al menos 10 caracteres')
    .max(10, 'Teléfono debe tener máximo 10 caracteres'),
  semestre: Yup.string(),
  codigo: Yup.string(),
  Programa: Yup.string(),
  isAdmin: Yup.boolean(),
});


export default schemaCreateUser;