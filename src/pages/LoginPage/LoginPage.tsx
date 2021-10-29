import { Row, Button, Col } from "react-bootstrap";
import { Formik, FormikHelpers, Form } from "formik";
import * as Yup from "yup";

import { Input } from "components";

import styles from "./styles.module.scss";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Password is too Short!")
    .max(50, "Password is too Long!")
    .required("Required"),
});

interface LoginFormData {
  email: string;
  password: string;
}

const initialValues: LoginFormData = { email: "", password: "" };

export default function LoginPage() {
  const submitHandler = (
    values: LoginFormData,
    actions: FormikHelpers<LoginFormData>
  ) => {
    const stringValues = JSON.stringify(values, null, 2);

    alert(`Logged in successfuly: ${stringValues}`);
    // actions.resetForm();
    actions.setSubmitting(false);
  };

  return (
    <Row
      className={"full-height-page justify-content-center align-items-center"}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={submitHandler}
        validationSchema={LoginSchema}
      >
        {({ errors, resetForm, touched }) => (
          <Form className={styles.form}>
            <Input
              name={"email"}
              placeholder={"Enter email"}
              type={"email"}
              label={"Email"}
              error={errors["email"]}
              touched={touched["email"]}
            />
            <Input
              name={"password"}
              type={"password"}
              placeholder={"Enter password"}
              label={"Password"}
              error={errors["password"]}
              touched={touched["password"]}
            />
            <Row className="mt-5">
              <Col>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Col>
              <Col className="text-end">
                <Button variant="outline-primary" onClick={() => resetForm()}>
                  Reset form
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </Row>
  );
}