import React from "react";
import Application from "./pages/Application";
import UserProvider from "./components/UserProvider";
import { socket, socketContext } from "./utils/socketContext";
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

function App() {
  
  return (
    <UserProvider>
      <socketContext.Provider value={socket}>
        <ReactNotification />
      <Application />
      </socketContext.Provider>
    </UserProvider>
  );
}

export default App;