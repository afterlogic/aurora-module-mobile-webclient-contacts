<template>
  <MainLayout>
    <template v-slot:header>
      <ContactsHeader />
    </template>

    <template v-slot:drawer>
      <DrawerContent />
    </template>

    <div class="column fit">
      <router-view class="col fit"></router-view>
    </div>

    <AppCreateButton
      data-test-id="contacts-create-fab"
      :rotate="appButtonRotate"
      @click="showCreateButtonsDialog"
      v-if="isShowCreateButtons"
    />

    <DialogsList />
  </MainLayout>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'pinia'
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
    ...mapState(useContactsStore, ['storageList', 'groupsList', 'currentStorage', 'currentContact', 'dialogComponent', 'currentHeader']),
    ...mapGetters(useContactsStore, ['selectedContacts', 'getDefaultStorage']),
    appButtonRotate() {
      return this.dialogComponent?.component === 'CreateButtonsDialogs'
    },
    isShowCreateButtons() {
      return (
        this.currentHeader !== 'SearchHeader'
        && !(this.selectedContacts.length > 0)
        && (this.$route.name === 'contact-list' || this.$route.name === 'group-list' || this.$route.name === 'contacts')
      )
    },
  },

  watch: {
    '$route.params': {
      handler: async function (params) {
        const storageId = params.storageId
        const groupId = params.groupId
        const contactId = params.contactId
        const routeName = this.$route.name
        const isCreateRoute = routeName === 'group-create' || routeName === 'contact-create'
        const needsDefaultList = !storageId && !groupId && !isCreateRoute

        if (needsDefaultList && this.storageList.length) {
          this.$router.replace({ name: 'contact-list', params: { storageId: this.getDefaultStorage.id } })
          return
        }

        if (storageId && this.storageList.length) {
          const storage = this.storageList.find(storage => storage.id === storageId)
          this.setCurrentStorage(storage || {})
        } else if (groupId && this.groupsList.length) {
          const group = this.groupsList.find(group => group.UUID === groupId)
          this.setCurrentGroup(group || null)
        }

        await this.fetchBooksAndGroups()

        if (needsDefaultList) {
          this.$router.replace({ name: 'contact-list', params: { storageId: this.getDefaultStorage.id } })
          return
        }

        if (storageId) {
          const storage = this.storageList.find(storage => storage.id === storageId)
          this.setCurrentStorage(storage || {})
        } else if (groupId) {
          let group = this.groupsList.find(group => group.UUID === groupId)
          if (!group) {
            await this.asyncGetGroups()
            group = this.groupsList.find(group => group.UUID === groupId)
          }
          this.setCurrentGroup(group || null)
        }

        if (contactId) {
          if (this.currentContact?.UUID !== contactId) {
            this.asyncGetContact({ UUID: contactId })
          }
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
      'changeDialogComponent',
      'setCurrentStorage',
      'setCurrentGroup',
    ]),
    async fetchBooksAndGroups() {
      // Do not toggle shared isLoading here — it is used by ContactsList
      // and flipping it off before contacts arrive causes an EmptyContacts flash.
      if (this.storageList.length === 0) {
        await this.asyncGetStorages()
      }

      if (this.groupsList.length === 0) {
        await this.asyncGetGroups()
      }
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

  &__action-btn {
    cursor: pointer;
    display: flex;
    align-items: center;
  }
}
</style>
