<template>
  <div class="activities-register-form__container">
    <div class="activities-register-form__card-header">
      <BackButton @click="handleShow()">Voltar para atividades</BackButton>
    </div>

    <div class="activities-register-form__form">
      <AppSelect
        v-model:input-value="fields.type"
        label="Tipo de atividade"
        :option-list="typesList"
      />

      <FormInput
        :input-label="fields.name.label"
        :input-value="fields.name.value"
        :input-type="fields.name.type"
        :input-placeholder="fields.name.placeholder"
        :input-status="validations.name.valid"
        :input-feedback="validations.name.feedback"
        @update:input-value="(newValue) => (fields.name.value = newValue)"
      />

      <FormInput
        :input-label="fields.exp.label"
        :input-value="fields.exp.value"
        :input-type="fields.exp.type"
        :input-placeholder="fields.exp.placeholder"
        :input-status="validations.exp.valid"
        :input-feedback="validations.exp.feedback"
        @update:input-value="(newValue) => (fields.exp.value = newValue)"
      />

      <FormInput
        :input-label="fields.content.label"
        :input-value="fields.content.value"
        :input-type="fields.content.type"
        :input-placeholder="fields.content.placeholder"
        :input-status="validations.content.valid"
        :input-feedback="validations.content.feedback"
        input-model="textarea"
        @update:input-value="(newValue) => (fields.content.value = newValue)"
      />

      <br />
      <h2>Respostas</h2>

      <MultipleChoice v-if="fields.type === 0" />
      <br />

      <div v-if="fields.answers.length > 1">
        <h3>Definir resposta</h3>

        <AppSelect
          v-model:input-value="fields.correctAnswerIndex"
          label="Resposta correta"
          :option-list="anwersList"
        />
      </div>
    </div>

    <div class="activities-register-form__buttons">
      <AppButton
        v-if="Object.keys(selectedActivity).length"
        is-full
        @click="deleteTask"
      >
        Excluir
      </AppButton>
      <AppButton
        is-full
        @click="Object.keys(selectedActivity).length ? editTask() : createTask()"
      >
        Salvar
      </AppButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from "vue";

import AppButton from "@/components/app-button/AppButton.vue";
import BackButton from "@/components/back-button/BackButton.vue";
import FormInput from "@/components/form-input/FormInput.vue";
import { useAppStore } from "@/stores/AppStore";
import AppSelect from "@/components/app-select/AppSelect.vue";
import { useRegisterActivitiesStore } from "@/stores/RegisterActivitiesStore";
import { storeToRefs } from "pinia";
import MultipleChoice from "@/views/resgister-activities/components/MultipleChoice.vue";
import { createTaskService, deleteTaskService, editTaskService } from "@/services/task/service";

const appStore = useAppStore();
const { handleLoading } = appStore;

const registerActivitiesStore = useRegisterActivitiesStore();
const { handleShow, cleanContentAndAnswers } = registerActivitiesStore;
const { fields, selectedActivity, validations, selectedModule } =
  storeToRefs(registerActivitiesStore);

const typesList = ref([
  { id: 0, label: "Múltipla escolha" },
  { id: 1, label: "Complete a frase" },
  { id: 2, label: "Arraste a correta" }
]);

const anwersList = computed(() =>
  fields.value.answers.map((_, index) => ({ id: index, label: `Resposta ${index + 1}` }))
);

const validateFields = () => {
  let isValid = true;

  for (const value of Object.values(validations.value)) {
    const isValidLocal = value.validation?.();

    if (isValid && !isValidLocal) {
      isValid = false;
    }
  }

  return isValid;
};

const createTask = async () => {
  const isValid = validateFields();
  if (!isValid) return;

  const payload = {
    nome: fields.value.name.value,
    conteudo: fields.value.content.value,
    tipo: fields.value.type,
    tarefa_exp: fields.value.exp.value,
    id_modulo: selectedModule.value,
    index_resp: fields.value.correctAnswerIndex,
    respostas: fields.value.answers.map((answer) => ({ descricao: answer.value }))
  };

  handleLoading(true);

  try {
    await createTaskService(payload);
    handleShow();
  } catch (error) {
    console.error(error);
  } finally {
    handleLoading(false);
  }
};

const editTask = async () => {
  const isValid = validateFields();
  if (!isValid) return;

  const payload = {
    id: selectedActivity.value.taskId,
    nome: fields.value.name.value,
    conteudo: fields.value.content.value,
    tipo: fields.value.type,
    tarefa_exp: fields.value.exp.value,
    id_modulo: selectedModule.value,
    index_resp: fields.value.correctAnswerIndex,
    respostas: fields.value.answers.map((answer) => ({ descricao: answer.value }))
  };

  handleLoading(true);

  try {
    await editTaskService(payload);
    handleShow();
  } catch (error) {
    console.error(error);
  } finally {
    handleLoading(false);
  }
};

const deleteTask = async () => {
  const params = {
    id: selectedActivity.value.taskId
  };

  handleLoading(true);

  try {
    await deleteTaskService(params);
    handleShow();
  } catch (error) {
    console.error(error);
  } finally {
    handleLoading(false);
  }
};

const fillMultipleChoice = () => {
  fields.value.type = selectedActivity.value.taskType;
  fields.value.name.value = selectedActivity.value.taskName;
  fields.value.exp.value = selectedActivity.value.taskExp;
  fields.value.content.value = selectedActivity.value.taskContent;
  fields.value.answers = selectedActivity.value.taskAnswers.map((taskAnswer) => ({
    value: taskAnswer.answerDescription,
    type: "text",
    placeholder: "Digite aqui",
    valid: true,
    feedback: ""
  }));
  fields.value.correctAnswerIndex = selectedActivity.value.taskAnswers.findIndex(
    (taskAnswer) => taskAnswer.correct
  );
};

onMounted(() => {
  selectedActivity.value.taskType === 0 && fillMultipleChoice();
});

watch(
  () => fields.value.type,
  () => {
    cleanContentAndAnswers();
  }
);
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
