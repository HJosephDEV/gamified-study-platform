<template>
  <main class="dashboard-page__container">
    <ModulesSection
      section-title="Módulos em andamento"
      :module-in-progress-list="modulesInProgressList"
    />
    <ModulesSection
      section-title="Módulos disponíveis"
      :module-in-progress-list="modulesInProgressList"
    />
    <RankingList />
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";

import ModulesSection from "./components/ModulesSection.vue";
import RankingList from "./components/ranking-list/RankingList.vue";

const modulesInProgressList = ref([
  { id: 1, name: "Variavéis" },
  { id: 2, name: "Variavéis" },
  { id: 3, name: "Variavéis" }
]);
</script>

<style lang="scss" scoped>
.dashboard-page__container {
  padding: 24px;
  display: grid;
}
</style>
