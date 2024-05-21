import * as yup from 'yup';

// Schema's for the forms - https://react-hook-form.com/get-started#SchemaValidation
export const loginValidation = yup
  .object({
    username: yup.string().required('Username is required.'),
    password: yup.string().required('Password is required.'),
  })
  .required();

export const signUpValidation = yup
  .object({
    username: yup.string().required('Username is required.'),
    password: yup
      .string()
      .min(8, 'Password must be a minimum of 8 characters long.')
      .required('Password is required.'),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match.')
      .required('Confirm your password.'),
  })
  .required();
