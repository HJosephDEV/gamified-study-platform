<template>
  <div class="register-activities-view__container">
    <div class="register-activities-view__content">
      <h1 v-if="showActivities">Gerenciar atividades</h1>
      <h1 v-if="showForm && !Object.keys(selectedActivity).length">Cadastrar atividades</h1>
      <h1 v-if="showForm && Object.keys(selectedActivity).length">Gerenciar atividade</h1>

      <div class="register-activities-view__card">
        <ActivitiesList v-if="showActivities" />
        <ActivitiesRegisterForm v-if="showForm" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";

import ActivitiesList from "./components/ActivitiesList.vue";
import ActivitiesRegisterForm from "./components/ActivitiesRegisterForm.vue";
import { useRegisterActivitiesStore } from "@/stores/RegisterActivitiesStore";
import { onUnmounted } from "vue";

const registerActivitiesStore = useRegisterActivitiesStore();
const { $resetRegisterActivities } = registerActivitiesStore;
const { showActivities, showForm, selectedActivity } = storeToRefs(registerActivitiesStore);

onUnmounted(() => $resetRegisterActivities());
</script>

<style lang="scss" scoped>
.register-activities-view__container {
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  .register-activities-view__content {
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

    .register-activities-view__card {
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
