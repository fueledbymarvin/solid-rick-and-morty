import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Search from "@/views/Search.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Search",
    component: Search,
  },
  {
    path: "/c/:id",
    name: "Character",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "character" */ "../views/Character.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
