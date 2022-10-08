<template>
  <q-toolbar class="app-header justify-between">
    <q-btn icon="menu" @click="$emit('openDrawer')" color="black" flat round dense />

    <div class="flex column">
      <span class="header-title text-black text-center">
        {{ $t('CONTACTSWEBCLIENT.HEADING_BROWSER_TAB') }}
      </span>
      <span style="margin-top: 5px" class="text-center header-caption">
        {{ storageName }}
      </span>
    </div>

    <q-btn icon="search" @click="showSearchHeader" color="black" flat round dense />
  </q-toolbar>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ContactsHeader',

  computed: {
    ...mapGetters('contactsmobile', ['currentStorage']),
    storageName() {
      return this.currentStorage.name || ''
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
