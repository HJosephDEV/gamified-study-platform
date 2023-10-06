<template>
  <li
    class="module-task__container ellipsis"
    @click="redirectToTask"
  >
    {{ taskName }} tokyo tokyo tokyo tokyo tokyo tokyo tokyo tokyo tokyo tokyo tokyo tokyo
  </li>
</template>

<script lang="ts" setup>
import { inject } from "vue";

import type { ProviderAppProps } from "@/@types/providers/App";
import type { ModuleTaskProps } from "@/@types/components/ModuleTask";

const { taskId, taskName } = defineProps<ModuleTaskProps>();
const { $router } = inject<ProviderAppProps>("app") || ({} as ProviderAppProps);

const redirectToTask = () =>
  $router.push({
    name: "task",
    params: {
      taskId
    }
  });
</script>

<style lang="scss" scoped>
.module-task__container {
  padding: 15px 12px;
  border-radius: 6px;
  background: linear-gradient(100deg, #fff 42.44%, #ffe500 66.39%);
  cursor: pointer;

  color: #212121;
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  &.ellipsis {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}
</style>
