<script setup lang="ts">
</script>

<template>
  <div class="not-found">
    <h1>404 - Page non trouvée</h1>
    <p>La page que vous recherchez n'existe pas.</p>
    <RouterLink to="/" class="text-gray-light hover:text-black">Retour à l'accueil</RouterLink>
  </div>
</template>

<style scoped>
.not-found {
  text-align: center;
  margin-top: 50px;
}
</style>
