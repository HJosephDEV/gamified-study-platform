<template>
  <main
    :class="[
      'dashboard-page__container',
      {
        '--with-initialized-modules': initializedModulesList.length > 0,
        '--with-finalized-modules': initializedModulesList.length > 0
      }
    ]"
  >
    <ModulesSection
      v-if="initializedModulesList.length > 0"
      class="dashboard-page__modules-in-progress"
      section-title="Módulos em andamento"
      :modules="initializedModulesList"
    />

    <ModulesSection
      class="dashboard-page__available-modules"
      section-title="Módulos disponíveis"
      :modules="avaliabledModulesList"
    />

    <ModulesSection
      v-if="finalizedModulesList.length > 0"
      class="dashboard-page__finalized-modules"
      section-title="Módulos finalizados"
      :modules="finalizedModulesList"
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

import type { ModuleProps, RankingProps } from "@/@types/views/Dashboard";
import ModulesSection from "./components/ModulesSection.vue";
import RankingList from "./components/ranking-list/RankingList.vue";
import { useAppStore } from "@/stores/AppStore";
import { getAllModulesService } from "@/services/modules/service";
import { getRankingService } from "@/services/user/service";

const appStore = useAppStore();
const { handleLoading } = appStore;

const finalizedModulesList: Ref<ModuleProps[]> = ref([]);
const initializedModulesList: Ref<ModuleProps[]> = ref([]);
const avaliabledModulesList: Ref<ModuleProps[]> = ref([]);

const rankingList: Ref<RankingProps[]> = ref([]);

const getAllModules = async (hasLoading = true) => {
  hasLoading && handleLoading(true);

  try {
    const response = await getAllModulesService();

    const replacedInitializedModuleList = response.data.modulos_em_andamento.map((module) => ({
      id: module.id,
      name: module.nome,
      description: module.descricao
    }));

    const replacedFinalizedModuleList = response.data.modulos_finalizados.map((module) => ({
      id: module.id,
      name: module.nome,
      description: module.descricao
    }));

    const replacedAvaliabledModuleList = response.data.modulos_disponiveis.map((module) => ({
      id: module.id,
      name: module.nome,
      description: module.descricao
    }));

    initializedModulesList.value = [...replacedInitializedModuleList];
    finalizedModulesList.value = [...replacedFinalizedModuleList];
    avaliabledModulesList.value = [...replacedAvaliabledModuleList];
  } catch (error) {
    console.error(error);
  } finally {
    hasLoading && handleLoading(false);
  }
};

const getRanking = async (hasLoading = true) => {
  hasLoading && handleLoading(true);

  try {
    const response = await getRankingService();
    if (response.data?.length === 0) return;

    const replacedRanking = response.data.map((user) => ({
      username: user.nome,
      exp: user.user_exp,
      rank: user.rank,
      image: user.url
    }));

    rankingList.value = [...replacedRanking];
  } catch (error) {
    console.error(error);
  } finally {
    hasLoading && handleLoading(false);
  }
};

onMounted(() => {
  handleLoading(true);
  Promise.all([getAllModules(false), getRanking(false)]).finally(() => handleLoading(false));
});
</script>

<style lang="scss" scoped>
.dashboard-page__container {
  padding: 24px;
  display: grid;
  gap: 36px 48px;
  grid-template:
    "available ranking" auto
    / 1fr 351px;

  &.--with-initialized-modules {
    grid-template:
      "progress ranking" auto
      "available ranking" auto
      / 1fr 351px;
  }

  &.--with-finalized-modules {
    grid-template:
      "progress ranking" auto
      "finalized ranking" auto
      / 1fr 351px;
  }

  &.--with-initialized-modules.--with-finalized-modules {
    grid-template:
      "progress ranking" auto
      "available ranking" auto
      "finalized ranking" auto
      / 1fr 351px;
  }

  .dashboard-page__modules-in-progress {
    grid-area: progress;
  }

  .dashboard-page__available-modules {
    grid-area: available;
  }

  .dashboard-page__finalized-modules {
    grid-area: finalized;
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
      "available" 1fr
      "ranking" 500px
      / 1fr;

    &.--with-initialized-modules {
      grid-template:
        "progress" 1fr
        "available" 1fr
        "ranking" 500px
        / 1fr;
    }

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
