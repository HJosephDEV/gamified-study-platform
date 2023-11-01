<template>
  <div class="task-view__container">
    <div class="task-view__content">
      <h1 class="task-view__module-name">{{ taskInfos.moduleName }}</h1>
      <ProgressBar :percentage="taskInfos.completedPercentage" />
      <MultipleChoiceTask
        v-if="Object.keys(taskInfos).length > 0 && taskInfos.task.taskType !== 2"
        :task-infos="taskInfos.task"
      />
      <DraggableTask
        v-if="Object.keys(taskInfos).length > 0 && taskInfos.task.taskType === 2"
        :task-infos="taskInfos.task"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, type Ref } from "vue";
import ProgressBar from "@/components/progress-bar/ProgressBar.vue";
import DraggableTask from "./components/draggable-task/DraggableTask.vue";
import MultipleChoiceTask from "./components/multiple-choice-task/MultipleChoiceTask.vue";
import { useAppStore } from "@/stores/AppStore";
import { getTaskService } from "@/services/task/service";
import router from "@/router";
import type { TaskInfosProps } from "@/@types/views/Task";

const appStore = useAppStore();
const { handleLoading } = appStore;

const taskInfos: Ref<TaskInfosProps> = ref({
  moduleId: 0,
  moduleName: "",
  completedPercentage: 0,
  task: {
    taskId: 0,
    taskName: "",
    taskContent: "",
    taskType: 0,
    taskAnswers: []
  }
});

const getTask = async () => {
  const taskId = router.currentRoute.value.params.taskId.toString();
  handleLoading(true);

  try {
    const response = await getTaskService({ taskId });

    const replacedTaskInfo = {
      moduleId: response.data.id_modulo,
      moduleName: response.data.nome_modulo,
      completedPercentage: response.data.perc_completo,
      task: {
        taskId: response.data.tarefa.id,
        taskName: response.data.tarefa.nome,
        taskContent: response.data.tarefa.conteudo,
        taskType: response.data.tarefa.tipo,
        taskAnswers: response.data.tarefa.respostas.map((answer) => ({
          answerId: answer.id,
          answerDescription: answer.descricao,
          taskId: answer.id_tarefa
        }))
      }
    };

    taskInfos.value = { ...replacedTaskInfo };
  } catch (error) {
    console.error(error);
  } finally {
    handleLoading(false);
  }
};

onMounted(() => {
  getTask();
});
</script>

<style lang="scss" scoped>
.task-view__container {
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  .task-view__content {
    width: 100%;
    max-width: 626px;
    display: flex;
    flex-direction: column;

    .task-view__module-name {
      color: #fff;
      font-size: 24px;
      font-weight: 600;
      line-height: normal;
      margin-bottom: 4px;
    }
  }
}
</style>
