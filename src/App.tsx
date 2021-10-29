import Container from "react-bootstrap/Container";

import { LoginPage } from "pages";

import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";

type User = {
  email: string;
  password: string;
};

type UserContext = {
  users: User[];
  addUser: (user: User) => void;
};

const users: UserContext = { users: [], addUser: () => {} };

export const UsersContext = React.createContext(users);

function App() {
  const [users, setUsers] = useState<User[]>([]);

  const addUser = (user: User) => {
    setUsers((prev) => [...prev, user]);
  };

  return (
    <UsersContext.Provider value={{ users, addUser }}>
      <Container style={{ position: "relative", minHeight: "100vh" }}>
        <ul className="users-tracker">
          <strong>Users</strong>
          {users.map((user, i) => (
            <li key={`${user.email}-${i}`}>{user.email}</li>
          ))}
        </ul>
        <LoginPage />
      </Container>
    </UsersContext.Provider>
  );
}

export default App;
