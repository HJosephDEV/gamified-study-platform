<template>
  <div class="login-form__wrapper">
    <div class="login-form__container">
      <h1 class="login-form__title">Login</h1>
      <InvalidAlert>Usuário/E-mail ou senha inválidos</InvalidAlert>
      <div class="login-form__form">
        <FormInput
          v-for="[key, fieldInfo] in Object.entries(fields)"
          :key="key"
          :input-label="fieldInfo.label"
          :input-value="fieldInfo.value"
          :input-type="fieldInfo.type"
          :input-status="fieldInfo.status"
          :input-placeholder="fieldInfo.placeholder"
          @update:input-value="(newValue) => (fieldInfo.value = newValue)"
        />
      </div>
      <AppButton is-full>Entrar</AppButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import FormInput from "@/components/form-input/FormInput.vue";
import AppButton from "@/components/app-button/AppButton.vue";
import InvalidAlert from "./InvalidAlert.vue";

const fields = ref({
  user: {
    label: "Usuário/E-mail",
    value: "",
    type: "text",
    placeholder: "Digite aqui",
    status: true,
    feedback: "",
    validations: []
  },
  password: {
    label: "Senha",
    value: "",
    type: "password",
    placeholder: "********",
    status: true,
    feedback: "",
    validations: []
  }
});
</script>

<style lang="scss" scoped>
.login-form__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  .login-form__container {
    width: 264px;
    display: flex;
    flex-direction: column;

    .login-form__title {
      color: #fff;
      font-size: 24px;
      font-weight: 600;
      line-height: normal;
      margin-bottom: 12px;
    }

    .login-form__form {
      margin: 12px 0 24px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
  }
}

@media (max-width: 362px) {
  .login-form__wrapper {
    .login-form__container {
      width: 100%;
    }
  }
}
</style>
