<template>
  <div class="activities-list__container">
    <div class="activities-list__card-header">
      <AppButton @click="handleShow('form')">Cadastrar</AppButton>
    </div>

    <AppSelect
      v-model:input-value="selectedModule"
      label="Módulo"
      :option-list="modulesList"
    />

    <h2 v-if="!activitiesList.length">Não há atividades cadastradas!</h2>
    <div
      v-else
      class="activities-list__modules"
    >
      <SectionModule
        v-for="(activity, index) in activitiesList"
        :key="`activity-${index}`"
        :module-name="activity.taskName"
        @click="editActivity(activity)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, type Ref, watch } from "vue";
import { storeToRefs } from "pinia";

import type { TaskProps } from "@/@types/views/Task";
import { useRegisterActivitiesStore } from "@/stores/RegisterActivitiesStore";
import { useAppStore } from "@/stores/AppStore";
import { getTasksService } from "@/services/task/service";

import AppButton from "@/components/app-button/AppButton.vue";
import SectionModule from "@/components/section-module/SectionModule.vue";
import AppSelect from "@/components/app-select/AppSelect.vue";
import { getModulesService } from "@/services/modules/service";
import type { listOptionProps } from "@/@types/components/AppSelect";

const appStore = useAppStore();
const registerActivitiesStore = useRegisterActivitiesStore();
const { handleLoading } = appStore;
const { handleShow } = registerActivitiesStore;
const { selectedActivity, selectedModule } = storeToRefs(registerActivitiesStore);

const activitiesList: Ref<TaskProps[]> = ref([]);

const editActivity = (activity: TaskProps) => {
  selectedActivity.value = { ...activity };
  handleShow("form");
};

const getTasks = async (id: number) => {
  const params = {
    moduleId: id.toString()
  };

  handleLoading(true);

  try {
    const response = await getTasksService(params);
    const replacedList = response.data.map((task) => ({
      taskId: task.id,
      taskName: task.nome,
      taskExp: task.tarefa_exp,
      taskContent: task.conteudo,
      taskType: task.tipo,
      taskAnswers: task.respostas.map((answer) => ({
        answerId: answer.id,
        answerDescription: answer.descricao,
        taskId: answer.id_tarefa,
        correct: answer.resposta_correta
      }))
    }));

    activitiesList.value = [...replacedList];
  } catch (error) {
    console.error(error);
  } finally {
    handleLoading(false);
  }
};

const modulesList: Ref<listOptionProps[]> = ref([]);

const getModules = async () => {
  handleLoading(true);

  try {
    const response = await getModulesService();
    if (response.data?.length === 0) return;

    const replacedModules = response.data.map((module) => ({
      id: module.id,
      label: module.nome
    }));

    modulesList.value = [...replacedModules];

    if (selectedModule.value === null) {
      selectedModule.value = replacedModules.length ? replacedModules[0]?.id : null;
    }
  } catch (error) {
    console.error(error);
  } finally {
    handleLoading(false);
  }
};

watch(selectedModule, (value) => {
  value !== null && getTasks(value);
});

onMounted(async () => {
  await getModules();
  selectedModule.value !== null && (await getTasks(selectedModule.value));
});
</script>

<style lang="scss" scoped>
.activities-list__container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;

  .activities-list__card-header {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  .activities-list__modules {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    gap: 36px 24px;
  }
}
</style>
