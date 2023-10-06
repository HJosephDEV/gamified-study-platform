<template>
  <div class="task-card__container">
    <BackButton class="task-card__back-button" />
    <h2 class="task-card__title">Tarefas</h2>
    <ul class="task-card__task-list">
      <ModuleTask
        v-for="(moduleTask, index) in 5"
        :key="`module-task-${index}`"
        :task-id="1"
        task-name="Tokyo"
      />
    </ul>
    <AppButton is-full>Ver mais</AppButton>
  </div>
</template>

<script lang="ts" setup>
import AppButton from "@/components/app-button/AppButton.vue";
import BackButton from "@/components/back-button/BackButton.vue";
import ModuleTask from "../task/ModuleTask.vue";
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
    margin-top: 24px;
  }

  .task-card__task-list {
    display: grid;
    gap: 36px;
    grid-template-columns: 1fr 1fr;
    margin: 24px 0 36px;
  }
}
</style>
