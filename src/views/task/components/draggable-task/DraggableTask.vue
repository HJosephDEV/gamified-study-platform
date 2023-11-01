<template>
  <TaskCard>
    <div class="draggable-task__container">
      <div class="draggable-task__task">
        {{ question.statement }}
      </div>

      <span class="helper-text">Arraste os itens para a área amarela</span>

      <div class="draggable-task__options"></div>

      <AppButton @click="answerQuestion">Responder</AppButton>
    </div>
  </TaskCard>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import TaskCard from "../task-card/TaskCard.vue";
import AppButton from "@/components/app-button/AppButton.vue";

const question = ref({
  statement: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
          galley of type and scrambled it to $answer - $answer - $answer a type specimen book. It has survived not only five
          centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
          It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
          passages, and more recently with desktop publishing software like Aldus PageMaker including
          versions of Lorem Ipsum.`,
  options: [
    { id: 1, image: "/src/assets/images/pixel-art.png" },
    { id: 2, image: "/src/assets/images/pixel-art.png" },
    { id: 3, image: "/src/assets/images/pixel-art.png" },
    { id: 4, image: "/src/assets/images/pixel-art.png" }
  ]
});

const isDragging = ref(false);
const handleIsDragging = (value: boolean) => (isDragging.value = value);

const answerQuestion = () => {
  console.log(question.value.options);
};

const dragOptions = {
  animation: 0,
  group: "description",
  disabled: false,
  ghostClass: "ghost"
};
</script>

<style lang="scss">
.flip-list-move {
  transition: transform 0.5s;
}
</style>

<style lang="scss" scoped>
.draggable-task__container {
  display: flex;
  flex-direction: column;
  align-items: center;

  .draggable-task__task {
    font-size: 14px;
    line-height: normal;
  }

  .helper-text {
    font-size: 12px;
    color: #ff6363;
    margin-top: 24px;
  }

  .draggable-task__options {
    margin-top: 48px;
    display: flex;
    flex-direction: column;

    .list-group {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-bottom: 36px;
      .list-group-item {
        .image-option {
          height: 350px;
          width: 350px;
        }
      }
    }
  }
}
</style>
