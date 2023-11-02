import "../public/assets/scss/reset.scss";
import "../public/assets/scss/main.scss";

import type { ProviderAppProps } from "./@types/providers/App";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import "./router/middleware.ts";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");

app.provide<ProviderAppProps>("app", {
  $router: router
});
