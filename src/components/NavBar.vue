<template>
  <nav class="welcomeText p-4 flex justify-center bg-light-grass gap-4">
     <div class="hidden md:flex gap-4 text-dark-grass">
      <RouterLink to="/" class="nav-link text-dark-grass">Home</RouterLink>
      <RouterLink to="/recipes" class="nav-link text-dark-grass">Recipes</RouterLink>
      <RouterLink to="/generator" class="nav-link text-dark-grass">Generator</RouterLink>
      <!-- Vis kun dette link, hvis brugeren er admin -->
    <RouterLink v-if="isAdmin" to="/admin" class="nav-link text-dark-grass">Admin</RouterLink>
      <AuthButton />
      </div>

       <!-- Mobil knap -->
    <button class="md:hidden text-2xl" @click="toggleMenu">☰</button>
  </nav>
  <!-- Mobil menu dropdown -->
  <div v-if="showMenu" class="hamburgerMobile flex flex-col gap-2 p-4 md:hidden bg-light-grass items-center" @mouseleave="closeMenu">
    <RouterLink to="/" class="nav-link text-dark-grass">Home</RouterLink>
    <RouterLink to="/recipes" class="nav-link text-dark-grass">Recipes</RouterLink>
    <RouterLink to="/generator" class="nav-link text-dark-grass">Generator</RouterLink>
      <!-- Vis kun dette link, hvis brugeren er admin -->
    <RouterLink v-if="isAdmin" to="/admin" class="nav-link text-dark-grass">Admin</RouterLink>
      <AuthButton />
  </div>

</template>

<script setup>
  import { RouterLink } from 'vue-router'
  import { ref } from 'vue'
  import AuthButton from './AuthButton.vue'
  import { onMounted } from 'vue'
  import { useAdmin } from '@/composables/useAdmin.js'

// Hent isAdmin og checkAdmin fra din composable
const { isAdmin, checkAdmin } = useAdmin()

const showMenu = ref(false)

const toggleMenu = () => {
  showMenu.value = !showMenu.value
    console.log('toggleMenu', showMenu.value)
}

const closeMenu = () => {
  showMenu.value = false
}

// Tjek om brugeren er admin, når komponenten indlæses
onMounted(() => {
  checkAdmin()
})
</script>

<style>
nav {
  font-size: 30px;
  align-items: center;
  height: 80px;
}

button {
  color: var(--color-dark-grass);
  font-size: 40px;
  cursor: pointer;
}

.hamburgerMobile {
  font-size: 25px;
  font-family: "Cherry Bomb One", system-ui;
}

.welcomeText {
  font-family: "Cherry Bomb One", system-ui;
  font-weight: 400;
  font-style: normal;
}
</style>
