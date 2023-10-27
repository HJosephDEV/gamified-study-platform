<template>
  <div class="info-card__container">
    <h2 class="info-card__title">Alterar informações da conta</h2>

    <div class="info-card__form">
      <div class="info-card__fields">
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
import { onMounted, ref, type Ref } from "vue";
import { isEmail, hasEspecialCaracter } from "@/utils";
import type { InfoFields } from "@/@types/components/InfoCard";

import AppButton from "@/components/app-button/AppButton.vue";
import FormInput from "@/components/form-input/FormInput.vue";
import { useUserStore } from "@/stores/UserStore";
import { useAppStore } from "@/stores/AppStore";
import { changeUserInfosService } from "@/services/user/service";

const appStore = useAppStore();
const userStore = useUserStore();
const { handleLoading } = appStore;
const { userData } = userStore;

const checkRequiredField = (fieldsParam: InfoFields, key: string) => {
  const status = !!fieldsParam[key].value;
  fieldsParam[key].status = status;
  fieldsParam[key].feedback = status ? "" : "Campo obrigatório";

  return status;
};

const checkEmail = (fieldsParam: InfoFields, key: string) => {
  if (!fieldsParam[key].value) return;

  const isValidEmail: boolean = isEmail(fieldsParam[key].value);
  fieldsParam[key].status = isValidEmail;
  fieldsParam[key].feedback = isValidEmail ? "" : "E-mail inválido";

  return isValidEmail;
};

const checkUsername = (fieldsParam: InfoFields, key: string) => {
  if (!fieldsParam[key].value) return;

  const isValidUsername: boolean = !hasEspecialCaracter(fieldsParam[key].value);
  fieldsParam[key].status = isValidUsername;
  fieldsParam[key].feedback = isValidUsername
    ? ""
    : "Não utilize caracteres espcecias. Ex: !,@,#, etc...";

  return isValidUsername;
};

const fields: Ref<InfoFields> = ref({
  firstname: {
    label: "Nome",
    value: "",
    type: "text",
    placeholder: "Digite aqui",
    status: true,
    feedback: "",
    validations: [checkRequiredField]
  },
  lastname: {
    label: "Sobrenome",
    value: "",
    type: "text",
    placeholder: "Digite aqui",
    status: true,
    feedback: "",
    validations: [checkRequiredField]
  },
  username: {
    label: "Nome de usuário",
    value: "",
    type: "text",
    placeholder: "Digite aqui",
    status: true,
    feedback: "",
    validations: [checkRequiredField, checkUsername]
  },
  email: {
    label: "E-mail",
    value: "",
    type: "text",
    placeholder: "Digite aqui",
    status: true,
    feedback: "",
    validations: [checkRequiredField, checkEmail]
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

const changeUserInfos = async () => {
  const payload = {
    nome: fields.value.firstname.value,
    sobrenome: fields.value.lastname.value,
    login: fields.value.username.value,
    email: fields.value.email.value
  };
  handleLoading(true);

  try {
    await changeUserInfosService(payload);
  } catch (error) {
    console.error(error);
  } finally {
    handleLoading(false);
  }
};

const save = () => {
  const isValid = validateFields();
  if (!isValid) return;

  changeUserInfos();
};

onMounted(() => {
  fields.value.firstname.value = userData.firstname || "";
  fields.value.lastname.value = userData.lastname || "";
  fields.value.username.value = userData.username || "";
  fields.value.email.value = userData.email || "";
});
</script>

<style lang="scss" scoped>
.info-card__container {
  display: flex;
  flex-direction: column;

  .info-card__title {
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    line-height: normal;
    margin-bottom: 16px;
  }

  .info-card__form {
    display: flex;
    flex-direction: column;
    .info-card__fields {
      width: 100%;
      margin-bottom: 24px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }
  }
}

@media (max-width: 550px) {
  .info-card__container {
    .info-card__form {
      .info-card__fields {
        grid-template-columns: 1fr;
      }
    }
  }
}
</style>
