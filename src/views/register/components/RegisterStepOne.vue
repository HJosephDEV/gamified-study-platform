<template>
  <div class="register-step-one__container">
    <h1 class="register-step-one__title">Cadastro</h1>
    <div class="register-step-one__form">
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
    <div class="register-step-one__redirect-and-button-container">
      <TextButton to="/login">
        <template #text>Já possui conta? Voltar para </template>
        <template #bold>Login</template>
      </TextButton>
      <AppButton class="register-step-one__next-button">Próximo</AppButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import FormInput from "@/components/form-input/FormInput.vue";
import AppButton from "@/components/app-button/AppButton.vue";
import TextButton from "@/components/text-button/TextButton.vue";

const fields = ref({
  firstname: {
    label: "Nome",
    value: "",
    type: "text",
    placeholder: "Digite aqui",
    status: true,
    feedback: "",
    validations: []
  },
  lastname: {
    label: "Sobrenome",
    value: "",
    type: "text",
    placeholder: "Digite aqui",
    status: true,
    feedback: "",
    validations: []
  },
  username: {
    label: "Nome de usuário",
    value: "",
    type: "text",
    placeholder: "Digite aqui",
    status: true,
    feedback: "",
    validations: []
  },
  email: {
    label: "E-mail",
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
  },
  retypePassword: {
    label: "Repita a senha",
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
.register-step-one__container {
  width: 100%;
  display: flex;
  flex-direction: column;

  .register-step-one__title {
    color: #fff;
    font-size: 24px;
    font-weight: 600;
    line-height: normal;
    margin-bottom: 12px;
  }

  .register-step-one__form {
    margin: 12px 0 24px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  .register-step-one__redirect-and-button-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;

    .register-step-one__next-button {
      margin: auto 0 0 auto;
      height: fit-content;
    }
  }
  .register-step-one__register-link {
    display: flex;
    margin-top: 16px;
    justify-content: center;

    a {
      text-decoration: none !important;
    }
  }
}

@media (max-width: 550px) {
  .register-step-one__container {
    .register-step-one__form {
      grid-template-columns: 1fr;
    }

    .register-step-one__redirect-and-button-container {
      flex-direction: column-reverse;
      .register-step-one__next-button {
        width: 100%;
      }
    }
  }
}
</style>
