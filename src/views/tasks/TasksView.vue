<template>
  <div class="tasks-view__container">
    <div class="tasks-view__content">
      <h1 class="tasks-view__module-name">Variáveis</h1>
      <ProgressBar :percentage="75" />
      <TasksCard />
    </div>
  </div>
</template>

<script lang="ts" setup>
import ProgressBar from "@/components/progress-bar/ProgressBar.vue";
import TasksCard from "./components/tasks-card/TasksCard.vue";
</script>

<style lang="scss" scoped>
.tasks-view__container {
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  .tasks-view__content {
    width: 100%;
    max-width: 626px;
    display: flex;
    flex-direction: column;

    .tasks-view__module-name {
      color: #fff;
      font-size: 24px;
      font-weight: 600;
      line-height: normal;
      margin-bottom: 4px;
    }
  }
}
</style>
