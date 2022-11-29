const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },

  {
    path: "/make_events",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("../pages/MakeEventsShow/MakeEventsIndex.vue"),
      },
    ],
  },
  {
    path: "/empresa",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "adicionar",
        component: () => import("../pages/Empresa/NovaEmpresa.vue"),
      },
      {
        path: "editar/:empresa_id",
        component: () => import("../pages/Empresa/EditEmpresa.vue"),
        props: true,
      },
      {
        path: "show/:empresa_id",
        component: () => import("../pages/Empresa/ShowEmpresa.vue"),
        props: true,
      },
      {
        path: "lista",
        component: () => import("../pages/Empresa/ListaEmpresa.vue"),
        props: true,
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
