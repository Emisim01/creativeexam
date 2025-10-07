<template>
<div class="login-view pt-10 flex flex-col gap-4">
    <h1>Register here!</h1>
    <form class="flex flex-col" @submit.prevent="registerUser">
      <input class="border border-indigo-300 p-2 !mb-4 rounded" type="email" v-model="email" placeholder="Email" required />
      <input class="border border-indigo-300 p-2 !mb-4 rounded" type="password" v-model="password" placeholder="Password" required />
      <button type="submit" :disabled="loading">Register</button>
      <router-link to="/login">Login</router-link>
    </form>
    <div class="error" v-if="authError">
      {{ authError }}
    </div>
  </div>
</template>

<script setup>
import { useRegister } from '@/composables/useRegister'

const { email, password, loading, authError, registerUser } = useRegister()
</script>

<style scoped>



</style>
