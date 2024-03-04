<template>
  <div class="component"></div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ComponentSample',
  components: {},
  filters: {},
  props: {
    prop1: {
      type: String,
      required: false,
      default: ''
    },
    prop2: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters({})
  },
  watch: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  activated() {},
  deactivated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    ...mapActions({})
  }
}
</script>

<style scoped lang="scss">
.component {
  padding: 1rem;
}
</style>
