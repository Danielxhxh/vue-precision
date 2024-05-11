import { createRouter, createWebHistory } from "vue-router";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/login",
      component: () => import("../views/Login.vue"),
    },
    {
      path: "/",
      component: () => import("../views/MainPage.vue"),
    },
    {
      path: "/get-results",
      component: () => import("../views/GetResults.vue"),
    },
    {
      path: "/add-patient",
      component: () => import("../views/AddPatient.vue"),
    },
  ],
});
