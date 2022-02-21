<template>
  <q-item clickable v-ripple @click.prevent="selectStorage">
    <q-item-section avatar>
      <storage-icon />
    </q-item-section>
    <q-item-section>
      <q-item-label class="text-subtitle1">
        {{ storage.DisplayName ?? storage.Id }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { mapActions } from 'vuex'

import StorageIcon from './icons/StorageIcon'

export default {
  name: 'StorageItem',
  components: {
    StorageIcon,
  },
  props: {
    storage: { type: Object, default: null },
  },
  methods: {
    ...mapActions('contactsmobile', [
      'asyncGetContacts',
      'changeCurrentStorage',
    ]),
    async selectStorage() {
      this.changeCurrentStorage(this.storage)
      await this.asyncGetContacts()
    },
  },
}
</script>
