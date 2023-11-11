<template>
  <component v-if="icon" :is="componentInstance" />
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  name: "ContactFieldActionIcon",
  props: {
    icon: { type: String, default: '' },
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
