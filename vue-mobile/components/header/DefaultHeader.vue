<template>
  <q-toolbar class="app-header">
    <div class="col app-header__left">
      <q-btn icon="menu" @click="$emit('openDrawer')" color="black" flat round dense />
    </div>

    <div class="col app-header__title">
      <span class="app-header__title-main">
        {{ $t('CONTACTSWEBCLIENT.HEADING_BROWSER_TAB') }}
      </span>
      <span class="app-header__title-secondary">
        {{ storageName }}
      </span>
    </div>

    <div class="col app-header__right">
      <q-btn icon="search" @click="showSearchHeader" color="black" flat round dense />
    </div>
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
