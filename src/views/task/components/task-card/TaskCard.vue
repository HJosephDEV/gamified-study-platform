<template>
  <div class="task-card__container">
    <BackButton
      class="task-card__back-button"
      @click="backToModule"
    >
      Voltar para atividades
    </BackButton>
    <h2 class="task-card__title">{{ title }}</h2>
    <slot />
  </div>
</template>

<script lang="ts" setup>
import router from "@/router";

import type { TaskCardProps } from "@/@types/views/Task";

import BackButton from "@/components/back-button/BackButton.vue";

const { title } = defineProps<TaskCardProps>();

const backToModule = () => {
  router.push({
    name: "module",
    params: {
      moduleId: router.currentRoute.value.params.moduleId
    }
  });
};
</script>

<style lang="scss" scoped>
.task-card__container {
  width: 100%;
  border-radius: 6px;
  border: 1px solid #ffe500;
  background: #212121;
  padding: 24px;
  margin-top: 24px;
  display: flex;
  flex-direction: column;

  .task-card__back-button {
    width: fit-content;
  }

  .task-card__title {
    color: #ffe500;
    font-size: 16px;
    font-weight: 600;
    line-height: normal;
    margin: 24px 0;
  }
}
</style>
