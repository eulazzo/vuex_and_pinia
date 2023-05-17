<template>
  <div class="task">
    <h3>{{ task.title }}</h3>
    <div class="icons">
      <i @click="async () => await deleteTask(task.id)" class="material-icons"
        >delete</i
      >
      <i
        @click="async () => await toggleFav(task.id)"
        :class="{ 'bg-red': task.isFav, 'material-icons': true }"
        >favorite</i
      >
    </div>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import useTaskStore from "../store/TaskStore";

export default {
  props: {
    task: {
      type: Object,
      defaul: {},
    },
  },

  methods: {
    ...mapActions(useTaskStore, ["deleteTask"]),
    ...mapActions(useTaskStore, ["toggleFav"]),
  },
};
</script>

<style></style>
