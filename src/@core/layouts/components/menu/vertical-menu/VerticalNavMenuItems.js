// ** Vertical Menu Components
import VerticalNavMenuLink from "./VerticalNavMenuLink";
import VerticalNavMenuGroup from "./VerticalNavMenuGroup";
import VerticalNavMenuSectionHeader from "./VerticalNavMenuSectionHeader";

// ** Utils
import {
  resolveVerticalNavMenuItemComponent as resolveNavItemComponent
  // canViewMenuGroup
} from "@layouts/utils";
import { useEffect, useState } from "react";

const VerticalMenuNavItems = (props) => {
  const [items, setItems] = useState([]);
  const [user, setUser] = useState();
  useEffect(() => {
    getUser();
    const tempItems = [...props.items];
    setItems(tempItems);
  }, []);

  const getUser = () => {
    const newUser = JSON.parse(localStorage.getItem("user"));
    setUser(newUser);
  };

  // ** Components Object
  const Components = {
    VerticalNavMenuLink,
    VerticalNavMenuGroup,
    VerticalNavMenuSectionHeader
  };

  // ** Render Nav Menu Items
  const RenderNavItems = items.map((item, index) => {
    const TagName = Components[resolveNavItemComponent(item)];
    const tempItem = { ...item };
    // checking the role to show/hide items in group
    if (tempItem.children) {
      // console.log(item.children);
      if (user) {
        tempItem.children = tempItem.children.filter((child) => {
          // skipping items which doesn't have specific role mentioned
          if (child.role) {
            if (child.role.includes(user.role)) {
              return true;
            } else {
              return false;
            }
          } else {
            return true;
          }
        });
      }
      return (
        // canViewMenuGroup(item) && (
        <TagName item={tempItem} index={index} key={item.id} {...props} />
        // )
      );
    }
    return <TagName key={item.id || item.header} item={item} {...props} />;
  });

  return RenderNavItems;
};

export default VerticalMenuNavItems;
