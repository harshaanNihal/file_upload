import * as yup from 'yup';
export const SIGNUP_INITIAL_VALUES = {
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  passwordConfirmation: "",
};

export const SIGNUP_VALIDATION_SCHEMA = yup.object().shape({
  email: yup.string().email("Invalid email address").required("Required"),
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  password: yup.string().required("Required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Required"),
});

export const LOGIN_INITIAL_VALUES = {
  email: "",
  password: "",
};

export const LOGIN_VALIDATION_SCHEMA = yup.object().shape({
  email: yup.string().email("Invalid email address").required("Required"),
  password: yup.string().required("Required"),
});
