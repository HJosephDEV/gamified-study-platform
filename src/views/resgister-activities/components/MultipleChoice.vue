<template>
  <div
    v-for="(answer, index) in fields.answers"
    :key="`answer-${index}`"
    class="activities-register-form__multiple-choice-fields"
  >
    <FormInput
      :input-label="`Resposta ${index + 1}`"
      :input-value="answer.value"
      :input-type="answer.type"
      :input-status="answer.valid"
      :input-placeholder="answer.placeholder"
      :input-feedback="answer.feedback"
      @update:input-value="(newValue) => (answer.value = newValue)"
    />

    <div
      class="activities-register-form__container-buttons-fields"
      :style="`padding-bottom: ${!answer.valid ? '11px' : '0'}`"
    >
      <AppButton
        v-if="index === fields.answers.length - 1 && fields.answers.length < 4"
        @click="addAnswer"
        >+
      </AppButton>
      <AppButton
        v-if="fields.answers.length > 2"
        @click="removeAnswer(index)"
        >-
      </AppButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import FormInput from "@/components/form-input/FormInput.vue";

import AppButton from "@/components/app-button/AppButton.vue";
import { useRegisterActivitiesStore } from "@/stores/RegisterActivitiesStore";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const registerActivitiesStore = useRegisterActivitiesStore();
const { fields } = storeToRefs(registerActivitiesStore);

const addAnswer = () => {
  fields.value.answers = [
    ...fields.value.answers,
    {
      value: "",
      type: "text",
      placeholder: "Digite aqui",
      valid: true,
      feedback: ""
    }
  ];
};

const removeAnswer = (index: number) => {
  fields.value.answers.splice(index, 1);
  fields.value.correctAnswerIndex = 0;
};

onMounted(() => {
  fields.value.answers = [
    {
      value: "",
      type: "text",
      placeholder: "Digite aqui",
      valid: true,
      feedback: ""
    },
    {
      value: "",
      type: "text",
      placeholder: "Digite aqui",
      valid: true,
      feedback: ""
    }
  ];
});
</script>

<style lang="scss" scoped>
.activities-register-form__container {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 36px;

  .activities-register-form__card-header {
    width: 100%;
    display: flex;
    justify-content: flex-start;
  }

  .activities-register-form__form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;

    .activities-register-form__multiple-choice-fields {
      display: flex;
      align-items: flex-end;
      gap: 8px;

      .activities-register-form__container-buttons-fields {
        display: grid;
        grid-template-columns: minmax(60px, 60px) minmax(60px, 60px);
        gap: 8px;

        button {
          height: 34px;
        }
      }
    }
  }

  .activities-register-form__buttons {
    width: 100%;
    display: flex;
    gap: 24px;
  }
}
</style>
