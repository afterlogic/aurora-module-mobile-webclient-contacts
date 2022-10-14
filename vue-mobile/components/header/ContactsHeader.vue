<template>
  <div>
    <default-header v-if="isDefaultHeader" @openDrawer="$emit('openDrawer')" />
    <select-header v-if="isSelectHeader" :items="selectedContacts" />
    <search-header v-if="isSearchHeader" />
    <ContactHeader v-if="routeName === 'contact'" />
    <EditContactHeader v-if="routeName === 'contact-edit'" />
    <AddGroupHeader v-if="routeName === 'create-group'" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import DefaultHeader from './DefaultHeader'
import SelectHeader from './SelectHeader'
import SearchHeader from './SearchHeader'

import ContactHeader from './ContactHeader'
import EditContactHeader from './EditContactHeader'

import AddGroupHeader from './AddGroupHeader'


export default {
  name: 'ContactsHeader',

  components: {
    DefaultHeader,
    SelectHeader,
    SearchHeader,

    ContactHeader,
    EditContactHeader,

    AddGroupHeader,
  },

  beforeUnmount() {
    this.changeSearchText('')
    this.changeCurrentHeader('')
  },

  computed: {
    ...mapGetters('contactsmobile', ['currentHeader', 'selectedContacts']),
    routeName() { 
      return this.$router.currentRoute.value.name
    },
    isDefaultHeader() {
      return !this.isSelectHeader && !this.isSearchHeader 
      && (this.routeName === 'list' || this.routeName === 'group')
    },
    isSelectHeader() {
      return this.selectedContacts.length > 0 
        && (this.routeName === 'list' || this.routeName === 'group') 
    },
    isSearchHeader() {
      return this.currentHeader === 'SearchHeader' && !this.isSelectHeader 
        && (this.routeName === 'list' || this.routeName === 'group') 
    },
  },

  methods: {
    ...mapActions('contactsmobile', [
      'changeCurrentHeader',
      'changeSearchText',
    ]),
  },
}
</script>
