import React, { useState } from "react";
import logo from 'images/logo.png'
import { toast } from "react-toastify";

import { Sidebar as NeetoUISidebar } from "@bigbinary/neetoui/layouts";

import { APP_NAME, SIDENAV_LINKS } from "./constants";
import { logout } from "../../Authentication/action";
import { useUserAuth } from "../../../contexts/userAuth";

const Sidebar = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [{user}, userAuthDispatch] = useUserAuth();

  const handleLogout = async () => {
    try {
      await logout();
      userAuthDispatch({ type: "LOGOUT" });
      window.location.href = '/login';
      toast.success('Logout Successfully')
    } catch (error) {
      toast.error(error)
    }
  };

  const bottomLinks = [
    {
      label: "Logout",
      onClick: handleLogout,
    },
  ];

  return (
    <NeetoUISidebar
      isCollapsed={isSidebarCollapsed}
      navLinks={SIDENAV_LINKS}
      appName={APP_NAME}
      organizationInfo={{
        logo: <img src={logo} alt="logo" width="200" />,
        name: "EkAnek",
        subdomain: "ekanek.io",
      }}
      profileInfo={{
        name: `${user.first_name} ${user.last_name}`,
        imageUrl: user.profile_image_path,
        email: user.email,
        bottomLinks,
      }}
      onCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      changelogProps={{ id: "neetochangelog-trigger" }}
    />
  );
};

export default Sidebar;
