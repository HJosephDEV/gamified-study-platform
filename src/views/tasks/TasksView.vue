<template>
  <div class="tasks-view__container">
    <div class="tasks-view__content">
      <h1 class="tasks-view__module-name">{{ moduleInfos.moduleName }}</h1>
      <ProgressBar :percentage="moduleInfos.completedPercentage" />
      <TasksCard :tasks="moduleInfos.tasks" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import router from "@/router";

import type { ModuleInfosProps } from "@/@types/views/Tasks";
import { useAppStore } from "@/stores/AppStore";
import { getModuleTasksService } from "@/services/modules/service";

import ProgressBar from "@/components/progress-bar/ProgressBar.vue";
import TasksCard from "./components/tasks-card/TasksCard.vue";

const appStore = useAppStore();
const { handleLoading } = appStore;

const moduleInfos = ref({} as ModuleInfosProps);

const getModuleTasks = async () => {
  const moduleId = router.currentRoute.value.params.moduleId.toString();
  handleLoading(true);

  try {
    const response = await getModuleTasksService({ id_module: moduleId });

    const replacedInfos = {
      moduleId: response.data.id_modulo,
      moduleName: response.data.nome_modulo,
      completedPercentage: response.data.perc_completo,
      tasks: response.data.tarefas.map((task) => ({
        taskId: task.id,
        taskName: task.nome,
        taskContent: task.conteudo,
        taskType: task.tipo,
        taskExp: task.tarefa_exp,
        moduleId: task.id_modulo,
        isCompleted: task.completo
      }))
    };

    moduleInfos.value = { ...replacedInfos };
  } catch (error) {
    console.error(error);
  } finally {
    handleLoading(false);
  }
};

onMounted(() => {
  getModuleTasks();
});
</script>

<style lang="scss" scoped>
.tasks-view__container {
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  .tasks-view__content {
    width: 100%;
    max-width: 626px;
    display: flex;
    flex-direction: column;

    .tasks-view__module-name {
      color: #fff;
      font-size: 24px;
      font-weight: 600;
      line-height: normal;
      margin-bottom: 4px;
    }
  }
}
</style>
