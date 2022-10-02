<template>
  <div>
    <default-header v-if="isDefaultHeader" @openDrawer="$emit('openDrawer')" />
    <select-header v-if="isSelectHeader" :items="selectedContacts" />
    <search-header v-if="isSearchHeader" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import DefaultHeader from './DefaultHeader'
import SelectHeader from './SelectHeader'
import SearchHeader from './SearchHeader'

export default {
  name: 'ContactsHeader',
  components: {
    DefaultHeader,
    SelectHeader,
    SearchHeader,
  },

  computed: {
    ...mapGetters('contactsmobile', ['currentHeader', 'selectedContacts']),
    isDefaultHeader() {
      return (
        !this.selectedContacts.length &&
        !this.isSearchHeader
      )
    },
    isSelectHeader() {
      console.log('isSelectHeader', this.selectedContacts)
      return (
        this.selectedContacts.length &&
        !this.isSearchHeader
      )
    },
    isSearchHeader() {
      return this.currentHeader === 'SearchHeader'
    },
  },
  methods: {
    ...mapActions('contactsmobile', [
      'changeCurrentHeader',
      'changeSearchText',
    ]),
  },
  beforeUnmount() {
    this.changeSearchText('')
    this.changeCurrentHeader('')
  },
}
</script>
