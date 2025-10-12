<template>
  <div v-if="isAdmin">
    <h1 class="welcomeText">Admin Panel</h1>
    <p>Her kan du tilføje nye ting til hjemmesiden!</p>
  </div>
  <div v-else>
    <h2>Du har ikke adgang til denne side.</h2>
    <p>Siden indlæses, eller du er ikke admin...</p>
  </div>
</template>

<script setup>
// Du behøver ikke længere 'onMounted' her
import { useAdmin } from '@/composables/useAdmin.js'

// Hent bare isAdmin. Den opdaterer sig selv!
const { isAdmin } = useAdmin()
</script>

<style scoped>
.welcomeText {
  font-family: "Cherry Bomb One", system-ui;
  margin-top: 15px;
  font-size: 40px;
  color: var(--color-light-grass);
}

</style>
