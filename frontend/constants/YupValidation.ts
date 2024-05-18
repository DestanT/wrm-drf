import * as yup from 'yup';

// Schema's for the forms - https://react-hook-form.com/get-started#SchemaValidation
export const loginValidation = yup
  .object({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
  })
  .required();
