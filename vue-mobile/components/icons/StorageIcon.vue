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
      let name

      if (!this.icon.indexOf('Addressbook')) {
        name = 'Personal'
      }
      else {
        name = this.icon || ''
      }

      return defineAsyncComponent(() => import(`./storage/${name}StorageIcon`))
    }
  },
}
</script>

<style scoped></style>
