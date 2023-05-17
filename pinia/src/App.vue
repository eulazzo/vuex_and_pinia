<template>
  <main>
    <!-- heading -->
    <header>
      <img src="./assets/pinia-logo.svg" alt="pinia-logo-svg" />
      <h2>Pinia Task</h2>
    </header>

    <task-form />

    <!-- filter -->
    <nav class="filter">
      <button class="button" @click="filter = 'all'">All Tasks</button>
      <button class="button" @click="filter = 'favs'">Favs Tasks</button>
      <button @click="$reset" class="button">Delete All</button>
    </nav>

    <div class="loading">
      <span v-if="isLoading" class="loading"
        >Wait a minute....Data is Loading!</span
      >
    </div>
    <!-- Task list -->
    <div class="task-list" v-if="filter === 'all' && !isLoading">
      <p>You Have {{ totalCount }} tasks to do</p>
      <div v-for="task in tasks" :key="task.id">
        <TaskDetails :task="task" />
      </div>
    </div>
    <div class="task-list" v-if="filter === favs && !isLoading">
      <p>You Have {{ favsCount }} favorite taks to do</p>
      <div v-for="task in favs" :key="task.id">
        <TaskDetails :task="task" />
      </div>
    </div>
  </main>
</template>

<script>
import { mapActions, mapState } from "pinia";
import useTaskStore from "./store/TaskStore.js";
import TaskDetails from "./components/TaskDetails.vue";
import TaskForm from "./components/TaskForm.vue";

export default {
  data() {
    return { filter: "all", addTaskItem: "" };
  },
  components: { TaskDetails, TaskForm },
  computed: {
    ...mapState(useTaskStore, ["tasks"]),
    ...mapState(useTaskStore, ["isLoading"]),
    ...mapState(useTaskStore, ["favs"]),

    ...mapState(useTaskStore, ["favsCount"]),
    ...mapState(useTaskStore, ["totalCount"]),
    ...mapState(useTaskStore, ["getAllTask"]),
  },

  methods: {
    ...mapActions(useTaskStore, ["addTask"]),
  },

  async mounted() {
    await this.getAllTask();
  },
};
</script>
