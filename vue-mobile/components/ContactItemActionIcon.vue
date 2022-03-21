<template>
  <component :is="componentInstance" />
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  name: "ContactItemActionIcon",
  props: {
    icon: { type: String, required: true },
  },
  computed: {
    componentInstance () {
      const name = this.icon || ''
      if (!name) return ''
      return defineAsyncComponent(() => import(`./icons/contact-item-actions/${name}`))
    }
  },
}
</script>

<style scoped>

</style>
