<template>
  <div class="password-card__container">
    <h2 class="password-card__title">Alterar senha</h2>

    <div class="password-card__form">
      <div class="password-card__fields">
        <FormInput
          v-for="[key, fieldInfo] in Object.entries(fields)"
          :key="key"
          :input-label="fieldInfo.label"
          :input-value="fieldInfo.value"
          :input-type="fieldInfo.type"
          :input-status="fieldInfo.status"
          :input-feedback="fieldInfo.feedback"
          :input-placeholder="fieldInfo.placeholder"
          @update:input-value="(newValue) => (fieldInfo.value = newValue)"
        />
      </div>
      <AppButton
        is-full
        @click="save"
        >Salvar alterações</AppButton
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, type Ref } from "vue";
import type { PasswordFields } from "@/@types/components/PasswordsCard";

import AppButton from "@/components/app-button/AppButton.vue";
import FormInput from "@/components/form-input/FormInput.vue";

const checkRequiredField = (fieldsParam: PasswordFields, key: string) => {
  const status = !!fieldsParam[key].value;
  fieldsParam[key].status = status;
  fieldsParam[key].feedback = status ? "" : "Campo obrigatório";

  return status;
};

const checkEqualPasswords = (fieldsParam: PasswordFields) => {
  if (!fieldsParam.password.value || !fieldsParam.retypePassword.value) return true;

  const isEqual: boolean = fieldsParam.password.value === fieldsParam.retypePassword.value;

  fieldsParam.password.status = isEqual;
  fieldsParam.password.feedback = !isEqual ? "As senhas não são iguais" : "";
  fieldsParam.retypePassword.status = isEqual;
  fieldsParam.retypePassword.feedback = !isEqual ? "As senhas não são iguais" : "";

  return isEqual;
};

const fields: Ref<PasswordFields> = ref({
  password: {
    label: "Senha",
    value: "",
    type: "password",
    placeholder: "********",
    status: true,
    feedback: "",
    validations: [checkRequiredField]
  },
  retypePassword: {
    label: "Repita a senha",
    value: "",
    type: "password",
    placeholder: "********",
    status: true,
    feedback: "",
    validations: [checkRequiredField, checkEqualPasswords]
  }
});

const validateFields = () => {
  let isValid = true;
  for (const key in fields.value) {
    for (const action of fields.value[key].validations) {
      let validation = action(fields.value, key);
      isValid = isValid && !validation ? false : isValid;
    }
  }

  return isValid;
};

const save = () => {
  const isValid = validateFields();
  if (!isValid) return;
};
</script>

<style lang="scss" scoped>
.password-card__container {
  display: flex;
  flex-direction: column;

  .password-card__title {
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    line-height: normal;
    margin-bottom: 16px;
  }

  .password-card__form {
    display: flex;
    flex-direction: column;
    .password-card__fields {
      width: 100%;
      margin-bottom: 24px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }
  }
}

@media (max-width: 550px) {
  .password-card__container {
    .password-card__form {
      .password-card__fields {
        grid-template-columns: 1fr;
      }
    }
  }
}
</style>
