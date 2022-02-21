<template>
  <main-layout>
    <template v-slot:drawer>
      <drawer-content />
    </template>

    <q-scroll-area :thumb-style="{width: '5px'}" class="contacts__list" v-if="!loadingStatus">
      <contact-item
        v-for="contact in contactsList"
        :key="contact"
        :contact="contact"
        class="contact"
      />

      <empty-contacts v-if="isContactsEmpty" />
    </q-scroll-area>

    <div class="q-mt-xl flex items-center justify-center" v-if="loadingStatus">
      <q-circular-progress
        indeterminate
        size="40px"
        color="primary"
        class="q-ma-md"
      />
    </div>

    <create-button />
  </main-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import MainLayout from 'src/layouts/MainLayout'
import DrawerContent from '../components/DrawerContent'
import ContactItem from '../components/ContactItem'
import EmptyContacts from '../components/EmptyContacts'
import CreateButton from '../components/common/CreateButton'

export default {
  name: 'Contacts',

  components: {
    MainLayout,
    DrawerContent,
    ContactItem,
    EmptyContacts,
    CreateButton,
  },

  async mounted() {
    await this.init()
  },

  methods: {
    ...mapActions('contactsmobile', [
      'asyncGetStorages',
      'asyncGetGroups',
      'asyncGetContacts',
      'changeLoadingStatus',
    ]),
    async init() {
      this.changeLoadingStatus(true)
      await this.asyncGetStorages()
      await this.asyncGetGroups()
      await this.asyncGetContacts()
      this.changeLoadingStatus(false)
    },
  },

  computed: {
    ...mapGetters('contactsmobile', [
      'contactsList',
      'storageList',
      'loadingStatus',
    ]),
    isContactsEmpty() {
      return !this.contactsList.length
    },
  },
}
</script>

<style>
.contacts__list {
  height: calc(100vh - 115px);
}
</style>
