<template>
  <div class="container">
    <form @submit.prevent="handleSubmit" class="add">
      <input type="text" placeholder="I need to..." v-model="newItem" />
      <button class="button extraBtn">Add</button>
    </form>
    <span class="noContentTyped" v-if="noContentTyped"
      >Type some Task to be done!</span
    >
  </div>
</template>

<script>
import { mapActions } from "pinia";
import useTaskStore from "../store/TaskStore";

export default {
  data() {
    return {
      newItem: "",
      noContentTyped: false,
    };
  },
  methods: {
    ...mapActions(useTaskStore, ["addTask"]),

    async handleSubmit() {
      if (!this.newItem.trim().length) {
        this.noContentTyped = true;
        return;
      }

      const newTask = {
        id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
        isFav: false,
        title: this.newItem,
      };
      this.noContentTyped = false;

      await this.addTask(newTask);
      this.newItem = "";
    },
  },
};
</script>
