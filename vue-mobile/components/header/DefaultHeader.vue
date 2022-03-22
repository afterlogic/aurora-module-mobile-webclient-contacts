<template>
  <q-toolbar style="height: 55px" class="justify-between">
    <q-btn
      flat
      size="15px"
      @click="$emit('openDrawer')"
      color="black"
      round
      dense
      icon="menu"
    />

    <div class="flex column">
      <span
        class="header-title text-black text-center"
      >
        {{ $t('CONTACTSWEBCLIENT.HEADING_BROWSER_TAB') }}
      </span>
      <span
        style="margin-top: 5px"
        class="text-center header-caption"
      >
        {{ storageName }}
      </span>
    </div>

    <q-btn
      flat
      size="15px"
      color="black"
      round
      dense
      icon="search"
      @click="showSearchHeader"
    />
  </q-toolbar>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ContactsHeader',
  computed: {
    ...mapGetters('contactsmobile', ['currentStorage']),
    storageName() {
      if (!this.currentStorage) return ''
      if (this.currentStorage?.DisplayName) return this.currentStorage.DisplayName
      let storage = this.currentStorage.Id
      if (!storage) return ''
      if (storage === 'collected') return 'Collected'
      storage = this.$t(`CONTACTSWEBCLIENT.LABEL_STORAGE_${storage.toUpperCase()}`)
      return storage
    },
  },
  methods: {
    ...mapActions('contactsmobile', ['changeCurrentHeader']),
    showSearchHeader() {
      this.changeCurrentHeader('SearchHeader')
    },
  },
}
</script>
