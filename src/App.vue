<script setup>
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'

</script>

<template>
  <header>

    <div class="wrapper">

      <NavBar />
    </div>
  </header>

  <RouterView />
  <Footer />
</template>

<style scoped>

</style>
