<template>
  <TaskCard>
    <div class="multiple-choice-task__container">
      <p class="multiple-choice-task__task">
        {{ statementLocal }}
      </p>

      <div class="multiple-choice-task__options">
        <MultipleChoiceOption
          v-for="(answer, index) in question.answers"
          :key="`answer-${index}`"
          @click="answerQuestion(answer.id)"
        >
          {{ index + 1 }}) {{ answer.text }}
        </MultipleChoiceOption>
      </div>
    </div>
  </TaskCard>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";

import MultipleChoiceOption from "../multiple-choice-option/MultipleChoiceOption.vue";
import TaskCard from "../task-card/TaskCard.vue";

const question = ref({
  statement: `  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
        been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
        galley of type and scrambled it to $answer - $answer - $answer a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
        It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
        passages, and more recently with desktop publishing software like Aldus PageMaker including
        versions of Lorem Ipsum.`,
  answers: [
    { id: 1, text: "teste4, teste2, test3" },
    { id: 2, text: "teste3, teste2, test3" },
    { id: 3, text: "teste2, teste2, test3" },
    { id: 4, text: "teste1 teste2, test3" }
  ]
});

const isCorrectAnswer = ref(false);

const statementLocal = computed(() => {
  if (isCorrectAnswer.value) return "statementWithAnswers";

  return question.value.statement.replaceAll("$answer", "__________");
});

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
