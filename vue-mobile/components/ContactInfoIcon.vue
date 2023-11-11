<template>
 <component v-if="icon" :is="componentInstance" />
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  name: "ContactInfoIcon",
  props: {
    icon: { type: String, default: '' },
  },
  computed: {
    componentInstance () {
      const name = this.icon || ''
      if (!name) return ''
      return defineAsyncComponent(() => import(`./icons/info/${name}`))
    }
  },
}
</script>
