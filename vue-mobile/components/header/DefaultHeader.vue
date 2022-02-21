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
        class="text-black text-bold text-center"
        style="font-size: 17px;"
      >
        {{ $t('CONTACTSWEBCLIENT.HEADING_BROWSER_TAB') }}
      </span>
      <span
        :style="{ 'margin-top': '-5px' }"
        class="text-black text-center text-blue-grey-12"
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
      return this.currentStorage.Id
    },
  },
  methods: {
    ...mapActions('contactsmobile', [
      'asyncGetContacts',
      'changeCurrentHeader',
    ]),
    showSearchHeader() {
      this.changeCurrentHeader('SearchHeader')
    },
  },
}
</script>
