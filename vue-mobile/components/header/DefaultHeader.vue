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
      <span class="header-title text-black text-center">
        {{ $t('CONTACTSWEBCLIENT.HEADING_BROWSER_TAB') }}
      </span>
      <span style="margin-top: 5px" class="text-center header-caption">
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
