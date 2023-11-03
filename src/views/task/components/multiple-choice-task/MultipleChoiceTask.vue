<template>
  <TaskCard :title="taskInfos.taskName">
    <div class="multiple-choice-task__container">
      <div
        class="multiple-choice-task__task"
        v-html="taskContentFull || taskInfos.taskContent"
      />

      <div class="multiple-choice-task__options">
        <MultipleChoiceOption
          v-for="(answer, index) in taskInfos.taskAnswers"
          :key="`answer-${index}`"
          :blocked="blocked"
          @click="answerQuestion(answer.answerId, taskInfos.taskId)"
        >
          {{ index + 1 }}) {{ answer.answerDescription }}
        </MultipleChoiceOption>
      </div>
    </div>
  </TaskCard>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import router from "@/router";

import type { TaskComponentProps } from "@/@types/views/Task";
import { answerQuestionService } from "@/services/task/service";
import { useUserStore } from "@/stores/UserStore";
import { useAppStore } from "@/stores/AppStore";

import MultipleChoiceOption from "../multiple-choice-option/MultipleChoiceOption.vue";
import TaskCard from "../task-card/TaskCard.vue";

const appStore = useAppStore();
const userStore = useUserStore();
const { userData } = storeToRefs(userStore);
const { handleLoading, handleModal } = appStore;

const { taskInfos } = defineProps<TaskComponentProps>();

const taskContentFull = ref("");
const blocked = ref(false);

const redirectToTasks = () =>
  router.push({
    name: "module",
    params: { moduleId: router.currentRoute.value.params.moduleId }
  });

const handleCorrectAnswer = (answer: string, levelup: boolean, level: number, exp: number) => {
  taskContentFull.value = answer;
  userData.value.userExp = exp;
  userData.value.userLevel = level;

  if (taskInfos.taskType === 0) {
    handleModal({
      active: true,
      title: "Você acertou!",
      text: "parabéns pelo empenho :)",
      timeClose: 3500
    });

    levelup &&
      setTimeout(() => {
        handleModal({
          active: true,
          title: "Você subiu de level!",
          text: `Parabéns pela conquista de ter alcançado o level ${level} :)`,
          timeClose: 3500
        });

        redirectToTasks();
      }, 3500);

    !levelup && redirectToTasks();
    return;
  }

  blocked.value = true;

  setTimeout(() => {
    handleModal({
      active: true,
      title: "Você acertou!",
      text: "parabéns pelo empenho :)",
      timeClose: 3500
    });

    levelup &&
      setTimeout(() => {
        handleModal({
          active: true,
          title: "Você subiu de level!",
          text: `Parabéns pela conquista de ter alcançado o level ${level} :)`,
          timeClose: 3500
        });

        blocked.value = false;
        redirectToTasks();
      }, 3500);

    !levelup && redirectToTasks();
  }, 2000);
};

const handleIncorrectAnswer = (lifes: number) => {
  userData.value.lifes = lifes;

  handleModal({
    active: true,
    title: "Você errou :(",
    text: "Por consequência, você perdeu uma vida!",
    timeClose: 3500
  });
};

const answerQuestion = async (answerId: number, taskId: number) => {
  if (blocked.value) return;
  handleLoading(true);

  try {
    const response = await answerQuestionService({
      answerId: answerId.toString(),
      taskId: taskId.toString()
    });

    if (response.data.acertou) {
      handleCorrectAnswer(
        response.data.resposta,
        response.data.subiuNivel,
        response.data.user_level,
        response.data.exp
      );
      return;
    }

    handleIncorrectAnswer(response.data.vidas);
  } catch (error) {
    console.error(error);

    // @ts-ignore
    if (error.response.status === 403) {
      redirectToTasks();
      handleModal({
        active: true,
        title: "Alerta!",
        // @ts-ignore
        text: error.response.data.message,
        timeClose: 3000
      });
    }
  } finally {
    handleLoading(false);
  }
};
</script>

<style lang="scss" scoped>
.multiple-choice-task__container {
  display: flex;
  flex-direction: column;

  .multiple-choice-task__task {
    font-size: 14px;
    line-height: normal;
    width: 100%;
  }

  .multiple-choice-task__options {
    margin-top: 48px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
}
</style>
