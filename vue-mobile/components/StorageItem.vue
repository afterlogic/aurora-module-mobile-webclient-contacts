<template>
  <q-item class="q-px-lg" :active="active" clickable v-ripple @click.prevent="selectStorage">
    <q-item-section side>
      <storage-icon :color="active ? '#469CF8' : '#969494'" :icon="storage.icon"/>
    </q-item-section>
    <q-item-section class="storage__name">
      {{ storage.name }}
    </q-item-section>
  </q-item>
</template>

<script>
import eventBus from 'src/event-bus'
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
  methods: {
    selectStorage() {
      this.$router.push(`/contacts/${this.storage.id}`)
      eventBus.$emit('closeDrawer')
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
}
</style>
