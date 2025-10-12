<template>

<div>
    <p class="welcomeText p-4 font-bold text-white flex justify-center gap-4">Don't know what to do? Try this!</p>
</div>

 <div id="random-task-generator" class="random-task-generator text-center p-6 rounded-lg shadow-lg">
  <button
    @click="generateRandomTask"
    class="generatorBox text-white px-4 py-2 rounded-lg cursor-pointer hover:scale-105 transition">Generate Random Task</button>

  <p v-if="randomTask" class="randomTaskResult text-2xl font-bold text-white">
    {{ randomTask.title }} - {{ randomTask.category }}
  </p>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTasks } from '@/composables/useTasks.js'

const { tasks, fetchTasks } = useTasks()
const randomTask = ref(null)

// Fetch tasks from Firebase when the component is mounted
onMounted(() => {
  fetchTasks()
})

// Function to generate a random task
const generateRandomTask = () => {
  if (tasks.value.length > 0) {
    const randomIndex = Math.floor(Math.random() * tasks.value.length)
    randomTask.value = tasks.value[randomIndex]
  }
}
</script>

<style scoped>
.welcomeText {
  font-family: "Cherry Bomb One", system-ui;
  margin-top: 15px;
  font-size: 40px;
  color: var(--color-light-grass);
}

.generatorBox {
  background-color: #9BBF9B;
  font-size: 25px;
}

.random-task-generator {
  margin: 0 22px;
}

.randomTaskResult {
  margin-top: 20px;
}

</style>
