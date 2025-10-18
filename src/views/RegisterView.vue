<template>
    <div class="min-h-screen">
<div class="register-view text-light-grass p-8 bg-white/10 rounded">
    <h1>Register here!</h1>
    <form class="flex flex-col" @submit.prevent="registerUser">
      <input class="border border-light-grass p-2 !mb-4 rounded" type="email" v-model="email" placeholder="Email" required />
      <input class="border border-light-grass p-2 !mb-4 rounded" type="password" v-model="password" placeholder="Password" required />
      <button class="bg-light-grass text-dark-grass rounded" type="submit" :disabled="loading">Register</button>
      <router-link to="/login" class="text-light-grass text-center !mt-4">Login</router-link>
    </form>
    <div class="error" v-if="authError">
      {{ authError }}
    </div>
  </div>
  </div>
</template>

<script setup>
import { useRegister } from '@/composables/useRegister'

const { email, password, loading, authError, registerUser } = useRegister()
</script>

<style scoped>

.register-view {
  max-width: 600px;
  margin: 50px auto;
}

</style>
