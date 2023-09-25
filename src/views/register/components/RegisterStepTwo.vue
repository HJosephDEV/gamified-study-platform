<template>
  <div class="register-step-two__container">
    <BackButton
      class="register-step-two__back-button"
      @click="backToStepOne"
    />
    <h1 class="register-step-two__title">Escolha seu avatar</h1>

    <div class="register-step-two__buttons-container">
      <div class="register-step-two__photo-button">
        <img
          src="/src/assets/images/poro.png"
          alt="poro"
        />
      </div>

      <AppButton
        is-full
        @click="register"
      >
        Cadastrar
      </AppButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { inject } from "vue";

import { useRegisterStore } from "@/stores/RegisterStore";
import type { ProviderAppProps } from "@/@types/providers/App";

import AppButton from "@/components/app-button/AppButton.vue";
import BackButton from "@/components/back-button/BackButton.vue";

const registerStore = useRegisterStore();
const { changeStep } = registerStore;

const backToStepOne = () => changeStep(1);

const { $router } = inject<ProviderAppProps>("app") || ({} as ProviderAppProps);
const register = () => {
  $router.push({ name: "home" });
};
</script>

<style lang="scss">
.register-step-two__container {
  .register-step-two__back-button {
    align-self: flex-start;
  }
}
</style>

<style lang="scss" scoped>
.register-step-two__container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .register-step-two__title {
    color: #fff;
    font-size: 24px;
    font-weight: 600;
    line-height: normal;
    margin: 36px 0;
    text-align: center;
  }

  .register-step-two__buttons-container {
    margin-bottom: 36px;
    display: flex;
    flex-direction: column;
    gap: 36px;

    .register-step-two__photo-button {
      display: flex;
      border: 3px solid #ffe500;
      height: 128px;
      width: 128px;
      cursor: pointer;

      img {
        max-width: 100%;
      }
    }
  }
}
</style>
