<template>
  <body>
    <section class="error-page">
      <span>Page not found</span>
      <router-link to="/">Home page</router-link>
    </section>
  </body>
</template>

<script>
export default {
  name: 'Error'
}
</script>

<style lang="scss" scoped>
.error-page {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  width: 100%;

  span {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
}
</style>
