<template>
  <component :is="componentInstance" :color="color"/>
</template>

<script>

import { defineAsyncComponent } from "vue";

export default {
  name: 'StorageIcon',
  props: {
    icon: { type: String, required: true },
    color: { type: String, default: '' }
  },
  computed: {
    componentInstance () {
      const name = this.icon || ''
      return defineAsyncComponent(() => import(`./storage/${name}StorageIcon`))
    }
  },
}
</script>

<style scoped></style>
