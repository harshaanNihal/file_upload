import React from "react";
import Main from "./components/Main";
import { UserAuthProvider } from "./contexts/userAuth";


const App = props => (
  <UserAuthProvider >
    <Main {...props} />
  </UserAuthProvider>
);

export default App;
