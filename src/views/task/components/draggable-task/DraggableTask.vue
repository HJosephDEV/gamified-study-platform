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
          @dragstart="startDrag($event, option)"
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
import { onMounted, onUnmounted, ref, type Ref } from "vue";
import { storeToRefs } from "pinia";
import router from "@/router";

import type { AnswerProps, TaskComponentProps } from "@/@types/views/Task";
import { useAppStore } from "@/stores/AppStore";
import { answerQuestionService } from "@/services/task/service";

import TaskCard from "../task-card/TaskCard.vue";
import AppButton from "@/components/app-button/AppButton.vue";
import { useUserStore } from "@/stores/UserStore";

const { taskInfos } = defineProps<TaskComponentProps>();

const appStore = useAppStore();
const useStore = useUserStore();
const { userData } = storeToRefs(useStore);
const { handleLoading, handleModal } = appStore;

const optionsAndAnswerDragList: Ref<AnswerProps[][]> = ref([[...taskInfos.taskAnswers], []]);

const reset = () => (optionsAndAnswerDragList.value = [[...taskInfos.taskAnswers], []]);

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

const handleCorrectAnswer = (levelup: boolean, level: number, exp: number) => {
  userData.value.userExp = exp;
  userData.value.userExp = level;

  levelup &&
    handleModal({
      active: true,
      title: "Você subiu de level!",
      text: "Parabéns pela conquista :)",
      timeClose: 5000
    });

  router.push({ name: "module", params: { moduleId: router.currentRoute.value.params.moduleId } });
};

const handleIncorrectAnswer = (lifes: number) => {
  userData.value.lifes = lifes;
  handleModal({
    active: true,
    title: "Você errou :(",
    text: "Por consequência, você perdeu uma vida!",
    timeClose: 5000
  });
};

const answerQuestion = async () => {
  handleLoading(true);

  try {
    const response = await answerQuestionService({
      answerId: optionsAndAnswerDragList.value[1][0].answerId.toString(),
      taskId: optionsAndAnswerDragList.value[1][0].taskId.toString()
    });

    if (response.data.acertou) {
      handleCorrectAnswer(response.data.subiuNivel, response.data.user_level, response.data.exp);
      return;
    }

    handleIncorrectAnswer(response.data.vidas);
  } catch (error) {
    console.error(error);
  } finally {
    reset();
    handleLoading(false);
  }
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
