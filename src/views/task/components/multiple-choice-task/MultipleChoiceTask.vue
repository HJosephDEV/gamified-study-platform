<template>
  <TaskCard :title="taskInfos.taskName">
    <div class="multiple-choice-task__container">
      <div class="multiple-choice-task__task">
        {{ taskInfos.taskContent }}
      </div>

      <div class="multiple-choice-task__options">
        <MultipleChoiceOption
          v-for="(answer, index) in taskInfos.taskAnswers"
          :key="`answer-${index}`"
          @click="answerQuestion(answer.answerId)"
        >
          {{ index + 1 }}) {{ answer.answerDescription }}
        </MultipleChoiceOption>
      </div>
    </div>
  </TaskCard>
</template>

<script lang="ts" setup>
import MultipleChoiceOption from "../multiple-choice-option/MultipleChoiceOption.vue";
import TaskCard from "../task-card/TaskCard.vue";
import type { MultipleChoiceProps } from "@/@types/views/Task";

const { taskInfos } = defineProps<MultipleChoiceProps>();

const answerQuestion = (id: number) => {
  console.log(id);
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
