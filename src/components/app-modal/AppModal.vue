<template>
  <div class="app-modal__backdrop">
    <div class="app-modal__modal">
      <div class="app-modal__content">
        <h3 v-if="!!title">{{ title }}</h3>

        <h4 v-if="!!subtitle">{{ subtitle }}</h4>

        <p v-if="!!text">
          {{ text }}
        </p>

        <div class="app-modal__buttons">
          <AppButton
            v-if="!!textGreenButton"
            is-full
            @click="eventGreenButton"
          >
            {{ textGreenButton }}
          </AppButton>
          <AppButton
            v-if="!!textRedButton"
            is-full
            @click="eventRedButton"
          >
            {{ textRedButton }}
          </AppButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/stores/AppStore";
import AppButton from "../app-button/AppButton.vue";

const appStore = useAppStore();
const {
  modalInfos: {
    title,
    subtitle,
    text,
    textGreenButton,
    textRedButton,
    eventGreenButton,
    eventRedButton
  }
} = appStore;
</script>

<style lang="scss" scoped>
.app-modal__backdrop {
  width: 100vw;
  min-height: 100dvh;
  padding: 24px;
  background: rgba(23, 23, 23, 0.65);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 40;

  .app-modal__modal {
    width: 100%;
    max-width: 480px;
    border: 2px solid #fee500;
    background: #212121;
    padding: 24px;
    border-radius: 8px;

    .app-modal__content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 24px;

      h3 {
        font-size: 24px;
        line-height: normal;
        color: #fee500;
      }

      p {
        font-size: 12px;
        line-height: normal;
      }

      .app-modal__buttons {
        display: flex;
        flex-direction: column;
      }
    }
  }
}
</style>
