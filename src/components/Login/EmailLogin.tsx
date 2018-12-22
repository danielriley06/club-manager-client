import {
  Field,
  FieldProps,
  Form,
  Formik,
  FormikActions,
  FormikErrors,
  FormikProps
} from "formik";
import ky from "ky";
import delay from "lodash/delay";
import get from "lodash/get";
import * as React from "react";
import { Route } from "react-router5";
import { Router } from "router5";

import { Button } from "antd";
import {
  getAuthorizationToken,
  setAuthorizationToken
} from "../../utils/authentication";
import { InputError, InputRow, InputWrapper, LargeInput } from "./styles";

export interface ILoginProps {
  router: Router;
}

interface ILoginFormValues {
  auth: {
    email: string;
    password: string;
    submitError?: string;
  };
}

class EmailLogin extends React.Component<ILoginProps, any> {
  public handleValidation = (values: ILoginFormValues) => {
    const errors: FormikErrors<ILoginFormValues> = {};
    if (!values.auth.email) {
      Object.assign({ auth: { email: "Whoops! Email is required." } }, errors);
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.auth.email)
    ) {
      Object.assign({ auth: { email: "Invalid email address" } }, errors);
    }
    if (!values.auth.password) {
      Object.assign(
        { auth: { password: "Whoops! Password is required." } },
        errors
      );
    }
    return errors;
  };
  public handleSubmit = async (
    values: ILoginFormValues,
    actions: FormikActions<ILoginFormValues>
  ) => {
    const { router } = this.props;
    const requestUrl = `${process.env.REACT_APP_API_URL}/user_token`;
    const request = await ky.post(requestUrl, { json: { ...values } });
    if (request.status === 201) {
      const response = await request.json();
      setAuthorizationToken(response.jwt);
      delay(() => {
        const token = getAuthorizationToken();
        console.log("dafuq?", token);
        actions.setSubmitting(false);
        router.navigate("dashboard.directory", {}, { reload: true });
        return;
      }, 1000);
    }
    actions.setSubmitting(false);
    actions.setErrors({
      auth: {
        submitError: "Incorrect email or password."
      }
    });
  };

  public renderForm = ({
    isSubmitting,
    isValidating,
    errors,
    submitCount
  }: FormikProps<ILoginFormValues>) => {
    const emailError = get(errors, "email", null);
    const passwordError = get(errors, "password", null);
    const submitError = get(errors, "submit", null);
    const isSubmitted = submitCount >= 1;
    return (
      <Form noValidate={true}>
        {submitError}
        <InputRow>
          <Field
            name="auth.email"
            render={({ field, form }: FieldProps<ILoginFormValues>) => (
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
            render={({ field, form }: FieldProps<ILoginFormValues>) => (
              <InputWrapper>
                <LargeInput type="password" {...field} placeholder="Password" />
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
        validate={this.handleValidation}
        onSubmit={this.handleSubmit}
        render={this.renderForm}
      />
    );
  }
}

export default () => (
  <Route>{({ router }) => <EmailLogin router={router} />}</Route>
);
