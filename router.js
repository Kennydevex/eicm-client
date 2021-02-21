import Vue from "vue";
import Router from "vue-router";

import Index from "@/pages/index";
import Login from "@/pages/login/index";
import Register from "@/pages/register/index";
import About from "@/pages/institution/about";
import Histories from "@/pages/institution/histories";
import Teams from "@/pages/institution/teams";
import Courses from "@/pages/courses/index";
import ViewCourse from "@/pages/courses/view";
import Contacts from "@/pages/contacts/index";
import Blog from "@/pages/blog/index";
import ReadBlog from "@/pages/blog/read";
import Admin from "@/pages/admin/index";
import Dashboard from "@/pages/admin/dashboard";
import System from "@/pages/admin/system/index";
import Users from "@/pages/admin/system/users";
import Permissions from "@/pages/admin/system/permissions";
import Roles from "@/pages/admin/system/roles";
import Institution from "@/pages/admin/institution/index";
import School from "@/pages/admin/institution/school";
import CreateSchool from "@/pages/admin/institution/create-school";
import EditSchool from "@/pages/admin/institution/edit-school";
import Employees from "@/pages/admin/institution/employees";
import Charges from "@/pages/admin/institution/charges";
import Partners from "@/pages/admin/institution/partners";
import Testimonials from "@/pages/admin/institution/testimonials";
import Marks from "@/pages/admin/institution/marks";
import Murals from "@/pages/admin/institution/murals";
import Guidelines from "@/pages/admin/institution/guidelines";
import Formations from "@/pages/admin/formations/index";
import CoursesManager from "@/pages/admin/formations/courses";
import CreateCourse from "@/pages/admin/formations/create-course";
import EditCourse from "@/pages/admin/formations/edit-course";
import Families from "@/pages/admin/formations/families";
import Departaments from "@/pages/admin/formations/departaments";
import Disciplines from "@/pages/admin/formations/disciplines";
import Outcomes from "@/pages/admin/formations/outcomes";
import Cms from "@/pages/admin/cms/index";
import Articles from "@/pages/admin/cms/articles";
import CreateArticle from "@/pages/admin/cms/create-article";
import EditArticle from "@/pages/admin/cms/edit-article";
import Tags from "@/pages/admin/cms/tags";
import Categories from "@/pages/admin/cms/categories";
import Widgets from "@/pages/admin/widgets/index";
import Sliders from "@/pages/admin/widgets/sliders";

const emptyFn = () => {};
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort);
};

Vue.use(Router);

