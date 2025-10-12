<template>
  <nav class="welcomeText p-4 font-bold flex justify-center bg-light-grass gap-4">
     <div class="hidden md:flex gap-4 text-dark-grass">
      <RouterLink to="/" class="nav-link text-dark-grass">Home</RouterLink>
      <RouterLink to="/recipes" class="nav-link text-dark-grass">Recipes</RouterLink>
      <RouterLink to="#random-task-generator" class="nav-link text-dark-grass">Generator</RouterLink>
      <AuthButton />
      </div>

       <!-- Mobil knap -->
    <button class="md:hidden text-2xl" @click="toggleMenu">☰</button>
  </nav>
  <!-- Mobil menu dropdown -->
  <div v-if="showMenu" class="hamburgerMobile flex flex-col gap-2 p-4 md:hidden bg-white text-dark-grass items-center" @mouseleave="closeMenu">
    <RouterLink to="/" class="nav-link text-dark-grass">Home</RouterLink>
    <RouterLink to="/recipes" class="nav-link text-dark-grass">Recipes</RouterLink>
    <RouterLink to="/#generator" class="nav-link text-dark-grass">Generator</RouterLink>
    <RouterLink to="/login/sign up" class="nav-link text-dark-grass">Login/sign up</RouterLink>
  </div>

</template>

<script setup>
  import { RouterLink } from 'vue-router'
  import { ref } from 'vue'
  import AuthButton from './AuthButton.vue'


const showMenu = ref(false)

const toggleMenu = () => {
  showMenu.value = !showMenu.value
    console.log('toggleMenu', showMenu.value)
}

const closeMenu = () => {
  showMenu.value = false
}
</script>

<style>
nav {
  font-size: 25px;
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
