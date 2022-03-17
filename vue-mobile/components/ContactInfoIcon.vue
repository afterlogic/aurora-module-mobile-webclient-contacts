<template>
 <component :is="componentInstance" />
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  name: "ContactInfoIcon",
  props: {
    icon: { type: String, required: true },
  },
  computed: {
    componentInstance () {
      const name = this.icon || ''
      return defineAsyncComponent(() => import(`./icons/info/${name}`))
    }
  },
}
</script>

<style scoped>

</style>
