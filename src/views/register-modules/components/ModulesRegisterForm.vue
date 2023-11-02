<template>
  <div class="modules-register-form__container">
    <div class="modules-register-form__card-header">
      <BackButton @click="handleShow()">Voltar para módulos</BackButton>
    </div>

    <div class="modules-register-form__form">
      <FormInput
        v-for="[key, fieldInfo] in Object.entries(fields)"
        :key="key"
        :input-label="fieldInfo.label"
        :input-value="fieldInfo.value"
        :input-type="fieldInfo.type"
        :input-status="fieldInfo.status"
        :input-placeholder="fieldInfo.placeholder"
        :input-feedback="fieldInfo.feedback"
        @update:input-value="(newValue) => (fieldInfo.value = newValue)"
      />
    </div>

    <AppButton
      is-full
      @click="createModule"
    >
      Salvar
    </AppButton>
  </div>
</template>

<script lang="ts" setup>
import { ref, type Ref } from "vue";

import type { RegisterModuleFields } from "@/@types/views/RegisterModules";

import AppButton from "@/components/app-button/AppButton.vue";
import BackButton from "@/components/back-button/BackButton.vue";
import FormInput from "@/components/form-input/FormInput.vue";
import { useRegisterModulesStore } from "@/stores/RegisterModulesStore";
import { useAppStore } from "@/stores/AppStore";
import { createModulesService } from "@/services/modules/service";

const registerModulesStore = useRegisterModulesStore();
const appStore = useAppStore();
const { handleLoading, handleModal } = appStore;
const { handleShow } = registerModulesStore;

const checkRequiredField = (fieldsParams: any, key: string) => {
  const status = !!fieldsParams[key].value;
  fieldsParams[key].status = status;
  fieldsParams[key].feedback = status ? "" : "Campo obrigatório";

  return status;
};

const fields: Ref<RegisterModuleFields> = ref({
  name: {
    label: "Nome do módulo",
    value: "",
    type: "text",
    placeholder: "Digite aqui",
    status: true,
    feedback: "",
    validations: [checkRequiredField]
  },
  description: {
    label: "Descrição",
    value: "",
    type: "text",
    placeholder: "Digite aqui",
    status: true,
    feedback: "",
    validations: [checkRequiredField]
  }
});

const validateFields = () => {
  let isValid = true;

  for (const key in fields.value) {
    for (const action of fields.value[key].validations) {
      let validation = action(fields.value, key);

      if (isValid && !validation) isValid = false;
    }
  }

  return isValid;
};

const createModule = async () => {
  const isValid = validateFields();
  if (!isValid) return;

  const payload = {
    nome: fields.value.name.value,
    descricao: fields.value.description.value
  };

  handleLoading(true);

  try {
    await createModulesService(payload);
    handleShow();
  } catch (error) {
    console.error(error);

    // @ts-ignore
    error.response.status === 403 &&
      handleModal({
        active: true,
        title: "Alerta!",
        // @ts-ignore
        text: error.response.data.message,
        timeClose: 3000
      });
  } finally {
    handleLoading(false);
  }
};
</script>

<style lang="scss" scoped>
.modules-register-form__container {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 36px;

  .modules-register-form__card-header {
    width: 100%;
    display: flex;
    justify-content: flex-start;
  }

  .modules-register-form__form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
}
</style>
