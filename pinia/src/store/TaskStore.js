import { defineStore } from "pinia";
import axios from "axios";

const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [],
    isLoading: false,
  }),

  actions: {
    async getAllTask() {
      try {
        this.isLoading = true;
        const { data } = await axios.get("http://localhost:3000/tasks");
        this.tasks = data;
        this.isLoading = false;
      } catch (error) {
        console.log(error);
        this.isLoading = false;
      }
    },
    async deleteTask(id) {
      this.tasks = this.tasks.filter((task) => task.id !== id);

      try {
        await axios.delete(`http://localhost:3000/tasks/${id}`);
      } catch (error) {
        console.log(error);
      }
    },
    async addTask(task) {
      this.tasks.push(task);

      try {
        await axios.post("http://localhost:3000/tasks", JSON.stringify(task));
      } catch (error) {
        console.log(error);
      }
    },
    async toggleFav(id) {
      const task = this.tasks.find((t) => t.id === id);
      if (task) task.isFav = !task.isFav;

      try {
        await axios.patch(`http://localhost:3000/tasks/${id}`, {
          isFav: task.isFav,
        });
      } catch (error) {
        console.log(error);
      }
    },
  },

  getters: {
    favs() {
      return this.tasks.filter((task) => task.isFav);
    },

    favsCount() {
      return this.tasks.reduce(
        (total, current) => (current.isFav ? total + 1 : total),
        0
      );
    },
    isFavTask(id) {
      const found = this.tasks.find((t) => t.id === id);

      if (found) {
        if (found.isFav) return true;
        return false;
      }
      return false;
    },
    totalCount: (state) => {
      return state.tasks.length;
    },
  },
});

export default useTaskStore;
