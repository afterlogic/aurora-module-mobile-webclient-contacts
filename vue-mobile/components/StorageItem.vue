<template>
  <q-item style="margin-bottom: 22px" dense :active="active" clickable v-ripple @click.prevent="selectStorage">
    <div class="flex items-center q-mr-md">
      <storage-icon :color="active ? '#469CF8' : '#969494'" :icon="storageIcon"/>
    </div>
    <q-item-section>
      <q-item-label :class="`storage__name ${active ? 'storage__name-bold' : ''}`">
        {{ storageName }}
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
    storageName() {
      if (this.storage?.DisplayName) return this.storage.DisplayName
      let storage = this.storage.Id
      if (storage === 'collected') return 'Collected'
      storage = this.$t(`CONTACTSWEBCLIENT.LABEL_STORAGE_${storage.toUpperCase()}`)
      console.log(storage, 'storage')
      return storage
    }
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
<style lang="scss" scoped>
.storage {
  &__name {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.3px;
  }
  &__name-bold {
    font-weight: 700;
  }
}
</style>
