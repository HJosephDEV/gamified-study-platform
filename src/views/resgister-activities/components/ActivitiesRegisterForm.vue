<template>
  <div class="activities-register-form__container">
    <div class="activities-register-form__card-header">
      <BackButton @click="handleShow()">Voltar para atividades</BackButton>
    </div>

    <div class="activities-register-form__form">
      <AppSelect
        v-model:input-value="selectedType"
        label="Tipo de atividade"
        :option-list="typesList"
      />

      <FormInput
        :input-label="fields.name.label"
        :input-value="fields.name.value"
        :input-type="fields.name.type"
        :input-status="fields.name.status"
        :input-placeholder="fields.name.placeholder"
        :input-feedback="fields.name.feedback"
        @update:input-value="(newValue) => (fields.name.value = newValue)"
      />

      <FormInput
        :input-label="fields.content.label"
        :input-value="fields.content.value"
        :input-type="fields.content.type"
        :input-status="fields.content.status"
        :input-placeholder="fields.content.placeholder"
        :input-feedback="fields.content.feedback"
        input-model="textarea"
        @update:input-value="(newValue) => (fields.content.value = newValue)"
      />

      <h2>Respostas</h2>

      <div
        v-for="(answer, index) in answers"
        :key="`answer-${index}`"
        class="activities-register-form__multiple-choice-fields"
      >
        <FormInput
          :input-label="`Resposta ${index + 1}`"
          :input-value="answer.value"
          :input-type="answer.type"
          :input-status="answer.status"
          :input-placeholder="answer.placeholder"
          :input-feedback="answer.feedback"
          @update:input-value="(newValue) => (answer.value = newValue)"
        />

        <div class="activities-register-form__container-buttons-fields">
          <AppButton
            v-if="index === answers.length - 1 && answers.length < 4"
            @click="addAnswer"
            >+</AppButton
          >
          <AppButton
            v-if="answers.length > 2"
            @click="removeAnswer(index)"
            >-</AppButton
          >
        </div>
      </div>

      <h3>Definir resposta</h3>

      <AppSelect
        v-model:input-value="correctAnswer"
        label="Resposta correta"
        :option-list="anwersList"
      />
    </div>

    <div class="activities-register-form__buttons">
      <AppButton is-full> Excluir </AppButton>
      <AppButton is-full> Salvar </AppButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";

import AppButton from "@/components/app-button/AppButton.vue";
import BackButton from "@/components/back-button/BackButton.vue";
import FormInput from "@/components/form-input/FormInput.vue";
import { useRegisterModulesStore } from "@/stores/RegisterModulesStore";
// import { useAppStore } from "@/stores/AppStore";

// import { storeToRefs } from "pinia";
import AppSelect from "@/components/app-select/AppSelect.vue";

const registerModulesStore = useRegisterModulesStore();
// const appStore = useAppStore();
// const { handleLoading, handleModal } = appStore;
const { handleShow } = registerModulesStore;
// const { selectedModule } = storeToRefs(registerModulesStore);

const checkRequiredField = (fieldsParams: any, key: string) => {
  const status = !!fieldsParams[key].value;
  fieldsParams[key].status = status;
  fieldsParams[key].feedback = status ? "" : "Campo obrigatório";

  return status;
};

const fields = ref({
  name: {
    label: "Nome da atividade",
    value: "",
    type: "text",
    placeholder: "Digite aqui",
    status: true,
    feedback: "",
    validations: [checkRequiredField]
  },
  content: {
    label: "Conteúdo da atividade",
    value: "",
    type: "text",
    placeholder: "Digite aqui",
    status: true,
    feedback: "",
    validations: [checkRequiredField]
  }
});

const answers = ref([
  {
    value: "",
    type: "text",
    placeholder: "Digite aqui",
    status: true,
    feedback: "",
    validations: [checkRequiredField]
  },
  {
    value: "",
    type: "text",
    placeholder: "Digite aqui",
    status: true,
    feedback: "",
    validations: [checkRequiredField]
  }
]);

const addAnswer = () => {
  answers.value = [
    ...answers.value,
    {
      value: "",
      type: "text",
      placeholder: "Digite aqui",
      status: true,
      feedback: "",
      validations: [checkRequiredField]
    }
  ];
};

const removeAnswer = (index: number) => {
  answers.value.splice(index, 1);
  correctAnswer.value = 0;
};

const typesList = ref([
  { id: 0, label: "Múltipla escolha" },
  { id: 1, label: "Complete a frase" },
  { id: 2, label: "Arraste a correta" }
]);

const selectedType = ref(0);

const anwersList = computed(() =>
  answers.value.map((_, index) => ({ id: index, label: `Resposta ${index + 1}` }))
);

const correctAnswer = ref(0);
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
