<template>
  <div>
    <DefaultHeader v-if="isDefaultHeader" @openDrawer="$emit('openDrawer')" />
    <SelectHeader v-if="isSelectHeader" :items="selectedContacts" />
    <SearchHeader v-if="isSearchHeader" />
    
    <ContactViewHeader v-if="routeName === 'contact-view'" />
    <ContactEditHeader v-if="routeName === 'contact-edit' || routeName === 'contact-create'" />

    <GroupViewHeader v-if="routeName === 'group-view'" />
    <GroupEditHeader v-if="routeName === 'group-edit' || routeName === 'group-create'" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import DefaultHeader from './DefaultHeader'
import SelectHeader from './SelectHeader'
import SearchHeader from './SearchHeader'

import ContactViewHeader from './ContactViewHeader'
import ContactEditHeader from './ContactEditHeader'

import GroupViewHeader from './GroupViewHeader'
import GroupEditHeader from './GroupEditHeader'

export default {
  name: 'ContactsHeader',

  components: {
    DefaultHeader,
    SelectHeader,
    SearchHeader,

    ContactViewHeader,
    ContactEditHeader,

    GroupViewHeader,
    GroupEditHeader,
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
      && (this.routeName === 'contact-list' || this.routeName === 'group-list')
    },
    isSelectHeader() {
      return this.selectedContacts.length > 0 
        && (this.routeName === 'contact-list' || this.routeName === 'group-list') 
    },
    isSearchHeader() {
      return this.currentHeader === 'SearchHeader' && !this.isSelectHeader 
        && (this.routeName === 'contact-list' || this.routeName === 'group-list') 
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
