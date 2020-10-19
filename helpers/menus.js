const Menu = [
  { header: "Apps" },
  {
    title: "Dashboard",
    group: "apps",
    icon: "mdi-view-dashboard",
    name: "Dashboard",
    href: "/admin",
    roles: "Super Admin|Admin|Gestor"
  },
  { header: "Sistema" },

  {
    title: "Contas e Utilizadores",
    group: "sys",
    component: "sys",
    icon: "mdi-account-multiple",

    items: [
      {
        name: "users",
        title: "Utilizadores",
        href: "/admin/users",
        roles: "Super Admin|Admin|Gestor"
      }
    ]
  },

  { header: "Recursos Interno" },

  {
    title: "Empresa e Negócios",
    group: "buisnis",
    component: "buisnis",
    icon: "mdi-domain",
    items: [
      {
        name: "companies",
        title: "Empresa",
        href: "/admin/companies",
        roles: "Super Admin|Admin|Gestor"
      },
      {
        name: "properties",
        title: "Propriedades",
        href: "/admin/properties",
        roles: "Super Admin|Admin|Gestor"
      },
      {
        name: "publicities",
        title: "Publicidades",
        href: "/admin/publicities",
        roles: "Super Admin|Admin|Gestor"
      }
    ]
  },
  { header: "Integrações" },

  {
    title: "Redes Sociais",
    group: "social",
    component: "social",
    icon: "mdi-vector-link",
    items: [
      {
        name: "facebook",
        title: "Facebook",
        href: "/admin/integration/facebook",
        roles: "Super Admin|Admin|Gestor"
      }
    ]
  },

  { header: "UI Elements" },

  { divider: true },
  { header: "Extras" },
  {
    title: "Login",
    group: "extra",
    icon: "mdi-login",
    href: "/",
    roles: "Admsin|Gesetor"
  }
];
// reorder menu
// Menu.forEach(item => {
//   if (item.items) {
//     item.items.sort((x, y) => {
//       let textA = x.title.toUpperCase();
//       let textB = y.title.toUpperCase();
//       return textA < textB ? -1 : textA > textB ? 1 : 0;
//     });
//   }
// });

export default Menu;
