<script setup>
</script>

<template>
  <header class="site-header">
    <nav class="nav">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/WeatherCheck">WeatherCheck</RouterLink>
    </nav>
  </header>

  <main>
    <!-- Routed pages render here -->
    <RouterView />
  </main>
</template>

<style scoped>
.site-header {
  line-height: 1.5;
  border-bottom: 1px solid #eee;
  padding: 1rem;
}

.nav {
  display: flex;
  gap: 1rem;
}

a {
  text-decoration: none;
}

a.router-link-active {
  font-weight: 700;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  .site-header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }
}
</style>
