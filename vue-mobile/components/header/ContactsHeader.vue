<template>
  <div>
    <DefaultHeader v-if="isDefaultHeader" @openDrawer="$emit('openDrawer')" />
    <SelectHeader v-if="isSelectHeader" :items="selectedContacts" />
    <SearchHeader v-if="isSearchHeader" />
    
    <ContactViewHeader v-if="routeName === 'contact-view'" />
    <EditContactHeader v-if="routeName === 'contact-edit' || routeName === 'contact-create'" />

    <!-- <GroupViewHeader v-if="routeName === 'group-view'" /> -->
    <AddGroupHeader v-if="routeName === 'group-edit' || routeName === 'group-create'" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import DefaultHeader from './DefaultHeader'
import SelectHeader from './SelectHeader'
import SearchHeader from './SearchHeader'

import ContactViewHeader from './ContactViewHeader'
import EditContactHeader from './EditContactHeader'

import AddGroupHeader from './AddGroupHeader'
// import GroupViewHeader from './GroupViewHeader'

export default {
  name: 'ContactsHeader',

  components: {
    DefaultHeader,
    SelectHeader,
    SearchHeader,

    ContactViewHeader,
    EditContactHeader,

    AddGroupHeader,
    // GroupViewHeader,
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
      && (this.routeName === 'contact-list' || this.routeName === 'group-view')
    },
    isSelectHeader() {
      return this.selectedContacts.length > 0 
        && (this.routeName === 'contact-list' || this.routeName === 'group-view') 
    },
    isSearchHeader() {
      return this.currentHeader === 'SearchHeader' && !this.isSelectHeader 
        && (this.routeName === 'contact-list' || this.routeName === 'group-view') 
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
