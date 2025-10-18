<template>
  <div class="min-h-screen">
    <!-- Header -->
    <div class="text-center !mb-4">
      <p class="welcomeText text-light-grass !mb-4">Don't know what to do?</p>
      <p class="text-2xl text-light-grass/80">Let our generator inspire your next creative project!</p>
    </div>

<div class="generatorAll max-w-2xl mx-auto p-8">
      <div class="bg-white/10 rounded-2xl p-8 shadow-2xl border border-light-grass/40">

        <!-- Generator Button -->
        <div class="text-center !mb-8">
          <button
            @click="generateRandomTask"
            class="generatorBox bg-light-grass text-dark-grass font-bold px-6 py-3 rounded-xl cursor-pointer hover:scale-105 transition-all duration-300 shadow-lg"
          >Generate Random Task 🎲
        </button>
        </div>

                <!-- Result Display -->
        <div v-if="randomTask" class="result-container bg-white/20 rounded-xl !p-6 border border-light-grass/30">
          <div class="text-center">
            <h3 class="text-3xl font-bold text-light-grass !mb-4">Your Creative Challenge:</h3>
            <div class="bg-light-grass/20 rounded-lg p-4 !mb-4">
              <p class="text-2xl font-bold text-white">{{ randomTask.title }}</p>
            </div>
            <div class="flex justify-center items-center gap-4 text-light-grass/80">
              <span class="bg-light-grass/20 px-3 py-1 rounded-full text-sm font-semibold">
                ⭐ {{ randomTask.category }}
              </span>
            </div>

        <!-- Quick Stats -->
        <div v-if="tasks.length > 0" class="mt-8 text-center">
          <p class="text-light-grass/60">
            Choose from <span class="font-bold text-light-grass">{{ tasks.length }}</span> creative recipes
          </p>
        </div>
      </div>
          </div>
    </div>
</div>
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

.generatorAll {
  max-width: 900px;
  margin: 25px auto;
}

.generatorBox{
  font-size: 35px;
}

</style>
