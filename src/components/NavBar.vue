<template>
  <nav class="p-4 font-bold flex justify-center gap-4">
     <div class="hidden md:flex gap-4 ">
      <RouterLink to="/" class="nav-link">Home</RouterLink>
      <RouterLink to="/#recipes" class="nav-link">Recipes</RouterLink>
      <RouterLink to="/#generator" class="nav-link">Generator</RouterLink>
      <RouterLink to="/#login/sign up" class="nav-link">Login/sign up</RouterLink>
        </div>
       <!-- Mobil knap -->
    <button class="md:hidden text-2xl" @click="toggleMenu">☰</button>
  </nav>
  <!-- Mobil menu dropdown -->
  <div v-if="showMenu" class="hamburgerMobile flex flex-col gap-2 p-4 md:hidden bg-purple-300 text-white items-center" @mouseleave="closeMenu">
    <RouterLink to="/" class="nav-link">Home</RouterLink>
    <RouterLink to="/#recipes" class="nav-link">Recipes</RouterLink>
    <RouterLink to="/#generator" class="nav-link">Generator</RouterLink>
    <RouterLink to="/#login/sign up" class="nav-link">Login/sign up</RouterLink>
  </div>

</template>

<script setup>
  import { RouterLink } from 'vue-router'
  import { ref } from 'vue'

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
  font-size: 21px;
  align-items: center;
  background-color: #FFE5C8;
  height: 80px;

}

.nav-link {
  color: white;
}

button {
  color: white;
  font-size: 40px;
  cursor: pointer;
}

.hamburgerMobile {
  font-size: 25px;
  /* font-family: 'MerriweatherSans'; */
}
</style>
