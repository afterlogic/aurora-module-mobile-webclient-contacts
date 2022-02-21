<template>
  <div>
    <default-header v-if="isDefaultHeader" @openDrawer="$emit('openDrawer')" />
    <search-header v-if="isSearchHeader" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import DefaultHeader from './DefaultHeader'
import SearchHeader from './SearchHeader'

export default {
  name: 'ContactsHeader',
  components: {
    DefaultHeader,
    SearchHeader,
  },

  computed: {
    ...mapGetters('contactsmobile', ['currentHeader']),
    isDefaultHeader() {
      return !this.isSearchHeader
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