export const routerOptions = {
  mode: "history",
  base: decodeURI("/"),
  routes: [
    {
      path: "/",
      component: Index,
      name: "index",
      hidden: true
    },
    {
      path: "/login",
      component: Login,
      name: "login",
      hidden: true
    },
    {
      path: "/registar",
      component: Register,
      name: "register",
      hidden: true
    },
    {
      path: "/institution/sobre",
      component: About,
      name: "institution-about",
      hidden: true
    },
    {
      path: "/instituicao/historias",
      component: Histories,
      name: "institution-histories",
      hidden: true
    },

    {
      path: "/instituicao/equipe",
      component: Teams,
      name: "institution-teams",
      hidden: true
    },

    {
      path: "/cursos/:courses",
      component: Courses,
      name: "courses-courses",
      hidden: true
    },
    {
      path: "/curso/:slug",
      component: ViewCourse,
      name: "courses-ver-slug",
      hidden: true
    },

    {
      path: "/contactos",
      component: Contacts,
      name: "contacts",
      hidden: true
    },

    {
      path: "/blog",
      component: Blog,
      name: "blog",
      hidden: true
    },
    {
      path: "/blog/ler/:slug?",
      component: ReadBlog,
      name: "blog-ler-slug",
      hidden: true
    },
    {
      path: "/admin",
      component: Admin,
      name: "admin-index",
      hidden: true
    },
    {
      path: "/admin/dashboard",
      component: Dashboard,
      name: "dashboard",
      meta: {
        title: "Dashboard",
        icon: "menu",
        affix: true
      }
    },

    {
      path: "/",
      component: Institution,
      name: "institution",
      meta: {
        title: "Instituição",
        icon: "school",
        affix: true
      },
      children: [
        {
          path: "/admin/institution/school",
          component: School,
          name: "school",
          meta: {
            title: "Gestão da Escola",
            icon: "school",
            affix: true
          }
        },

        {
          path: "/admin/institution/schools/create",
          component: CreateSchool,
          name: "create-school",
          hidden: true,
          meta: {
            title: "Criar Instituição",
            icon: "tag",
            affix: true
          }
        },

        {
          path: "/admin/institution/schools/edit/:slug",
          component: EditSchool,
          name: "edit-school",
          hidden: true,
          meta: {
            title: "Editar Instituição",
            icon: "tag",
            affix: true
          }
        },

        {
          path: "/admin/institution/charges",
          component: Charges,
          name: "charges",
          meta: {
            title: "Gerir Cargos",
            icon: "tag",
            affix: true
          }
        },

        {
          path: "/admin/institution/collaborators",
          component: Employees,
          name: "employees",
          meta: {
            title: "Colaboradores",
            icon: "user",
            affix: true
          }
        },

        {
          path: "/admin/institution/partners",
          component: Partners,
          name: "partners",
          meta: {
            title: "Gestão de Parceiros",
            icon: "tag",
            affix: true
          }
        },

        {
          path: "/admin/institution/testimonials",
          component: Testimonials,
          name: "testimonials",
          meta: {
            title: "Testemunhos",
            icon: "tag",
            affix: true
          }
        },
        {
          path: "/admin/institution/marks",
          component: Marks,
          name: "marks",
          meta: {
            title: "Marcos Históricos",
            icon: "tag",
            affix: true
          }
        },
        {
          path: "/admin/institution/murals",
          component: Murals,
          name: "murals",
          meta: {
            title: "Murals",
            icon: "tag",
            affix: true
          }
        },
        {
          path: "/admin/institution/guidelines",
          component: Guidelines,
          name: "guidelines",
          meta: {
            title: "Diretrizes",
            icon: "tag",
            affix: true
          }
        }
      ]
    },

    {
      path: "/",
      component: Formations,
      name: "formations",
      meta: {
        title: "Formações",
        icon: "s-cooperation",
        affix: true
      },
      children: [
        {
          path: "/admin/formations/disciplines",
          component: Disciplines,
          name: "disciplines",
          meta: {
            title: "Disciplinas",
            icon: "tag",
            affix: true
          }
        },
        {
          path: "/admin/formations/courses",
          component: CoursesManager,
          name: "courses",
          meta: {
            title: "Gestão de Cursos",
            icon: "school",
            affix: true
          }
        },

        {
          path: "/admin/formations/courses/create",
          component: CreateCourse,
          name: "create-course",
          hidden: true,
          meta: {
            title: "Criar Curso",
            icon: "tag",
            affix: true
          }
        },
        {
          path: "/admin/formations/courses/edit/:slug",
          component: EditCourse,
          name: "edit-course",
          hidden: true,
          meta: {
            title: "Editar Curso",
            icon: "tag",
            affix: true
          }
        },
        {
          path: "/admin/formations/outcomes",
          component: Outcomes,
          name: "outcomes",
          meta: {
            title: "Gerir Perfis de Saída",
            icon: "tag",
            affix: true
          }
        },
        {
          path: "/admin/formations/departaments",
          component: Departaments,
          name: "departaments",
          meta: {
            title: "Departamentos",
            icon: "tag",
            affix: true
          }
        },
        {
          path: "/admin/formations/families",
          component: Families,
          name: "families",
          meta: {
            title: "Família dos Cursos",
            icon: "tag",
            affix: true
          }
        }
      ]
    },

    {
      path: "/",
      component: Cms,
      name: "comments",
      meta: {
        title: "Publicações",
        icon: "document",
        affix: true
      },
      children: [
        {
          path: "/admin/cms/articles",
          component: Articles,
          name: "articles",
          meta: {
            title: "Artigos",
            icon: "tag",
            affix: true
          }
        },

        {
          path: "/admin/cms/articles/create",
          component: CreateArticle,
          name: "create-article",
          hidden: true,
          meta: {
            title: "Criar Artigo",
            icon: "tag",
            affix: true
          }
        },

        {
          path: "/admin/cms/articles/edit/:slug",
          component: EditArticle,
          name: "edit-article",
          hidden: true,
          meta: {
            title: "Editar Artigo",
            icon: "tag",
            affix: true
          }
        },

        {
          path: "/admin/cms/tags",
          component: Tags,
          name: "tags",
          meta: {
            title: "Gerir Marcadores",
            icon: "tag",
            affix: true
          }
        },

        {
          path: "/admin/cms/categories",
          component: Categories,
          name: "categories",
          meta: {
            title: "Gerir Categorias",
            icon: "tag",
            affix: true
          }
        }
      ]
    },

    {
      path: "/",
      component: Widgets,
      name: "widgets",
      meta: {
        title: "Widgets",
        icon: "data-board",
        affix: true
      },
      children: [
        {
          path: "/admin/widgets/sliders",
          component: Sliders,
          name: "sliders",
          meta: {
            title: "Sliders",
            icon: "tag",
            affix: true
          }
        }
      ]
    },

    {
      path: "/",
      component: System,
      name: "system",
      meta: {
        title: "Sistema",
        icon: "s-tools",
        affix: true
      },
      children: [
        {
          path: "/admin/system/users",
          component: Users,
          name: "users",
          meta: {
            title: "Gestão de Utilizadores",
            icon: "user",
            affix: true
          }
        },
        {
          path: "/admin/system/permissions",
          component: Permissions,
          name: "permissions",
          meta: {
            title: "Permissões",
            icon: "lock",
            affix: true
          }
        },
        {
          path: "/admin/system/roles",
          component: Roles,
          name: "roles",
          meta: {
            title: "Papeis",
            icon: "lock",
            affix: true
          }
        }
      ]
    }
  ],
  fallback: false,
  scrollBehavior: () => ({ y: 0 })
};

export function createRouter() {
  return new Router(routerOptions);
}
