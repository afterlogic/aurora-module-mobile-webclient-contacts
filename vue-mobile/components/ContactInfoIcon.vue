<template>
 <component v-if="icon" :is="iconComponent" />
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  name: 'ContactInfoIcon',
  props: {
    icon: { type: String, default: '' },
  },
  computed: {
    iconComponent () {
      return !this.icon ? '' : defineAsyncComponent(() => import(`./icons/info/${this.icon}`))
    }
  },
}
</script>
