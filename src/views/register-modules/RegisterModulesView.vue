<template>
  <div class="register-modules-view__container">
    <div class="register-modules-view__content">
      <h1 v-if="showModules">Gerenciar módulos</h1>
      <h1 v-if="showForm && !Object.keys(selectedModule).length">Cadastrar módulo</h1>
      <h1 v-if="showForm && Object.keys(selectedModule).length">Gerenciar módulo</h1>

      <div class="register-modules-view__card">
        <ModulesList v-if="showModules" />
        <ModulesRegisterForm v-if="showForm" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";

import { useRegisterModulesStore } from "@/stores/RegisterModulesStore";

import ModulesRegisterForm from "./components/ModulesRegisterForm.vue";
import ModulesList from "./components/ModulesList.vue";

const registerModulesStore = useRegisterModulesStore();
const { showModules, showForm, selectedModule } = storeToRefs(registerModulesStore);
</script>

<style lang="scss" scoped>
.register-modules-view__container {
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  .register-modules-view__content {
    width: 100%;
    max-width: 720px;
    display: flex;
    flex-direction: column;

    h1 {
      color: #fff;
      font-size: 24px;
      font-weight: 600;
      line-height: normal;
    }

    .register-modules-view__card {
      width: 100%;
      background: #212121;
      margin-top: 24px;
      padding: 24px;
      border-radius: 6px;
      border: 1px solid #ffe500;
    }
  }
}

@media (max-width: 550px) {
  .settings-view__container {
    .settings-view__content {
      h1 {
        font-size: 18px;
      }
    }
  }
}
</style>
