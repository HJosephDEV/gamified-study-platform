<template>
  <TaskCard>
    <div class="draggable-task__container">
      <div class="draggable-task__task">
        {{ question.statement }}
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
          :key="option.id"
          class="drag-el"
          draggable="true"
          @dragstart="startDrag($event, option)"
        >
          <img
            :src="option.image"
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
          :key="option.id"
          class="drag-el"
          draggable="true"
          @dragstart="startDrag($event, option)"
        >
          <img
            :src="option.image"
            alt="opção"
          />
        </div>
      </div>

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

const optionsAndAnswerDragList = ref([
  [
    { id: 1, image: "/src/assets/images/pixel-art.png" },
    { id: 2, image: "/src/assets/images/pixel-art.png" },
    { id: 3, image: "/src/assets/images/pixel-art.png" },
    { id: 4, image: "/src/assets/images/pixel-art.png" }
  ],
  []
]);

const startDrag = (event: DragEvent, item: { id: number; image: string }) => {
  event.dataTransfer!.dropEffect = "move";
  event.dataTransfer!.effectAllowed = "move";
  event.dataTransfer!.setData("itemID", item.id.toString());
};

const onDrop = (event: DragEvent, listIndex: number) => {
  const itemID = event.dataTransfer!.getData("itemID");
  const item = optionsAndAnswerDragList.value[listIndex === 0 ? 1 : 0].find(
    (item) => item.id === Number(itemID)
  );
  const lastIndex = optionsAndAnswerDragList.value[listIndex === 0 ? 1 : 0].findIndex(
    (item) => item.id == Number(itemID)
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
