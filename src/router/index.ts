import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home";
import page404 from "../views/Page404";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "Home",
    component: Home
  },
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  //component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  {
    path: "/:catchAll(.*)", // 之前使用* 新版vue-router-next 需要使用此方法
    name: "page404",
    component: page404
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
