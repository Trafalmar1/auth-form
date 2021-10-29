import Container from "react-bootstrap/Container";

import { LoginPage } from "pages";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Container style={{ minHeight: "100vh" }}>
      <LoginPage />
    </Container>
  );
}

export default App;
