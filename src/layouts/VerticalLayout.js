// ** React Imports
import { Outlet } from "react-router-dom";

// ** Core Layout Import
// !Do not remove the Layout import
import Layout from "@layouts/VerticalLayout";

// ** Menu Items Array
import navigation from "@src/navigation/vertical";

import React, { useState, useEffect } from "react";

const VerticalLayout = (props) => {

  const [user, setUser] = useState();
  const [filteredMenu, setFilteredMenu] = useState();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    const newUser = JSON.parse(localStorage.getItem("user"));
    setUser(newUser);

    console.log("Vertical Layout -> navigation")
    console.log("newUser", newUser)

    let filteredMenuTemp = [];
    navigation.map((element) => {

      console.log("element.role", element.role)
      console.log("newUser.role", newUser.role)

      if (element.role.includes(newUser.role)) filteredMenuTemp.push(element)

    });
    setFilteredMenu(filteredMenuTemp)
    console.log("filteredMenu", filteredMenuTemp)
  };


  // const [menuData, setMenuData] = useState([])

  // ** For ServerSide navigation
  // useEffect(() => {
  //   axios.get(URL).then(response => setMenuData(response.data))
  // }, [])

  //let adminMenu = 0;
  //if(newUser.role == "ADMIN") adminMenu = 1;



  return (
    <Layout menuData={filteredMenu} {...props}>
      <Outlet />
    </Layout>
  );
};

export default VerticalLayout;
