import Vue from "vue";
import Router from "vue-router";

import Index from "@/pages/index";
import Admin from "@/pages/admin/index";
import Dashboard from "@/pages/admin/dashboard";
import Users from "@/pages/admin/users/index";
import CreateUser from "@/pages/admin/users/CreateUser";
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
             component: Users,
             name: "users",
             meta: {
               title: "Utilizadores",
               icon: "user",
               affix: true
             },
             children: [
               {
                 path: "/admin/users/criar",
                 component: CreateUser,
                 name: "create-user",
                 meta: {
                   title: "Criar Utilizador",
                   icon: "user",
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
