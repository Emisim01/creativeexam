<template>
<button v-if="isLoggedIn" @click="handleLogOut" class="auth-button">Logout</button>
<RouterLink v-else class="auth-button" to="/login">Login</RouterLink>
</template>

<script setup>
import { useAuth } from '../composables/useAuth.js';
import { useRouter } from 'vue-router'

const { isLoggedIn, logout } = useAuth()
const router = useRouter()

const handleLogOut = () => {
logout(router)
}
</script>

<style scoped>
.auth-button {
  color: white;
  font-size: 25px;
}
</style>
