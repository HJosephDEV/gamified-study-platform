<template>
  <main class="dashboard-page__container">
    <ModulesSection
      class="dashboard-page__modules-in-progress"
      section-title="Módulos em andamento"
      :module-in-progress-list="modulesInProgressList"
    />

    <ModulesSection
      class="dashboard-page__available-modules"
      section-title="Módulos disponíveis"
      :module-in-progress-list="modulesInProgressList"
    />

    <div class="dashboard-page__ranking-container">
      <RankingList
        class="dashboard-page__ranking"
        :ranking-list="rankingList"
      />
    </div>
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

const rankingList = ref([
  { username: "haasedevv", exp: 1200, rank: 1 },
  { username: "haasedevv", exp: 1200, rank: 2 },
  { username: "haasedevv", exp: 1200, rank: 3 },
  { username: "haasedevv", exp: 1200, rank: 4 }
]);
</script>

<style lang="scss" scoped>
.dashboard-page__container {
  padding: 24px;
  display: grid;
  gap: 36px 48px;
  grid-template:
    "progress ranking" 1fr
    "available ranking" 1fr
    / 1fr 351px;

  .dashboard-page__modules-in-progress {
    grid-area: progress;
  }

  .dashboard-page__available-modules {
    grid-area: available;
  }

  .dashboard-page__ranking-container {
    grid-area: ranking;

    .dashboard-page__ranking {
      position: fixed;
      right: 24px;
      top: 116px;
      width: 351px;
      height: calc(100vh - 24px - 24px - 92px);
      max-height: 698px;
    }
  }
}

@media (max-width: 1024px) {
  .dashboard-page__container {
    grid-template:
      "progress" 1fr
      "available" 1fr
      "ranking" 500px
      / 1fr;

    .dashboard-page__ranking-container {
      .dashboard-page__ranking {
        position: initial;
        width: 100%;
        height: 100%;
        max-height: 500px;
      }
    }
  }
}
</style>
