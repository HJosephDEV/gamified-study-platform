<template>
  <section class="modules-section__wrapper">
    <h1>{{ sectionTitle }}</h1>

    <div class="modules-section__container">
      <div class="modules-section__modules">
        <SectionModule
          v-for="(module, index) in moduleInProgressList"
          :key="`module-in-progress-${index}`"
          :module-id="module.id"
          :module-name="module.name"
        />
      </div>

      <AppButton>Veja mais</AppButton>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { ModulesSectionProps } from "@/@types/components/ModulesSection";

import SectionModule from "./SectionModule.vue";
import AppButton from "@/components/app-button/AppButton.vue";

const { sectionTitle, moduleInProgressList } = defineProps<ModulesSectionProps>();
</script>

<style lang="scss" scoped>
.modules-section__wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;

  h1 {
    color: #fff;
    font-size: 24px;
    font-weight: 600;
    line-height: normal;
  }

  .modules-section__container {
    width: 100%;
    background: #212121;
    border-radius: 6px;
    border: 1px solid #ffe500;
    margin-top: 24px;
    padding: 24px 16px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .modules-section__modules {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 36px 24px;
      margin-bottom: 36px;
    }
  }
}

@media (max-width: 1224px) and (min-width: 1025px) {
  .modules-section__wrapper {
    .modules-section__container {
      .modules-section__modules {
        grid-template-columns: 1fr;
      }
    }
  }
}

@media (max-width: 720px) {
  .modules-section__wrapper {
    .modules-section__container {
      .modules-section__modules {
        grid-template-columns: 1fr;
      }
    }
  }
}
</style>
