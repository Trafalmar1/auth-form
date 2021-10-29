import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";

import { Input } from "components";

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Password is too Short!")
    .max(50, "Password is too Long!")
    .required("Required"),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

interface SignUpFormData {
  email: string;
  password: string;
  passwordConfirmation: string;
}

const initialValues: SignUpFormData = {
  email: "",
  password: "",
  passwordConfirmation: "",
};

type SignUpProps = {
  onSignUp: VoidFunction;
};

function SignUp({ onSignUp }: SignUpProps) {
  const submitHandler = (
    values: SignUpFormData,
    actions: FormikHelpers<SignUpFormData>
  ) => {
    const stringValues = JSON.stringify(values, null, 2);
    alert(`Signed up successfuly: ${stringValues}`);
    actions.setSubmitting(false);
    actions.resetForm();
    onSignUp();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={submitHandler}
      validationSchema={SignUpSchema}
    >
      {({ errors, touched }) => (
        <Form>
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
          <Input
            name={"passwordConfirmation"}
            type={"password"}
            placeholder={"Enter same password"}
            label={"Repeat password"}
            error={errors["passwordConfirmation"]}
            touched={touched["passwordConfirmation"]}
          />
          <Button className="mt-2" variant="primary" type="submit">
            Sign up
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default SignUp;
