<template>
  <main class="dashboard-page__container">
    <ModulesSection
      class="dashboard-page__modules-in-progress"
      section-title="Módulos em andamento"
      :modules="modulesInProgressList"
    />

    <ModulesSection
      class="dashboard-page__available-modules"
      section-title="Módulos disponíveis"
      :modules="modulesInProgressList"
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
import { onMounted, ref, type Ref } from "vue";

import type { ModuleProps } from "@/@types/views/Dashboard";
import ModulesSection from "./components/ModulesSection.vue";
import RankingList from "./components/ranking-list/RankingList.vue";
import { useAppStore } from "@/stores/AppStore";
import { getInitializedModulesService } from "@/services/modules/service";

const appStore = useAppStore();
const { handleLoading } = appStore;

const modulesInProgressList: Ref<ModuleProps[]> = ref([]);

const rankingList = ref([
  { username: "haasedevv", exp: 1200, rank: 1 },
  { username: "haasedevv", exp: 1200, rank: 2 },
  { username: "haasedevv", exp: 1200, rank: 3 },
  { username: "haasedevv", exp: 1200, rank: 4 }
]);

const getInitializedModules = async (hasLoading = true) => {
  hasLoading && handleLoading(true);

  try {
    const response = await getInitializedModulesService();
    const replacedStartedModuleList = response.map((module) => ({
      id: module.id,
      name: module.nome,
      description: module.descricao
    }));

    modulesInProgressList.value = [...replacedStartedModuleList];
  } catch (error) {
    console.error(error);
  } finally {
    hasLoading && handleLoading(false);
  }
};

onMounted(() => {});
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
@/@types/views/Dashboard
