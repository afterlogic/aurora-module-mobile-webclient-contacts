<template>
  <MainLayout>
    <template v-slot:header>
      <ContactsHeader />
    </template>

    <template v-slot:drawer>
      <DrawerContent />
    </template>

    <router-view></router-view>

    <AppCreateButton :rotate="appButtonRotate" @click="showCreateButtonsDialog" v-if="isShowCreateButtons" />

    <DialogsList />
  </MainLayout>
</template>

<script>
import { mapGetters, mapActions } from 'pinia'
import { useContactsStore } from '../store/index-pinia.js'

import MainLayout from 'src/layouts/MainLayout'
import AppCreateButton from 'src/components/common/AppCreateButton'

import ContactsHeader from '../components/header/ContactsHeader'
import DrawerContent from '../components/DrawerContent'
import DialogsList from '../components/DialogsList'

export default {
  name: 'Contacts',

  components: {
    MainLayout,
    AppCreateButton,
    ContactsHeader,
    DrawerContent,
    DialogsList,
  },

  computed: {
    ...mapGetters(useContactsStore, [
      'storageList',
      'groupsList',
      'selectedContacts',
      'currentStorage',
      'currentContact',

      'dialogComponent',
      'currentHeader',
      'getDefaultStorage',
    ]),
    appButtonRotate() {
      return this.dialogComponent?.component === 'CreateButtonsDialogs'
    },
    isShowCreateButtons() {
      return (
        this.currentHeader !== 'SearchHeader'
        && !(this.selectedContacts.length > 0)
        && (this.$route.name === 'contact-list' || this.$route.name === 'group-list')
      )
    },
  },

  watch: {
    '$route.params': {
      handler: async function (params) {
        const storageId = params.storageId
        const groupId = params.groupId
        const contactId = params.contactId
        const routName = this.$route.name

        await this.fetchBooksAndGroups()

        // check if storageId or groupId are set, or group create page is opened
        if (!storageId && !groupId && routName !== 'group-create' && routName !== 'contact-create') {
          this.$router.push({ name: 'contact-list', params: { storageId: this.getDefaultStorage.id } })
        }

        if (storageId) {
          const storage = this.storageList.find(storage => storage.id === storageId)
          this.setCurrentStorage(storage || {})
        } else if (groupId) {
          let group = this.groupsList.find(group => group.UUID === groupId)
          this.setCurrentGroup(group || {})
        }

        if (contactId) {
          this.asyncGetContact({ UUID: contactId })
        } else {
          this.asyncGetContact({})
        }
      },
      immediate: true,
    },
  },

  methods: {
    ...mapActions(useContactsStore, [
      'asyncGetStorages',
      'asyncGetGroups',
      'asyncGetContact',
      'setLoadingStatus',
      'changeDialogComponent',
      'setCurrentStorage',
      'setCurrentGroup',
    ]),
    async fetchBooksAndGroups() {
      this.setLoadingStatus(true)
      if (this.storageList.length === 0) {
        await this.asyncGetStorages()
      }

      if (this.groupsList.length === 0) {
        await this.asyncGetGroups()
      }
      this.setLoadingStatus(false)
    },
    showCreateButtonsDialog() {
      if (this.dialogComponent?.component === 'CreateButtonsDialogs') {
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

.contact-field {
  padding: 4px 0 4px 24px;

  &__icon {
    display: flex;
    align-items: center;
    margin-right: 16px;
    min-width: 16px;
  }

  &__caption {
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 14px;
    color: #969494;
  }

  &__value {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    word-break: break-all;
  }

  // &__action {
  // }
}
</style>
