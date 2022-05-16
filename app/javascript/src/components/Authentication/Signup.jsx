import React, { useState } from "react";
import { Form, Formik } from "formik";
import logo from "images/logo.png";
import * as yup from "yup";
import { Button } from "@bigbinary/neetoui";
import { Input } from "@bigbinary/neetoui/formik";

import {signup} from "./action";
import { SIGNUP_INITIAL_VALUES, SIGNUP_VALIDATION_SCHEMA } from "./constant";
import { toast } from "react-toastify";

const Signup = ({ history }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async formData => {
    try {
      const data = await signup(formData);
      history.push("/login");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="flex h-screen w-screen flex-row items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-100 p-6">
      <div className="mx-auto flex h-full w-full flex-col items-center justify-center sm:max-w-md">
        <h2 className="mb-5 text-center text-3xl font-extrabold text-gray-800">
          Signup
        </h2>
        <Formik
          initialValues={SIGNUP_INITIAL_VALUES}
          validateOnBlur={submitted}
          validateOnChange={submitted}
          onSubmit={handleSubmit}
          validationSchema={SIGNUP_VALIDATION_SCHEMA}
        >
          {({ isSubmitting }) => (
            <Form className="w-full space-y-6 rounded-md border bg-white p-8 shadow">
            <img src={logo} alt="logo" className="center mx-auto" />
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
