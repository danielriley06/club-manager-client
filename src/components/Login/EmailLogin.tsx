import * as React from "react";
import { InjectedRouterNode, withRoute } from "react-router5";
import {
  Formik,
  FormikProps,
  FormikActions,
  Form,
  Field,
  FieldProps
} from "formik";
import ky from "ky";
import get from "lodash/get";

import { InputWrapper, LargeInput, InputRow, InputError } from "./styles";
import { Button } from "antd";
import { setAuthorizationToken } from "../../utils/authentication";

export interface LoginProps extends InjectedRouterNode {}

interface LoginFormValues {
  auth: {
    email: string;
    password: string;
  };
}

interface LoginFormErrors {
  email?: string;
  password?: string;
  submit?: string;
}

class EmailLogin extends React.Component<LoginProps, any> {
  handleSubmit = async (values, actions) => {
    const { router } = this.props;
    const requestUrl = `${process.env.REACT_APP_API_URL}/user_token`;
    const request = await ky.post(requestUrl, { json: { ...values } });
    if (request.status === 201) {
      const response = await request.json();
      setAuthorizationToken(response.jwt);
      router.navigate("dashboard");
    }
    actions.setSubmitting(false);
    actions.setErrors({ submit: "Incorrect email or password." });
  };

  public render() {
    return (
      <Formik
        initialValues={{
          auth: {
            email: "",
            password: ""
          }
        }}
        validate={(values: LoginFormValues) => {
          const errors: LoginFormErrors = {};
          if (!values.auth.email) {
            errors.email = "Whoops! Email is required.";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.auth.email)
          ) {
            errors.email = "Invalid email address";
          }
          if (!values.auth.password) {
            errors.password = "Whoops! Password is required.";
          }
          return errors;
        }}
        onSubmit={(
          values: LoginFormValues,
          actions: FormikActions<LoginFormValues>
        ) => this.handleSubmit(values, actions)}
        render={({
          isSubmitting,
          isValidating,
          errors,
          submitCount
        }: FormikProps<LoginFormValues>) => {
          const emailError = get(errors, "email", null);
          const passwordError = get(errors, "password", null);
          const submitError = get(errors, "submit", null);
          const isSubmitted = submitCount >= 1;
          return (
            <Form noValidate>
              {submitError}
              <InputRow>
                <Field
                  name="auth.email"
                  render={({ field, form }: FieldProps<LoginFormValues>) => (
                    <InputWrapper>
                      <LargeInput type="email" {...field} placeholder="Email" />
                      {isSubmitted && emailError && (
                        <InputError>{emailError}</InputError>
                      )}
                    </InputWrapper>
                  )}
                />
              </InputRow>
              <InputRow>
                <Field
                  name="auth.password"
                  render={({ field, form }: FieldProps<LoginFormValues>) => (
                    <InputWrapper>
                      <LargeInput
                        type="password"
                        {...field}
                        placeholder="Password"
                      />
                      {isSubmitted && passwordError && (
                        <InputError>{passwordError}</InputError>
                      )}
                    </InputWrapper>
                  )}
                />
              </InputRow>
              <InputRow>
                <Button
                  size="large"
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                  loading={isSubmitting || isValidating}
                >
                  Login
                </Button>
              </InputRow>
              <InputRow>
                <a href="#">Forgot your password?</a>
              </InputRow>
            </Form>
          );
        }}
      />
    );
  }
}

export default withRoute(EmailLogin);
