<template>
  <div class="login-view pt-10 flex flex-col gap-4">
    <h1>Login here!</h1>
    <form class="flex flex-col" @submit.prevent="loginUser">
      <input class="border border-indigo-300 p-2 !mb-4 rounded" type="email" v-model="email" placeholder="Email" required />
      <input class="border border-indigo-300 p-2 !mb-4 rounded" type="password" v-model="password" placeholder="Password" required />
      <button class="bg-indigo-300 text-white rounded" type="submit" :disabled="loading">Login</button>
      <router-link to="/register" class="text-indigo-300 text-center">Register</router-link>
    </form>

<div class="error" v-if="authError">
  {{ authError }}

</div>
<div v-if="isLoggedIn">
  Logged in as {{ currentUser?.email }}

</div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '../composables/useAuth.js';

const { login, authError,loading, isLoggedIn, currentUser } = useAuth()

const email = ref('')
const password = ref('')

const loginUser = () => {
  login(email.value, password.value)
}

</script>

<style scoped>
.login-view {
  max-width: 400px;
  margin: 20px auto;
}

.error {
  color: red;
  margin-top: 16px
}
</style>
