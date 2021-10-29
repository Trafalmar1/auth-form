import { Field } from "formik";
import { Form } from "react-bootstrap";

type InputProps = {
  name: string;
  value?: string;
  error?: string;
  type?: string;
  placeholder?: string;
  label?: string;
  touched?: boolean;
};

function Input({
  name,
  error,
  touched,
  placeholder,
  type = "text",
  label,
}: InputProps) {
  return (
    <Form.Group className="mb-3">
      {!!label && <Form.Label>{label}</Form.Label>}
      <Field
        className={"form-control mb-1"}
        type={type}
        name={name}
        placeholder={placeholder}
      />
      {!!error && touched && (
        <Form.Text className="text-danger ">{error}</Form.Text>
      )}
    </Form.Group>
  );
}

export default Input;
