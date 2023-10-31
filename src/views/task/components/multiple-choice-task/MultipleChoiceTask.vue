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
          @click="answerQuestion(answer.answerId, taskInfos.taskId)"
        >
          {{ index + 1 }}) {{ answer.answerDescription }}
        </MultipleChoiceOption>
      </div>
    </div>
  </TaskCard>
</template>

<script lang="ts" setup>
import { onUnmounted, ref } from "vue";
import { useAppStore } from "@/stores/AppStore";
import MultipleChoiceOption from "../multiple-choice-option/MultipleChoiceOption.vue";
import TaskCard from "../task-card/TaskCard.vue";
import type { MultipleChoiceProps } from "@/@types/views/Task";
import { answerQuestionService } from "@/services/task/service";

const appStore = useAppStore();
const { handleLoading } = appStore;

const { taskInfos } = defineProps<MultipleChoiceProps>();

const taskContentFull = ref("");

const handleCorrectAnswer = (answer: string, levelup: boolean, exp: number) => {
  taskContentFull.value = answer;

  setTimeout(() => {}, 3000);
};

const handleIncorrectAnswer = (lifes: number) => {
  console.log(lifes);
};

const answerQuestion = async (answerId: number, taskId: number) => {
  handleLoading(true);

  try {
    const response = await answerQuestionService({
      answerId: answerId.toString(),
      taskId: taskId.toString()
    });

    if (response.data.acertou) {
      handleCorrectAnswer(response.data.resposta, response.data.subiuNivel, response.data.exp);
      return;
    }

    handleIncorrectAnswer(response.data.vidas);
  } catch (error) {
    console.error(error);
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
  }

  .multiple-choice-task__options {
    margin-top: 48px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
}
</style>
