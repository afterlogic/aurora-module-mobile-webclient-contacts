<template>
  <component :is="componentInstance" :color="color"/>
</template>

<script>
import { defineAsyncComponent } from 'vue'

const STORAGE_ICON_MAP = {
  personal: 'Personal',
  team: 'Team',
  shared: 'Shared',
  collected: 'Collected',
  all: 'All',
}

export default {
  name: 'StorageIcon',
  props: {
    icon: { type: String, required: true },
    color: { type: String, default: '' },
  },
  computed: {
    componentInstance () {
      const iconKey = (this.icon || '').toLowerCase()
      const name = STORAGE_ICON_MAP[iconKey]
        || (iconKey.includes('addressbook') ? 'Personal' : 'Personal')

      return defineAsyncComponent(() => import(`./storage/${name}StorageIcon`))
    }
  },
}
</script>
