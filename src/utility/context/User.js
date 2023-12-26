// ** React Imports
import { createContext, useEffect, useState } from "react";
import { agenciasValues } from "../../configs/data";

// ** Create Context
const UserContext = createContext();

const UserProvider = ({ children }) => {
  // ** State
  const [user, setUser] = useState({});

  //** ComponentDidMount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    let updatedAgencies = [];
    if (user) {
      user.agency.map((ag) => {
        updatedAgencies = [
          ...updatedAgencies,
          agenciasValues.filter((agency) => agency.value === ag)[0]
        ];
      });
      user.agency = updatedAgencies;
      setUser(user);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export { UserContext, UserProvider };
