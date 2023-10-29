<template>
  <li
    :class="['module-task__container ellipsis', { completed: isCompleted }]"
    @click="redirectToTask"
  >
    <span class="module-task__name">
      {{ taskName }}
    </span>

    <span
      v-if="isCompleted"
      class="module-task__completed-text"
      >✓</span
    >
  </li>
</template>

<script lang="ts" setup>
import router from "@/router";

import type { ModuleTaskProps } from "@/@types/views/Tasks";

const { taskId, taskName, isCompleted } = defineProps<ModuleTaskProps>();

const redirectToTask = () =>
  router.push({
    name: "task",
    params: {
      taskId
    }
  });
</script>

<style lang="scss" scoped>
.module-task__container {
  padding: 15px 12px;
  border-radius: 6px;
  background: linear-gradient(100deg, #fff 42.44%, #ffe500 66.39%);
  cursor: pointer;
  transition: all 0.5s ease;
  position: relative;

  &.completed {
    background: #31ff6d !important;
  }

  .module-task__name {
    color: #212121;
    font-family: Poppins;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  .module-task__completed-text {
    color: #000;
    font-family: Poppins;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;

    position: absolute;
    top: -5px;
    right: 2px;
  }

  &.ellipsis {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  &:hover {
    background: #ffe500;
    animation: taskHover 0.5s linear infinite;
  }

  @keyframes taskHover {
    100% {
      background: #ffe500;
      opacity: 0.4;
    }
  }
}
</style>
