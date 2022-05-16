import React, { useState } from "react";
import logo from "images/logo.png";

import { Form, Formik } from "formik";
import { Button } from "@bigbinary/neetoui";
import { Input } from "@bigbinary/neetoui/formik";

import { login } from "./action";
import {
  LOGIN_INITIAL_VALUES,
  LOGIN_VALIDATION_SCHEMA,
} from "./constant";
import { useUserAuthDispatch } from "../../contexts/userAuth";
import { toast } from "react-toastify";

const Login = ({history}) => {
  const [submitted, setSubmitted] = useState(false);
  const userAuthDispatch = useUserAuthDispatch();

  const handleSubmit = async ({ email, password }) => {
    try {
      const {
        data: { auth_token, user },
      } = await login({ email, password });

      userAuthDispatch({ type: "LOGIN", payload: { auth_token, email, user } })
      toast.success("Login Successful")
      history.push('/',{replace: true});
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="flex h-screen w-screen flex-row items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-100 p-6">
      <div className="mx-auto flex h-full w-full flex-col items-center justify-center sm:max-w-md">
        <h2 className="mb-5 text-center text-3xl font-extrabold text-gray-800">
          Sign In
        </h2>
        <Formik
          initialValues={LOGIN_INITIAL_VALUES}
          validateOnBlur={submitted}
          validateOnChange={submitted}
          onSubmit={handleSubmit}
          validationSchema={LOGIN_VALIDATION_SCHEMA}
        >
          {({ isSubmitting }) => (
            <Form className="w-full space-y-6 rounded-md border bg-white p-8 shadow">
              <img src={logo} alt="logo" className="center mx-auto" />
              <Input
                required
                name="email"
                label="Email"
                type="email"
                placeholder="oliver@example.com"
                data-cy="login-email-text-field"
              />
              <Input
                required
                name="password"
                label="Password"
                type="password"
                placeholder="******"
                data-cy="login-password-text-field"
              />
              <Button
                fullWidth
                type="submit"
                label="Login"
                data-cy="login-submit-button"
                className="h-8"
                loading={isSubmitting}
                disabled={isSubmitting}
                onClick={() => setSubmitted(true)}
              />
            </Form>
          )}
        </Formik>
        <div className="mt-4 flex flex-col items-center justify-center space-y-2">
          <div className="flex flex-row items-center justify-start space-x-1">
            <p className="font-normal text-gray-600">Don't have an account?</p>
            <Button
              label="Signup"
              style="link"
              to={'/signup'}
              data-cy="sign-up-link"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
