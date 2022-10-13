<template>
  <main-layout>
    <template v-slot:drawer>
      <drawer-content />
    </template>

    <ContactsList v-if="!showContact" />

    <ContactInfo v-if="showContact" />

    <app-create-button :rotate="appButtonRotate" @click="showCreateButtonsDialog" v-if="isShowCreateButtons"/>
    <dialogs-list />
  </main-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import MainLayout from 'src/layouts/MainLayout'
import AppCreateButton from 'src/components/common/AppCreateButton'

import DrawerContent from '../components/DrawerContent'
import DialogsList from '../components/DialogsList'

import ContactsList from './ContactsList'
import ContactInfo from './ContactInfo'

export default {
  name: 'Contacts',

  components: {
    MainLayout,
    AppCreateButton,
    DrawerContent,
    DialogsList,
    ContactsList,
    ContactInfo,
  },

  data() {
    return {
      isSelectMode: false,
    }
  },

  // beforeRouteEnter(to, from) {
  //   console.log('enter routing')
  // },

  // beforeRouteUpdate(to, from) {
  //   console.log('update routing')
  // },

  async mounted() {
    const storageId = this.$route.params.storageId
    const contactId = this.$route.params.contactId
    
    // console.log('Contacts: mounted', contactId)

    if (!storageId) {
      if (this.storageList.length === 0) {
        await this.asyncGetStorages()
      }
      this.$router.push(`/contacts/${this.getDefaultStorage.id}`)
    }
  },

  computed: {
    ...mapGetters('contactsmobile', [
      'storageList',
      'groupsList',
      'selectedContacts',
      // 'loadingStatus',
      'currentStorage',
      'currentContact',
      
      'dialogComponent',
      'currentHeader',
      'getDefaultStorage',
    ]),
    showContact() {
      return !!this.currentContact?.UUID
    },
    appButtonRotate() {
      return this.dialogComponent?.component === 'CreateButtonsDialogs'
    },
    isShowCreateButtons() {
      return this.currentHeader !== 'SearchHeader' && !this.isSelectMode && !this.showContact
    },
  },

  watch: {
    '$route.params.storageId': {
      handler: function (storageId) {
        // console.log('$route.params.storageId', storageId)
        this.init()
      },
      immediate: true
    },
    '$route.params.contactId': {
      handler: async function (conctactId) {
        // console.log('$route.params.contactId', conctactId)
        if (conctactId) {
          this.asyncGetContact({ UUID: conctactId })
        } else {
          this.asyncGetContact({})
        }
      },
      immediate: true
    },
    selectedContacts(items) {
      if (!items.length) {
        this.isSelectMode = false
      }
    },
  },

  methods: {
    ...mapActions('contactsmobile', [
      'asyncGetStorages',
      'asyncGetGroups',
      'asyncGetContact',
      // 'changeLoadingStatus',
      'changeDialogComponent',
      // 'changeSelectStatus',
      'setCurrentStorage',
    ]),
    async init() {
      // console.log('init')
      // this.changeLoadingStatus(true)
      if (this.storageList.length === 0) {
        // console.log('init: getting storages')
        await this.asyncGetStorages()
      }

      if (this.groupsList.length === 0) {
        // console.log('init: getting groups')
        await this.asyncGetGroups()
      }
      
      // console.log('init: storageId', this.$route.params.storageId)
      const storage = this.storageList.length ? this.storageList.find(item => item.id === this.$route.params.storageId) : {}

      if (storage) {
        // console.log('init: set storage')
        this.setCurrentStorage(storage)
      }

      // this.changeLoadingStatus(false)
    },
    showCreateButtonsDialog() {
      if (this.dialogComponent.component === 'CreateButtonsDialogs') {
        this.changeDialogComponent({ component: '' })
      } else {
        this.changeDialogComponent({ component: 'CreateButtonsDialogs' })
      }
    },
  },
}
</script>

<style lang="scss">
.contacts {

  &__list {
    height: 100%;
  }

  &__loader {
    display: flex;
    justify-content: center;
  }
}
</style>
