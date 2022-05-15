import React, { useState } from "react";

import { Form, Formik } from "formik";
import * as yup from "yup";
import { Button } from "@bigbinary/neetoui";
import { Input } from "@bigbinary/neetoui/formik";

import authenticationApi from "../../apis/authentication";

export const INITIAL_VALUES = {
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  passwordConfirmation: "",
};

export const VALIDATION_SCHEMA = yup.object().shape({
  email: yup.string().email("Invalid email address").required("Required"),
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  password: yup.string().required("Required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Required"),
});

const Signup = ({ history }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async formData => {
    try {
      const data = await authenticationApi.signup(formData);
      console.log(data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-screen w-screen flex-row items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-100 p-6">
      <div className="mx-auto flex h-full w-full flex-col items-center justify-center sm:max-w-md">
        <h2 className="mb-5 text-center text-3xl font-extrabold text-gray-800">
          Signup
        </h2>
        <Formik
          initialValues={INITIAL_VALUES}
          validateOnBlur={submitted}
          validateOnChange={submitted}
          onSubmit={handleSubmit}
          validationSchema={VALIDATION_SCHEMA}
        >
          {({ isSubmitting }) => (
            <Form className="w-full space-y-6 rounded-md border bg-white p-8 shadow">
              <Input
                required
                name="email"
                type="email"
                label="Email"
                placeholder="oliver@example.com"
              />
              <Input
                required
                name="firstName"
                type="text"
                label="First name"
                placeholder="Oliver"
              />
              <Input
                required
                name="lastName"
                type="text"
                placeholder="Smith"
                label="Last name"
              />
              <Input
                required
                name="password"
                type="password"
                label="Password"
                placeholder="******"
              />
              <Input
                required
                name="passwordConfirmation"
                type="password"
                label="Confirm password"
                placeholder="******"
              />
              <Button
                fullWidth
                type="submit"
                onClick={() => setSubmitted(true)}
                className="h-8"
                loading={isSubmitting}
                disabled={isSubmitting}
                label="Signup"
              />
            </Form>
          )}
        </Formik>
        <div className="mt-4 flex flex-row items-center justify-start space-x-1">
          <p className="font-normal text-gray-600">Already have an account?</p>
          <Button label="Login" style="link" to={'/login'} />
        </div>
      </div>
    </div>
  );
};

export default Signup;
