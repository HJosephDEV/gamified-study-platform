<template>
  <div class="modules-list__container">
    <div class="modules-list__card-header">
      <AppButton @click="handleShow('form')">Cadastrar</AppButton>
    </div>

    <h2 v-if="modulesList.length === 0">Não há módulos cadastrados!</h2>
    <div
      v-else
      class="modules-list__modules"
    >
      <SectionModule
        v-for="(module, index) in modulesList"
        :key="`module-in-progress-${index}`"
        :module-name="module.name"
        @click="editModule(module)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, type Ref } from "vue";

import type { ModuleProps } from "@/@types/views/Dashboard";
import { getModulesService } from "@/services/modules/service";
import { useAppStore } from "@/stores/AppStore";
import { useRegisterModulesStore } from "@/stores/RegisterModulesStore";

import AppButton from "@/components/app-button/AppButton.vue";
import SectionModule from "@/components/section-module/SectionModule.vue";
import { storeToRefs } from "pinia";

const appStore = useAppStore();
const registerModulesStore = useRegisterModulesStore();
const { handleLoading } = appStore;
const { handleShow } = registerModulesStore;
const { selectedModule } = storeToRefs(registerModulesStore);

const modulesList: Ref<ModuleProps[]> = ref([]);

const editModule = (module: ModuleProps) => {
  selectedModule.value = { ...module };
  handleShow("form");
};

const getModules = async () => {
  handleLoading(true);

  try {
    const response = await getModulesService();
    if (response.data?.length === 0) return;

    const replacedModules = response.data.map((module) => ({
      id: module.id,
      name: module.nome,
      description: module.descricao
    }));

    modulesList.value = [...replacedModules];
  } catch (error) {
    console.error(error);
  } finally {
    handleLoading(false);
  }
};

onMounted(() => {
  getModules();
});
</script>

<style lang="scss" scoped>
.modules-list__container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;
  .modules-list__card-header {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  .modules-list__modules {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 36px 24px;
  }
}

@media (max-width: 720px) {
  .modules-list__container {
    .modules-list__modules {
      grid-template-columns: 1fr;
    }
  }
}
</style>
