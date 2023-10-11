<template>
  <div class="task-card__container">
    <BackButton
      class="task-card__back-button"
      @click="backToModule"
    >
      Voltar para módulos
    </BackButton>
    <h2 class="task-card__title">Tokyo</h2>
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { inject } from "vue";
import type { ProviderAppProps } from "@/@types/providers/App";

import BackButton from "@/components/back-button/BackButton.vue";

const { $router } = inject<ProviderAppProps>("app") || ({} as ProviderAppProps);

const backToModule = () => {
  $router.push({
    name: "module",
    params: {
      moduleId: $router.currentRoute.value.params.moduleId
    }
  });
};
</script>

<style lang="scss" scoped>
.task-card__container {
  width: 100%;
  border-radius: 6px;
  border: 1px solid #ffe500;
  background: #212121;
  padding: 24px;
  margin-top: 24px;
  display: flex;
  flex-direction: column;

  .task-card__back-button {
    width: fit-content;
  }

  .task-card__title {
    color: #ffe500;
    font-size: 16px;
    font-weight: 600;
    line-height: normal;
    margin: 24px 0;
  }
}
</style>
