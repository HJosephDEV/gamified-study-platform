<template>
  <div class="login-form__wrapper">
    <div class="login-form__container">
      <h1 class="login-form__title">Login</h1>
      <InvalidAlert v-show="hasLoginError">Usuário/E-mail ou senha inválidos</InvalidAlert>
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
      <AppButton
        is-full
        @click="login"
        >Entrar</AppButton
      >
      <TextButton
        class="login-form__register-link"
        to="/register"
      >
        <template #text>Não possui conta? </template>
        <template #bold>Cadastre-se</template>
      </TextButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";
import router from "@/router";

import type { UserProps } from "@/@types/services/UserService";
import { loginUserService } from "@/services/user/service";
import { useAppStore } from "@/stores/AppStore";
import { useUserStore } from "@/stores/UserStore";

import FormInput from "@/components/form-input/FormInput.vue";
import AppButton from "@/components/app-button/AppButton.vue";
import TextButton from "@/components/text-button/TextButton.vue";
import InvalidAlert from "./InvalidAlert.vue";

const hasLoginError = ref(false);

const fields = ref({
  login: {
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

const userStore = useUserStore();
const appStore = useAppStore();
const { handleLoading } = appStore;
const { userData } = storeToRefs(userStore);

const saveUserData = (infos: UserProps | undefined) => {
  if (!infos) return;

  userData.value = {
    id: infos.id,
    firstname: infos.nome,
    lastname: infos.sobrenome,
    username: infos.login,
    email: infos.email,
    userLevel: infos.user_level,
    userExp: infos.user_exp,
    userNextLevelExp: infos.user_next_level_exp,
    blocked: infos.bloqueado,
    lifes: infos.vidas,
    avatarId: infos.id_avatar,
    avatarSrc: infos.url_avatar,
    isAdmin: infos.is_admin,
    token: infos.token
  };

  localStorage.setItem("token", infos.token);
};

const login = async () => {
  const payload = {
    login: fields.value.login.value,
    senha: fields.value.password.value
  };

  handleLoading(true);
  try {
    const response = await loginUserService(payload);

    if (hasLoginError.value) hasLoginError.value = false;

    saveUserData(response.data);
  } catch (error) {
    console.error(error);
    hasLoginError.value = true;
  } finally {
    handleLoading(false);
  }
};

watch(
  () => userData.value,
  (newValue) => {
    newValue && router.push({ name: "dashboard" });
  }
);
</script>

<style lang="scss">
@media (max-width: 362px) {
  .login-form__wrapper {
    .login-form__container {
      .login-form__register-link {
        a button {
          display: flex;
          align-items: center;
          flex-direction: column;
        }
      }
    }
  }
}
</style>

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

    .login-form__register-link {
      margin-top: 16px;
    }
  }
}

@media (max-width: 362px) {
  .login-form__wrapper {
    .login-form__container {
      width: 100%;

      .login-form__register-link {
        a {
          display: flex;
          align-items: center;
          flex-direction: column !important;
        }
      }
    }
  }
}
</style>
