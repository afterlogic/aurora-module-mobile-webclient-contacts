<template>
  <q-item :active="active" clickable v-ripple @click.prevent="selectStorage">
    <div class="flex items-center q-mr-md">
      <storage-icon :color="active ? '#469CF8' : '#969494'" :icon="storageIcon"/>
    </div>
    <q-item-section>
      <q-item-label class="text-subtitle1">
        {{ storage.DisplayName ?? storage.Id }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { mapActions } from 'vuex'
import eventBus from "src/event-bus";
import StorageIcon from './icons/StorageIcon'

export default {
  name: 'StorageItem',
  components: {
    StorageIcon,
  },
  props: {
    storage: { type: Object, default: null },
    active: { type: Boolean, default: false }
  },
  computed: {
    storageIcon() {
      return this.storage.Id[0].toUpperCase() + this.storage.Id.slice(1)
    },
  },
  methods: {
    ...mapActions('contactsmobile', [
      'asyncGetContacts',
      'changeCurrentStorage',
    ]),
    async selectStorage() {
      this.changeCurrentStorage(this.storage)
      eventBus.$emit('closeDrawer')
      await this.asyncGetContacts()
    },
  },
}
</script>
