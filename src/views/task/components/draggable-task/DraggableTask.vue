<template>
  <TaskCard :title="taskInfos.taskName">
    <div class="draggable-task__container">
      <div class="draggable-task__task">
        {{ taskInfos.taskContent }}
      </div>

      <span class="helper-text">Arraste os itens para a área amarela</span>

      <div
        class="draggable-task__options"
        @drop="onDrop($event, 0)"
        @dragover.prevent
        @dragenter.prevent
      >
        <div
          v-for="option in optionsAndAnswerDragList[0]"
          :key="option.answerId"
          class="drag-el"
          @dragstart="
            startDrag($event, option);
            addMouseMoveListener();
          "
        >
          <img
            :src="option.answerDescription"
            alt="opção"
          />
        </div>
      </div>

      <div
        class="draggable-task__drop-zone"
        @drop="onDrop($event, 1)"
        @dragover.prevent
        @dragenter.prevent
      >
        <div
          v-for="option in optionsAndAnswerDragList[1]"
          :key="option.answerId"
          class="drag-el"
          draggable="true"
          @dragstart="startDrag($event, option)"
        >
          <img
            :src="option.answerDescription"
            alt="opção"
          />
        </div>
      </div>

      <AppButton @click="answerQuestion">Responder</AppButton>
    </div>
  </TaskCard>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue";

import TaskCard from "../task-card/TaskCard.vue";
import AppButton from "@/components/app-button/AppButton.vue";
import type { AnswerProps, TaskComponentProps } from "@/@types/views/Task";

const { taskInfos } = defineProps<TaskComponentProps>();

const optionsAndAnswerDragList = ref([[...taskInfos.taskAnswers], []]);

const addMouseMoveListener = () => {};

const startDrag = (event: DragEvent, item: AnswerProps) => {
  event.dataTransfer!.dropEffect = "move";
  event.dataTransfer!.effectAllowed = "move";
  event.dataTransfer!.setData("itemID", item.answerId.toString());
};

const onDrop = (event: DragEvent, listIndex: number) => {
  const itemID = event.dataTransfer!.getData("itemID");
  const item = optionsAndAnswerDragList.value[listIndex === 0 ? 1 : 0].find(
    (item) => item.answerId === Number(itemID)
  );
  const lastIndex = optionsAndAnswerDragList.value[listIndex === 0 ? 1 : 0].findIndex(
    (item) => item.answerId == Number(itemID)
  );

  if (listIndex === 1 && !!optionsAndAnswerDragList.value[1].length) {
    optionsAndAnswerDragList.value[0].push(optionsAndAnswerDragList.value[1][0]);
    optionsAndAnswerDragList.value[1].shift();
  }

  item && optionsAndAnswerDragList.value[listIndex].push(item);

  item &&
    !!lastIndex.toString() &&
    optionsAndAnswerDragList.value[listIndex === 0 ? 1 : 0].splice(lastIndex, 1);
};

const answerQuestion = () => {
  console.log(optionsAndAnswerDragList.value[1][0]);
};

const handleScronOnDrag = (e: DragEvent) => {
  const margin = 100;
  const step = 6;

  const mouseY: number = e.clientY;
  const windowHeight = window.innerHeight;
  const scrollTop = window.scrollY;

  if (mouseY < margin && scrollTop > 0) {
    window.scrollTo(0, scrollTop - step);
    return;
  }

  if (windowHeight - mouseY < margin) {
    window.scrollTo(0, scrollTop + step);
  }
};

onMounted(() => {
  window.addEventListener("dragover", handleScronOnDrag);
});

onUnmounted(() => {
  window.removeEventListener("dragover", handleScronOnDrag);
});
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
    width: 100%;
  }

  .helper-text {
    font-size: 12px;
    color: #ff6363;
    margin-top: 24px;
  }

  .draggable-task__options {
    margin: 48px 0 36px;
    display: flex;
    flex-direction: column;
    gap: 16px;

    .drag-el {
      min-height: 200px;
      width: 320px;

      img {
        max-width: 100%;
        object-fit: cover;
      }
    }
  }

  .draggable-task__drop-zone {
    width: 320px;
    min-height: 200px;
    border: 3px solid #fee500;
    padding: 8px;
    border-radius: 8px;
    margin-bottom: 24px;

    .drag-el {
      width: 100%;
      height: 100%;

      img {
        max-width: 100%;
        object-fit: cover;
        border-radius: 8px;
      }
    }
  }
}
</style>
