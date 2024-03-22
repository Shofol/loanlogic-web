// ** React Imports
import { useEffect, useState, createContext } from "react";
import { agenciasValues } from "../../configs/data";

// ** Create Context
const UserContext = createContext();

const UserProvider = ({ children }) => {
  // ** State
  const [user, setUser] = useState({});

  //** ComponentDidMount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      let updatedAgencies = [];
      user.agency.map((ag) => {
        updatedAgencies = [
          ...updatedAgencies,
          agenciasValues.filter((agency) => agency.value === ag)[0]
        ];
      });
      user.agency = updatedAgencies;
    }
    setUser(user);
  }, []);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export { UserProvider, UserContext };
