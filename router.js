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
import Posts from "@/pages/admin/posts/index";

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
        }
        //  {
        //    path: "/admin/institution/permissions",
        //    component: Permissions,
        //    name: "permissions",
        //    meta: {
        //      title: "Permissões",
        //      icon: "lock",
        //      affix: true
        //    }
        //  },
        //  {
        //    path: "/admin/institution/roles",
        //    component: Roles,
        //    name: "roles",
        //    meta: {
        //      title: "Papeis",
        //      icon: "lock",
        //      affix: true
        //    }
        //  }
      ]
    }

    //  {
    //    path: "/",
    //    component: Users,
    //    name: "users",
    //    meta: {
    //      title: "Utilizadores",
    //      icon: "user",
    //      affix: true
    //    },
    //    children: [
    //      {
    //        path: "/admin/users/criar",
    //        component: CreateUser,
    //        name: "create-user",
    //        meta: {
    //          title: "Criar Utilizador",
    //          icon: "user",
    //          affix: true
    //        }
    //      }
    //    ]
    //  }
  ],
  fallback: false,
  scrollBehavior: () => ({ y: 0 })
};

export function createRouter() {
  return new Router(routerOptions);
}
