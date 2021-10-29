import { useContext, useState } from "react";
import { Row, Button, Col } from "react-bootstrap";
import { Formik, FormikHelpers, Form } from "formik";
import * as Yup from "yup";

import { CenteredModal, Input } from "components";
import SignUp from "./SingUp/SignUp";
import { UsersContext } from "../../App"; //No

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
  const [showModal, setShowModal] = useState(false);
  const { users } = useContext(UsersContext);

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const submitHandler = (
    values: LoginFormData,
    actions: FormikHelpers<LoginFormData>
  ) => {
    const stringValues = JSON.stringify(values, null, 2);
    const userExists =
      users.filter(
        (user) =>
          user.email === values.email && user.password === values.password
      ).length > 0;
    if (!userExists) {
      actions.setSubmitting(false);
      actions.setStatus({
        password: "Wrong email or password",
      });
      return;
    }
    actions.resetForm();
    alert(`Logged in successfuly: ${stringValues}`);
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
        {({ errors, touched, status }) => (
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
              status={status?.["password"]}
            />
            <Row className="mt-5">
              <Col>
                <Button variant="primary" type="submit">
                  Log in
                </Button>
              </Col>
              <Col className="text-end">
                <Button variant="outline-success" onClick={toggleModal}>
                  Sign-up
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
      <CenteredModal show={showModal} onToggle={toggleModal}>
        <SignUp onSignUp={toggleModal} />
      </CenteredModal>
    </Row>
  );
}
