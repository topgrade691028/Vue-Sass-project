<template>
  <div class="container" tabindex="0" @keyup="handleKeyPress($event)">
    <Header />
    <main>
      <slot></slot>
    </main>
  </div>
</template>

<script>
import Header from './Header'

export default {
  name: 'PageLayout',
  components: {
    Header
  },
  methods: {
    handleKeyPress(e) {
      this.$emit('press-arrow', e)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  box-sizing: border-box;
  background: $color-semigray;
}

main {
  min-height: 90vh;
  max-width: 100vw;
  margin: auto;
  @media (min-width: #{$grid-breakpoint-medium}) {
    max-width: 50vw;
    padding-top: 15px;
  }
}
</style>
