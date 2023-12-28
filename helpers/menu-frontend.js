const getMenuFrontend = (role = "USER_ROLE") => {
  const menu = [
    {
      title: "Dashboard",
      icon: "mdi mdi-gauge",
      submenu: [
        { title: "Main", url: "/" },
        { title: "ProgressBar", url: "progress" },
        { title: "Graphics", url: "graphic1" },
      ],
    },
    {
      title: "Maintenance",
      icon: "mdi mdi-folder-lock-open",
      submenu: [
        // { title: 'Users', url: 'users' },
        { title: "Hospitals", url: "hospitals" },
        { title: "Doctors", url: "doctors" },
      ],
    },
  ];

  if (role === "ADMIN_ROLE") {
    menu[1].submenu.unshift({ title: "Users", url: "users" });
  }

  return menu;
};

module.exports = {
  getMenuFrontend,
};
