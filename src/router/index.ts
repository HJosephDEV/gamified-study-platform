import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import DashboardView from "@/views/dashboard/DashboardView.vue";
import LoginView from "@/views/login/LoginView.vue";
import RegisterView from "@/views/register/RegisterView.vue";
import LoggedLayout from "@/layouts/logged-layout/LoggedLayout.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "dashboard",
    component: DashboardView,
    meta: {
      layout: LoggedLayout
    }
  },
  {
    path: "/login",
    name: "login",
    component: LoginView
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
