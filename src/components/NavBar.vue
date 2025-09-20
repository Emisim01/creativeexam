<template>
  <nav class="p-4 font-bold flex justify-center items-center gap-4">
     <div class="hidden md:flex gap-4 ">
      <RouterLink to="/" class="nav-link">Home</RouterLink>
      <RouterLink to="/#recipes" class="nav-link">Recipes</RouterLink>
      <RouterLink to="/#generator" class="nav-link">Generator</RouterLink>
      <RouterLink to="/#login/sign up" class="nav-link">Login/sign up</RouterLink>
    </div>
  </nav>
  <div>

  </div>
</template>

<script setup>

</script>

<style scoped>
nav {
  font-size: 21px;
  align-items: center;
  background-color: #af50b4;
  height: 80px;

}

.nav-link {
  color: white;
}
</style>
