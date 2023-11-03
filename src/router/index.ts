import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import DashboardView from "@/views/dashboard/DashboardView.vue";
import LoginView from "@/views/login/LoginView.vue";
import RegisterView from "@/views/register/RegisterView.vue";
import SettingsView from "@/views/settings/SettingsView.vue";
import TasksView from "@/views/tasks/TasksView.vue";
import TaskView from "@/views/task/TaskView.vue";
import LoggedLayout from "@/layouts/logged-layout/LoggedLayout.vue";
import RegisterModulesView from "@/views/register-modules/RegisterModulesView.vue";
import RegisterAvatarsView from "@/views/register-avatars/RegisterAvatarsView.vue";

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
  },
  {
    path: "/settings",
    name: "settings",
    component: SettingsView,
    meta: {
      layout: LoggedLayout
    }
  },
  {
    path: "/module/:moduleId/tasks",
    name: "module",
    component: TasksView,
    meta: {
      layout: LoggedLayout
    }
  },
  {
    path: "/module/:moduleId/task/:taskId",
    name: "task",
    component: TaskView,
    meta: {
      layout: LoggedLayout
    }
  },
  {
    path: "/register-modules",
    name: "registerModules",
    component: RegisterModulesView,
    meta: {
      layout: LoggedLayout
    }
  },
  {
    path: "/register-activities/:moduleId",
    name: "registerActivities",
    component: RegisterModulesView,
    meta: {
      layout: LoggedLayout
    }
  },
  {
    path: "/register-avatars",
    name: "registerAvatars",
    component: RegisterAvatarsView,
    meta: {
      layout: LoggedLayout
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
