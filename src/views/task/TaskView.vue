<template>
  <div class="task-view__container">
    <div class="task-view__content">
      <h1 class="task-view__module-name">Variáveis</h1>
      <ProgressBar :percentage="75" />
      <!-- <MultipleChoiceTask /> -->
      <DraggableTask />
    </div>
  </div>
</template>

<script lang="ts" setup>
import ProgressBar from "@/components/progress-bar/ProgressBar.vue";
import DraggableTask from "./components/draggable-task/DraggableTask.vue";
// import MultipleChoiceTask from "./components/multiple-choice-task/MultipleChoiceTask.vue";
</script>

<style lang="scss" scoped>
.task-view__container {
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  .task-view__content {
    width: 100%;
    max-width: 626px;
    display: flex;
    flex-direction: column;

    .task-view__module-name {
      color: #fff;
      font-size: 24px;
      font-weight: 600;
      line-height: normal;
      margin-bottom: 4px;
    }
  }
}
</style>
